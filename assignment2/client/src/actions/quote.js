import axios from 'axios';
import { setAlert } from './alert';
import { GET_QUOTES, QUOTE_ERROR } from './types';

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
