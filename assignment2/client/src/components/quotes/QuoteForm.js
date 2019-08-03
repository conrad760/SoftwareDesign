import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { addQuote } from '../../actions/quote';
import Spinner from '../layout/Spinner';

function calcQuote(e) {
    var fuel = 1.5;
    var gallonsFactor = 0.03;
    var seasonFactor = 0.03;
    var historyFactor = 0;
    var profitMargin = 0.1;
    var locationFactor = 0.04;
    var price;
    if (e.gallons > 1000) {
        gallonsFactor = 0.02;
    }
    if ((e.State = 'TX')) {
        locationFactor = 0.02;
    }
    //history
    //season
    return (price =
        e.gallons * fuel +
        fuel *
            (profitMargin +
                gallonsFactor +
                seasonFactor +
                historyFactor +
                locationFactor));
}

const QuoteForm = ({ addQuote, history }) => {
    const [formData, setFormData] = useState({
        gallons: '',
        delivery_add: '',
        delivery_date: '',
        price: '',
        total: ''
    });

    const { gallons, delivery_add, delivery_date, price, total } = formData;

    console.log(formData);
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
                <form action='/' className='form' onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <input
                            type='number'
                            placeholder='Gallons needed'
                            name='gallons'
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Delivery Address'
                            name='delivery_add'
                            onChange={e => onChange(e)}
                            required
                        />
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
    addQuote: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getCurrentProfile, addQuote }
)(withRouter(QuoteForm));
