import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addQuote } from '../../actions/quote';

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
                <h1 class='large text-primary'>Get a Quote!</h1>
                <p class='lead'>
                    <i class='fab fa-connectdevelop' />
                    You can get a quote in less than a minute!
                </p>
                <form action='/' class='form'>
                    <div class='form-group'>
                        <input
                            type='text'
                            placeholder='Gallons needed'
                            name='gallons'
                            required
                        />
                    </div>
                    <div class='form-group'>
                        <input
                            type='text'
                            placeholder='Delivery Address'
                            name='delivery_add'
                            required
                        />
                    </div>
                    <div class='form-group'>
                        <input type='datetime' placeholder='Delivery Date' />
                    </div>
                    <input
                        type='submit'
                        value='Calculate'
                        class='btn btn-primary'
                    />
                </form>
                <p class='my-1'>
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

export default connect(
    null,
    { addQuote }
)(withRouter(QuoteForm));
