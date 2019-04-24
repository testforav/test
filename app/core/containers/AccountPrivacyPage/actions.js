/*
 *
 * AccountPrivacyPage actions
 *
 */

import {
    DEFAULT_ACTION,

    DELETE_ACCOUNT_SEND,
    DELETE_ACCOUNT_SEND_SUCCESS,
    DELETE_ACCOUNT_SEND_ERROR,

    REQUEST_PERSONAL_SEND,
    REQUEST_PERSONAL_SEND_SUCCESS,
    REQUEST_PERSONAL_SEND_ERROR,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function deleteAccountSend() {
    return {
        type: DELETE_ACCOUNT_SEND,
    };
}

export function deleteAccountSendSuccess(res) {
    return {
        type: DELETE_ACCOUNT_SEND_SUCCESS,
        data: res.Result
    };
}

export function deleteAccountSendError(errors) {
    return {
        type: DELETE_ACCOUNT_SEND_ERROR,
        errors,
    };
}

// Request personal
export function requestPersonalData() {
    return {
        type: REQUEST_PERSONAL_SEND,
    };
}

export function requestPersonalDataSuccess(res) {
    return {
        type: REQUEST_PERSONAL_SEND_SUCCESS,
        data: res.Result
    };
}

export function requestPersonalDataError(errors) {
    return {
        type: REQUEST_PERSONAL_SEND_ERROR,
        errors,
    };
}
