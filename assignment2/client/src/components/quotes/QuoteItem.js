import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const QuoteItem = ({
    auth: { user },
    profile: { profile },
    quote: { _id, gallons, delivery_add, delivery_date, price, total }
}) => (
    <div>
        <tr class='bg-light'>
            <td>{user.name}</td>
            <td>123 Calhoun Rd, Houston, TX 77204</td>
            <td>06/03/19</td>
            <td>$2.78</td>
            <td>$2780.00</td>
            <td>05/13/19</td>
        </tr>
    </div>
);

QuoteItem.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    quote: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(
    mapStateToProps,
    {}
)(QuoteItem);
