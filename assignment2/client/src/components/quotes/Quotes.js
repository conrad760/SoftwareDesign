import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import QuoteItem from './QuoteItem';
import QuoteForm from './QuoteForm';
import { getCurrentProfile } from '../../actions/profile';
import { getQuotes } from '../../actions/quote';

const Quotes = ({
    getQuotes,
    getCurrentProfile,
    profile,
    auth: { user },
    quote: { quotes, loading }
}) => {
    useEffect(() => {
        getCurrentProfile();
        getQuotes();
    }, [getQuotes, getCurrentProfile]);

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <table>
                <thread>
                    <tr>
                        <th>Date</th>
                        <th>Gallons</th>
                        <th>State</th>
                        <th>Price/Gallon</th>
                        <th>Total</th>
                    </tr>
                    <tbody>
                        {' '}
                        {quotes.map(row => (
                            <tr>
                                <td>{row.user.name}</td>
                                <td>{row.gallons}</td>
                                {/* <td>{row.state}</td> */}
                                {/* <td>{row.price}</td> */}
                                {/* <td>{row.delivary}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </thread>
            </table>
        </Fragment>
    );
};

Quotes.propTypes = {
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    getQuotes: PropTypes.func.isRequired,
    quote: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    quote: state.quote
});

export default connect(
    mapStateToProps,
    { getQuotes, getCurrentProfile }
)(Quotes);
