import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import QuoteItem from './QuoteItem';
import QuoteForm from './QuoteForm';
import { getQuotes } from '../../actions/quote';

const Quotes = ({
    getQuotes,
    auth: { user },
    profile: { profile },
    quote: { quotes, loading }
}) => {
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
    quote: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    quote: state.quote,
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getQuotes }
)(Quotes);
