import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moments from 'react-moment';
import { connect } from 'react-redux';

const QuoteItem = ({
    quote: { _id, gallons, delivery_add, delivery_date, price, total, avatar }
}) => (
    <div>
        <tr class='bg-light'>
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
    quote: PropTypes.object.isRequired
};

export default connect(
    null,
    {}
)(QuoteItem);
