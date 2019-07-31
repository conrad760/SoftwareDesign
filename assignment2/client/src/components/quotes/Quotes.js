import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import QuoteItem from './QuoteItem';
import { getQuotes } from '../../actions/quote';

const Quotes = ({ getQuotes, quote: { quotes, loading } }) => {
    useEffect(() => {
        getQuotes();
    }, [getQuotes]);

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className='large text-primary'>Quotes</h1>
            <p className='lead'>
                <i className='fas fa-user'> Welcome to your quotes</i>
            </p>
            {/*quotes form*/}
            <div className='quotes'>
                {quotes.map(quote => (
                    <QuoteItem key={quote._id} quote={quote} />
                ))}
            </div>
        </Fragment>
    );
};

Quotes.propTypes = {
    getQuotes: PropTypes.func.isRequired,
    quote: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    quote: state.quote
});

export default connect(
    mapStateToProps,
    { getQuotes }
)(Quotes);
