import axios from 'axios';
import { setAlert } from './alert';
import { GET_QUOTES, QUOTE_ERROR, ADD_QUOTE } from './types';

// Get quotes
export const getQuotes = () => async dispatch => {
    try {
        const res = await axios.get('/api/quote/me');

        dispatch({
            type: GET_QUOTES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: QUOTE_ERROR
        });
    }
};

// Add quote
export const addQuote = (formData, history) => async dispatch => {
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

        dispatch(setAlert('Quote created', 'success'));

        history.push('/quotes');
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: QUOTE_ERROR,
            payload: {
                msg: err.response.statusText,
                statusText: err.response.status
            }
        });
    }
};

// // Get quotes by id
// export const getQuotesByID = id => async dispatch => {
//     try {
//         const res = await axios.get(`/api/quote/${id}`);

//         dispatch({
//             type: GET_QUOTES,
//             payload: res.data
//         });
//     } catch (err) {
//         dispatch({
//             type: QUOTE_ERROR,
//             payload: {
//                 msg: err.response.statusText,
//                 statusText: err.response.status
//             }
//         });
//     }
// };
