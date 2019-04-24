/*
 *
 * EmailConfirmPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    SUBMIT_ACTION,
    SUBMIT_SUCCESS_ACTION,
    SUBMIT_ERROR_ACTION,
} from './constants';

const initialState = fromJS({
    isFormLoading: false,
    formErrors: [],
    code: '',
});

function emailConfirmPageReducer(state = initialState, action) {
    switch (action.type) {
        case SUBMIT_ACTION:
            return state
                .set('isFormLoading', true);
        case SUBMIT_SUCCESS_ACTION:
            return state
                .set('isFormLoading', false);
        case SUBMIT_ERROR_ACTION:
            return state
                .set('isFormLoading', false);

        default:
            return state;
    }
}

export default emailConfirmPageReducer;
