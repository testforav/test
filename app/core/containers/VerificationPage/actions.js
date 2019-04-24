/*
 *
 * VerificationPage actions
 *
 */

import {
    DEFAULT_ACTION,
    CHANGE_FIELD_ACTION,

    SAVE_ACTION,
    SAVE_SUCCESS_ACTION,
    SAVE_ERROR_ACTION,

    CHECK_ACTION,
    CHECK_SUCCESS_ACTION,
    CHECK_ERROR_ACTION,

    CANCEL_ACTION,
    CANCEL_SUCCESS_ACTION,
    CANCEL_ERROR_ACTION,

    SET_DEFAULT_ACTION,

    UPLOAD_ACTION,
    UPLOAD_SUCCESS_ACTION,
    UPLOAD_ERROR_ACTION,

    POR_ACTION,
    POR_SUCCESS_ACTION,
    POR_ERROR_ACTION,

    INIT_ACTION,
    INIT_SUCCESS_ACTION,
    INIT_ERROR_ACTION,
} from './constants';

export function changeFieldAction(key, value) {
    return {
        type: CHANGE_FIELD_ACTION,
        key,
        value,
    };
}

export function saveAction(data) {
    return {
        type: SAVE_ACTION,
        data,
    };
}

export function saveSuccessAction(res) {
    return {
        data: res,
        type: SAVE_SUCCESS_ACTION,
    };
}

export function saveErrorAction(errors) {
    return {
        type: SAVE_ERROR_ACTION,
        errors
    };
}

export function checkAction(data) {
    return {
        type: CHECK_ACTION,
        data,
    };
}

export function checkSuccessAction(res) {
    return {
        data: res,
        type: CHECK_SUCCESS_ACTION,
    };
}

export function checkErrorAction() {
    return {
        type: CHECK_ERROR_ACTION,
    };
}

export function cancelAction(data) {
    return {
        type: CANCEL_ACTION,
        data,
    };
}

export function cancelSuccessAction(res) {
    return {
        data: res,
        type: CANCEL_SUCCESS_ACTION,
    };
}

export function cancelErrorAction() {
    return {
        type: CANCEL_ERROR_ACTION,
    };
}

export function setDefaultAction(data, status) {
    return {
        type: SET_DEFAULT_ACTION,
        data,
        status,
    };
}

export function uploadAction(file, index) {
    return {
        type: UPLOAD_ACTION,
        file,
        index,
    };
}
export function uploadSuccessAction(res) {
    return {
        data: res.result,
        type: UPLOAD_SUCCESS_ACTION,
    };
}

export function uploadErrorAction(errors) {
    return {
        type: UPLOAD_ERROR_ACTION,
        errors
    };
}

export function getUploadSuccessAction(index) {
    return (res) => {
        return {
            data: res,
            index: index,
            type: UPLOAD_SUCCESS_ACTION,
        }
    };
}

export function porAction(data) {
    return {
        type: POR_ACTION,
        data,
    };
}

export function porSuccessAction(res) {
    return {
        data: res,
        type: POR_SUCCESS_ACTION,
    };
}

export function porErrorAction() {
    return {
        type: POR_ERROR_ACTION,
    };
}

export function initAction(isLoading) {
    return {
        type: INIT_ACTION,
        isLoading,
    };
}

export function initSuccessAction(res) {
    return {
        data: res,
        type: INIT_SUCCESS_ACTION,
    };
}

export function initErrorAction() {
    return {
        type: INIT_ERROR_ACTION,
    };
}