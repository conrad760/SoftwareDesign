import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { getQuotes } from '../../actions/quote';

const QuoteItem = ({
    auth: { user },
    profile: { profile },
    quote: { _id, gallons, delivery_add, delivery_date, price, total }
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    // if statements below were for the same reason,
    // first load loads empty so we wait for user and profile
    // to be filled
    return (
        //                 <th>User</th> {/* testing */}
        //                 <th>Date</th>
        //                 <th>Gallons</th>
        //                 <th>State</th>
        //                 <th>Price/Gallon</th>
        //                 <th>Address</th>
        //                 <th>Total</th>
        <Fragment>
            <tr className='bg-light'>
                <td>{user !== null ? user.name : ''} </td>
                <td>{delivery_date} </td>
                <td>{gallons} </td>
                <td>{delivery_add} </td>
                <td>{price} </td>
                {/* <td>{profile !== null ? profile.Address_1 : ''} </td> */}
                <td>{total}</td>
            </tr>
        </Fragment>
    );
};

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
    { getQuotes, getCurrentProfile }
)(QuoteItem);
