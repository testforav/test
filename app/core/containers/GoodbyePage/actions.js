/*
 *
 * GoodbyePage actions
 *
 */

import {
    DEFAULT_ACTION,

    SUBMIT_ACTION,
    SUBMIT_SUCCESS_ACTION,
    SUBMIT_ERROR_ACTION,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function submitEmailConfirmPage(token) {
    return {
        type: SUBMIT_ACTION,
        token,
    };
}

export function submitDeleteSuccess(res) {
    return {
        type: SUBMIT_SUCCESS_ACTION,
        data: res.Result
    };
}

export function submitDeleteError(errors) {
    return {
        type: SUBMIT_ERROR_ACTION,
        errors,
    };
}
