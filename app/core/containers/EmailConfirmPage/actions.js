/*
 *
 * EmailConfirmPage actions
 *
 */

import {
    DEFAULT_ACTION,

    ERRORS_SHOWN,

    SUBMIT_ACTION,
    SUBMIT_SUCCESS_ACTION,
    SUBMIT_ERROR_ACTION,

    CODE_CHANGE_ACTION,
} from './constants';

export function submitEmailConfirmPage({Pin, Token, Consent}) {
    return {
        type: SUBMIT_ACTION,
        Pin,
        Token,
        Consent,
    };
}

export function submitEmailConfirmPageSuccess(res) {
    return {
        type: SUBMIT_SUCCESS_ACTION,
        data: res.Result
    };
}

export function submitEmailConfirmPageError(errors) {
    return {
        type: SUBMIT_ERROR_ACTION,
        errors,
    };
}
