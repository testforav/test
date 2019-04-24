/*
 *
 * HeaderContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,
    CURRENCY_CHANGE,
    TICKERS_RECIEVED,
} from './constants';

const initialState = fromJS({
    header: {
        currency: 'usd'
    },
    tickers: {

    },
});

function headerContainerReducer(state = initialState, action) {
    switch (action.type) {
        case CURRENCY_CHANGE:
            return state.setIn([
                'header', 'currency'
            ], action.currency);
        case TICKERS_RECIEVED:
            return state.setIn([
                'tickers', action.Channel
            ], action.Data);
        case DEFAULT_ACTION:
            return state;
        default:
            return state;
    }
}

export default headerContainerReducer;
