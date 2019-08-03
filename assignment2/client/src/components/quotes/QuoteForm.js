import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { addQuote } from '../../actions/quote';
import Spinner from '../layout/Spinner';

const QuoteForm = ({ addQuote, history }) => {
    const [formData, setFormData] = useState({
        gallons: '',
        delivery_add: '',
        delivery_date: '',
        price: '',
        total: ''
    });

    const { gallons, delivery_add, delivery_date, price, total } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        QuoteForm(formData, history);
    };

    return (
        <Fragment>
            <div>
                <h1 className='large text-primary'>Get a Quote!</h1>
                <p className='lead'>
                    <i className='fab fa-connectdevelop' />
                    You can get a quote in less than a minute!
                </p>
                <form action='/create-quote' className='form'>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Gallons needed'
                            name='gallons'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Delivery Address'
                            name='delivery_add'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input type='datetime' placeholder='Delivery Date' />
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
