import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { addQuote } from '../../actions/quote';

function calcQuote(e) {
    var fuel = 1.5;
    var gallonsFactor = 0.03;
    var seasonFactor = 0.03;
    var historyFactor = 0;
    var profitMargin = 0.1;
    var locationFactor = 0.04;

    if (e.gallons > 1000) {
        gallonsFactor = 0.02;
    }
    if ((e.State = 'TX')) {
        locationFactor = 0.02;
    }
    return (
        e.gallons * fuel +
        fuel *
            (profitMargin +
                gallonsFactor +
                seasonFactor +
                historyFactor +
                locationFactor)
    );
}

const QuoteForm = ({
    profile: { profile },
    getCurrentProfile,
    addQuote,
    history
}) => {
    useEffect(() => {
        getCurrentProfile();
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
    var primaryAddress = '';
    var secondaryAddress = '';
    if (profile !== null) {
        primaryAddress = profile.Address_1;
        secondaryAddress = profile.Address_2;

        var secondExist = true;
        if (secondaryAddress === null) secondExist = false;
        console.log('secondary Address exists? ', secondExist);
    }

    const { gallons, delivery_add, delivery_date, price, total } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addQuote(formData, history);
        console.log(calcQuote(formData));
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
                            onChange={e => onChange(e)}
                            required
                        >
                            <option>Select delivery address</option>
                            <option value={primaryAddress}>
                                {primaryAddress}
                            </option>
                            {secondExist ? (
                                <option value={secondaryAddress}>
                                    {secondaryAddress}
                                </option>
                            ) : (
                                <option disabled>No secondary address</option>
                            )}
                        </select>
                        {/* <input
                            type='text'
                            name='delivery_add'
                            value={waitingAddress}
                            onChange={e => onChange(e)}
                            required
                        /> */}
                    </div>
                    <div className='form-group'>
                        <input
                            type='date'
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <input
                        type='submit'
                        value='Calculate'
                        className='btn btn-primary'
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
    getCurrentProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getCurrentProfile, addQuote }
)(withRouter(QuoteForm));
