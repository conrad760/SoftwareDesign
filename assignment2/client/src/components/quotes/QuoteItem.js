import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const QuoteItem = ({
    auth,
    quote: { _id, user, gallons, delivery_add, delivery_date, price, total }
}) => (
    <div>
        <tr className='bg-light'>
            <td>1000</td>
            <td>123 Calhoun Rd, Houston, TX 77204</td>
            <td>06/03/19</td>
            <td>$2.78</td>
            <td>$2780.00</td>
            <td>05/13/19</td>
        </tr>
    </div>
);

QuoteItem.propTypes = {
    auth: PropTypes.object.isRequired,
    quote: PropTypes.object.isRequired
};

export default connect(
    null,
    {}
)(QuoteItem);
