/*
 *
 * Test actions
 *
 */

import {
    DEFAULT_ACTION,

    ERRORS_SHOWN,

    SUBMIT_ACTION,
    SUBMIT_SUCCESS_ACTION,
    SUBMIT_ERROR_ACTION,

    NAME_CHANGE_ACTION,
    LAST_NAME_CHANGE_ACTION,
    EMAIL_CHANGE_ACTION,
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

export function changeTestName(name) {
    return {
        type: NAME_CHANGE_ACTION,
        name,
    };
}
export function changeTestLastName(last_name) {
    return {
        type: LAST_NAME_CHANGE_ACTION,
        last_name,
    };
}
export function changeTestEmail(email) {
    return {
        type: EMAIL_CHANGE_ACTION,
        email,
    };
}

export function submitTest(name, last_name, email) {
    return {
        type: SUBMIT_ACTION,
        name,
        last_name,
        email,
    };
}

export function submitTestSuccess(res) {
    return {
        type: SUBMIT_SUCCESS_ACTION,
    };
}

export function submitTestError(errors) {
    return {
        type: SUBMIT_ERROR_ACTION,
        errors,
    };
}