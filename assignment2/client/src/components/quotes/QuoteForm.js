import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { addQuote, getQuotes } from '../../actions/quote';

function calcFuelFactor(e, quotes) {
    var fuel = 1.5;
    var gallonsFactor = 0.03;
    var seasonFactor = 0.03; // winter
    var historyFactor = 0;
    var profitMargin = 0.1;
    var locationFactor = 0.04;
    if (e.gallons > 1000) {
        console.log([e.gallons]);
        gallonsFactor = 0.02;
    }
    if (e.delivery_add === 'TX') {
        console.log([e.delivery_add]);
        locationFactor = 0.02;
    }

    // seasonal factor
    var delDate = new Date(e.delivery_date);
    if (delDate.getMonth() >= 8 || delDate.getMonth() <= 1) {
        // winter
    } else {
        // summer
        seasonFactor = 0.04;
    }

    if (quotes.length > 0) {
        historyFactor = 0.1;
        console.log('HERE WE ARE');
    }
    return (
        fuel +
        fuel *
            (profitMargin +
                gallonsFactor +
                seasonFactor +
                historyFactor +
                locationFactor)
    );
}

function calcQuote(e, quotes) {
    var fuelRate = calcFuelFactor(e, quotes);
    return e.gallons * fuelRate;
}

const QuoteForm = ({
    profile: { profile },
    getCurrentProfile,
    addQuote,
    quote: { quotes },
    history
}) => {
    useEffect(() => {
        getCurrentProfile();
        getQuotes();
    }, [getCurrentProfile]);

    const [formData, setFormData] = useState({
        gallons: '',
        delivery_add: '',
        delivery_date: '',
        price: '',
        total: ''
    });

    // for some reason if profile.Address_1 is alone then
    // there will always be a null value first and
    // the app will crash, this waits for profile
    // var primaryAddress = '';
    // var secondaryAddress = '';
    // if (profile !== null) {
    //     primaryAddress = profile.Address_1;
    //     secondaryAddress = profile.Address_2;

    //     var secondExist = true;
    //     if (secondaryAddress === null) secondExist = false;
    // }

    const { gallons, delivery_add, delivery_date, price, total } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        const total = calcQuote(formData, quotes);
        const price = calcFuelFactor(formData, quotes);

        setFormData({ ...formData });
        formData.price = price;
        formData.total = total;
        addQuote(formData, history);
    };

    return (
        <Fragment>
            <div>
                <h1 className='large text-primary'>Get a Quote!</h1>
                <p className='lead'>
                    <i className='fab fa-connectdevelop' />
                    You can get a quote in less than a minute!
                </p>
                <form
                    action='/quotes'
                    className='form'
                    onSubmit={e => onSubmit(e)}
                >
                    <div className='form-group'>
                        <input
                            type='number'
                            placeholder='Gallons needed'
                            name='gallons'
                            value={gallons}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <select
                            type='text'
                            name='delivery_add'
                            placeholder='Select your address'
                            defaultValue={'State'}
                            onChange={e => onChange(e)}
                            required
                        >
                            <option value='State' defaultValue>
                                Select State
                            </option>
                            <option value='AL'>Alabama</option>
                            <option value='AK'>Alaska</option>
                            <option value='AZ'>Arizona</option>
                            <option value='AR'>Arkansas</option>
                            <option value='CA'>California</option>
                            <option value='CO'>Colorado</option>
                            <option value='CT'>Connecticut</option>
                            <option value='DE'>Delaware</option>
                            <option value='DC'>District Of Columbia</option>
                            <option value='FL'>Florida</option>
                            <option value='GA'>Georgia</option>
                            <option value='HI'>Hawaii</option>
                            <option value='ID'>Idaho</option>
                            <option value='IL'>Illinois</option>
                            <option value='IN'>Indiana</option>
                            <option value='IA'>Iowa</option>
                            <option value='KS'>Kansas</option>
                            <option value='KY'>Kentucky</option>
                            <option value='LA'>Louisiana</option>
                            <option value='ME'>Maine</option>
                            <option value='MD'>Maryland</option>
                            <option value='MA'>Massachusetts</option>
                            <option value='MI'>Michigan</option>
                            <option value='MN'>Minnesota</option>
                            <option value='MS'>Mississippi</option>
                            <option value='MO'>Missouri</option>
                            <option value='MT'>Montana</option>
                            <option value='NE'>Nebraska</option>
                            <option value='NV'>Nevada</option>
                            <option value='NH'>New Hampshire</option>
                            <option value='NJ'>New Jersey</option>
                            <option value='NM'>New Mexico</option>
                            <option value='NY'>New York</option>
                            <option value='NC'>North Carolina</option>
                            <option value='ND'>North Dakota</option>
                            <option value='OH'>Ohio</option>
                            <option value='OK'>Oklahoma</option>
                            <option value='OR'>Oregon</option>
                            <option value='PA'>Pennsylvania</option>
                            <option value='RI'>Rhode Island</option>
                            <option value='SC'>South Carolina</option>
                            <option value='SD'>South Dakota</option>
                            <option value='TN'>Tennessee</option>
                            <option value='TX'>Texas</option>
                            <option value='UT'>Utah</option>
                            <option value='VT'>Vermont</option>
                            <option value='VA'>Virginia</option>
                            <option value='WA'>Washington</option>
                            <option value='WV'>West Virginia</option>
                            <option value='WI'>Wisconsin</option>
                            <option value='WY'>Wyoming</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <input
                            type='date'
                            name='delivery_date'
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <input
                        type='submit'
                        value='Calculate'
                        className='btn btn-primary'
                        onSubmit={e => onSubmit(e)}
                    />
                </form>
                <p className='my-1'>
                    Want to see your old Quotes?{' '}
                    <Link to='Quotes'>Quote History</Link>
                </p>
            </div>
        </Fragment>
    );
};

QuoteForm.propTypes = {
    addQuote: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    quote: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile,
    quote: state.quote
});

export default connect(
    mapStateToProps,
    { getCurrentProfile, addQuote }
)(withRouter(QuoteForm));
