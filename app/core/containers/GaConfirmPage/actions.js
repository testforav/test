/*
 *
 * GaConfirmPage actions
 *
 */

import {
    GA_CONFIRM_TOKEN_SEND,
    GA_CONFIRM_TOKEN_SEND_SUCCESS,
    GA_CONFIRM_TOKEN_SEND_ERROR
} from './constants';

export function gaConfirmTokenSend(token) {
    return {
        type: GA_CONFIRM_TOKEN_SEND,
        token
    };
}

export function gaConfirmTokenSendSuccess(res) {
    return {
        type: GA_CONFIRM_TOKEN_SEND_SUCCESS,
        data: res.result
    };
}

export function gaConfirmTokenSendError(errors) {
    return {
        type: GA_CONFIRM_TOKEN_SEND_ERROR,
        errors
    };
}
