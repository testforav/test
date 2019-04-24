/*
 *
 * VerificationPage actions
 *
 */

import {
    DEFAULT_ACTION,
    CHANGE_FIELD_ACTION,

    SET_DEFAULT_ACTION,

    SAVE_ACTION,
    SAVE_SUCCESS_ACTION,
    SAVE_ERROR_ACTION,

    UPLOAD_ACTION,
    UPLOAD_SUCCESS_ACTION,
    UPLOAD_ERROR_ACTION,
} from './constants';

export function changeFieldAction(key, value) {
    return {
        type: CHANGE_FIELD_ACTION,
        key,
        value,
    };
}

export function saveAction(data, token) {
    return {
        type: SAVE_ACTION,
        data,
        token,
    };
}

export function setDefaultAction(data, status) {
    return {
        type: SET_DEFAULT_ACTION,
        data,
        status,
    };
}

export function saveSuccessAction(res) {
    return {
        data: res.result,
        type: SAVE_SUCCESS_ACTION,
    };
}

export function saveErrorAction() {
    return {
        type: SAVE_ERROR_ACTION,
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
