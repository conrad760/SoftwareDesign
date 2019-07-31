import { GET_QUOTES, QUOTE_ERROR } from '../actions/types';

const initialState = {
    quotes: [],
    quote: null,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_QUOTES:
            return {
                ...state,
                quotes: payload,
                loading: false
            };
        case QUOTE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
