import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import QuoteItem from './QuoteItem';
import { getCurrentProfile } from '../../actions/profile';
import { getQuotes } from '../../actions/quote';

const Quotes = ({
    getQuotes,
    getCurrentProfile,
    profile: { profile },
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
            <h1 className='large text-primary'>Quotes</h1>
            <p className='lead'>
                <i className='fas fa-user'> Welcome to your quotes</i>
            </p>
            {quotes.length !== 0 ? (
                <div className='quotes'>
                    <table>
                        <tr>
                            <th>User</th> {/* testing */}
                            <th>Date</th>
                            <th>Gallons</th>
                            <th>State</th>
                            <th>Price/Gallon</th>
                            {/* <th>Address</th> */}
                            <th>Total</th>
                        </tr>
                        <tbody>
                            {' '}
                            {quotes.map(quote => (
                                <QuoteItem key={quote._id} quote={quote} />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <h4>You have no quotes yet! Create a quote here.</h4>
                    <br />
                    <Link to='/create-quote' className='btn btn-light'>
                        <i className='fas fa-water text-primary' />
                        Create a quote
                    </Link>
                </div>
            )}
        </Fragment>
        // <Fragment>
        //     <table>
        //         <thread>
        //             <tr>
        //                 <th>Date</th>
        //                 <th>Gallons</th>
        //                 <th>State</th>
        //                 <th>Price/Gallon</th>
        //                 <th>Total</th>
        //             </tr>
        //             <tbody>
        //                 {' '}
        //                 {quotes.map(row => (
        //                     <tr>
        //                         <td>{row.user.name}</td>
        //                         <td>{row.gallons}</td>
        //                         {/* <td>{row.state}</td> */}
        //                         {/* <td>{row.price}</td> */}
        //                         {/* <td>{row.delivary}</td> */}
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </thread>
        //     </table>
        // </Fragment>
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
    quote: state.quote,
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getQuotes, getCurrentProfile }
)(Quotes);
