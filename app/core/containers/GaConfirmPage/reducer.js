/*
 *
 * GaConfirmPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,

    GA_CONFIRM_TOKEN_SEND_SUCCESS,
    GA_CONFIRM_TOKEN_SEND_ERROR
} from './constants';

const initialState = fromJS({
    pageMessage: 'Checking your token...'
});

function gaConfirmPageReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case GA_CONFIRM_TOKEN_SEND_SUCCESS:
            return state
                .set('pageMessage', '2FA has been successfully activated.');
        case GA_CONFIRM_TOKEN_SEND_ERROR:
            return state
                .set('pageMessage', action.errors[0].text);

        default:
            return state;
    }
}

export default gaConfirmPageReducer;
