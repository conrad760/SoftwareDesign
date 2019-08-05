import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import { getCurrentProfile } from '../../actions/profile';
import { getQuotes } from '../../actions/quote';

const QuoteItem = ({
    auth: { user },
    quote: { gallons, delivery_add, delivery_date, price, total }
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (
        <Fragment>
            <tr className='bg-light'>
                <td>{user !== null ? user.name : ''} </td>
                <td>
                    <Moment format='MM/DD/YYYY'>
                        {moment.utc(delivery_date)}
                    </Moment>{' '}
                </td>
                <td>{gallons} </td>
                <td>{delivery_add} </td>
                <td>{'$' + price.toFixed(2)} </td>
                <td>{'$' + total.toFixed(2)}</td>
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
