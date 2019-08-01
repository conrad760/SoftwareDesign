import axios from 'axios';
import { setAlert } from './alert';
import { GET_QUOTES, QUOTE_ERROR, ADD_QUOTE } from './types';

// Get quotes
export const getQuotes = () => async dispatch => {
    try {
        const res = await axios.get('/api/quote');

        dispatch({
            type: GET_QUOTES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: QUOTE_ERROR,
            payload: {
                msg: err.response.statusText,
                statusText: err.response.status
            }
        });
    }
};

// Add quote
export const addQuote = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/quote', formData, config);

        dispatch({
            type: ADD_QUOTE,
            payload: res.data
        });

        dispatch(setAlert('Quote Created', 'success'));
    } catch (err) {
        dispatch({
            type: QUOTE_ERROR,
            payload: {
                msg: err.response.statusText,
                statusText: err.response.status
            }
        });
    }
};
