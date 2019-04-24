/*
 *
 * PasswordPage actions
 *
 */

import {
    DEFAULT_ACTION,

    ERRORS_SHOWN,
    SEND_PASSWORD_CHANGE,
    SEND_PASSWORD_CHANGE_SUCCESS,
    SEND_PASSWORD_CHANGE_ERROR,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function errorsShown() {
    return {
        type: ERRORS_SHOWN
    };
}

export function sendPasswordChange({OldPassword, Password}) {
    return {
        type: SEND_PASSWORD_CHANGE,
        OldPassword,
        Password,
    };
}

export function sendPasswordChangeSuccess(res) {
    return {
        type: SEND_PASSWORD_CHANGE_SUCCESS,
        loading: false,
        data: res.Result
    };
}

export function sendPasswordChangeError(errors) {
    return {
        type: SEND_PASSWORD_CHANGE_ERROR,
        loading: false,
        errors
    };
}
