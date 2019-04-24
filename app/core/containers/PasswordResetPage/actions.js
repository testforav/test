/*
 *
 * PasswordResetPage actions
 *
 */

import {
    DEFAULT_ACTION,

    ERRORS_SHOWN,

    SUBMIT_ACTION,
    SUBMIT_SUCCESS_ACTION,
    SUBMIT_ERROR_ACTION,

    PASSWORD_CHANGE_ACTION,
    PASSWORD_REPEAT_CHANGE_ACTION,
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

export function changePasswordResetPagePassword(password) {
    return {
        type: PASSWORD_CHANGE_ACTION,
        password,
    };
}
export function changePasswordResetPagePasswordRepeat(password_repeat) {
    return {
        type: PASSWORD_REPEAT_CHANGE_ACTION,
        password_repeat,
    };
}

export function submitPasswordResetPage({ pass, token }) {
    return {
        type: SUBMIT_ACTION,
        pass,
        token,
    };
}

export function submitPasswordResetPageSuccess(res) {
    return {
        type: SUBMIT_SUCCESS_ACTION,
    };
}

export function submitPasswordResetPageError(errors) {
    return {
        type: SUBMIT_ERROR_ACTION,
        errors,
    };
}
