/*
 *
 * WalletsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,

    LOAD_WALLETS_ACTION,
    LOAD_WALLETS_ACTION_SUCCESS,
    LOAD_WALLETS_ACTION_ERROR,
} from './constants';

const initialState = fromJS({
    isLoading: false,

    walletsList: []
});

function walletsPageReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case LOAD_WALLETS_ACTION:
            return state
                .set('isLoading', true);
        case LOAD_WALLETS_ACTION_SUCCESS:
            return state
                .set('walletsList', action.data.Result)
                .set('isLoading', false);
        case LOAD_WALLETS_ACTION_ERROR:
            return state
                .set('isLoading', false);

        default:
            return state;
    }
}

export default walletsPageReducer;
