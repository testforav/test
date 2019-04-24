/*
 *
 * PasswordResetPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,

    ERRORS_SHOWN,

    SUBMIT_ACTION,
    SUBMIT_SUCCESS_ACTION,
    SUBMIT_ERROR_ACTION,

    PASSWORD_CHANGE_ACTION,
    PASSWORD_REPEAT_CHANGE_ACTION,
} from './constants';

const initialState = fromJS({
    isFormLoading: false,
    formErrors: [],
    password: '',
    password_repeat: '',
});

function passwordResetPageReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case SUBMIT_ACTION:
            return state
                .set('isFormLoading', true);
        case SUBMIT_SUCCESS_ACTION:
            return state
                .set('isFormLoading', false)
                .set('formErrors', []);
        case SUBMIT_ERROR_ACTION:
            return state
                .set('isFormLoading', false)
                .set('formErrors', action.errors);

        case PASSWORD_CHANGE_ACTION:
            return state
                .set('password', action.password);
        case PASSWORD_REPEAT_CHANGE_ACTION:
            return state
                .set('password_repeat', action.password_repeat);

        default:
            return state;
    }
}

export default passwordResetPageReducer;
