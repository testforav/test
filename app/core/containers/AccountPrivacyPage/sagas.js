import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { safeRequest } from 'core/utils/request';
import { push } from 'react-router-redux';

import { showNotification } from 'core/containers/App/actions';

import {
    DELETE_ACCOUNT_SEND,
    DELETE_ACCOUNT_SEND_SUCCESS,
    DELETE_ACCOUNT_SEND_ERROR,

    REQUEST_PERSONAL_SEND,
    REQUEST_PERSONAL_SEND_SUCCESS,
    REQUEST_PERSONAL_SEND_ERROR,
} from './constants';

import {
    deleteAccountSendSuccess,
    deleteAccountSendError,

    requestPersonalDataSuccess,
    requestPersonalDataError,
} from './actions';

export function* doSubmit(action) {
    _debug('send delete: ', action);

    const requestURL = `/v1/clients/delete/request`;

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }, deleteAccountSendSuccess, deleteAccountSendError);
}

export function* submitSaga() {
    while (true) {
        const actionSubmit = yield take(DELETE_ACCOUNT_SEND);

        if (!actionSubmit) {
            break;
        }

        yield fork(doSubmit, actionSubmit);
    }
}

function* submitSuccess() {

}

// Send personal data request
export function* doSendPersonalRequest(action) {
    _debug('sendPersonalRequest: ', action);

    const requestURL = `/v1/clients/upload-personal-data`;

    yield call(safeRequest, requestURL, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }, requestPersonalDataSuccess, requestPersonalDataError);
}

export function* sendRequestSaga() {
    while (true) {
        const actionSubmit = yield take(REQUEST_PERSONAL_SEND);

        if (!actionSubmit) {
            break;
        }

        yield fork(doSendPersonalRequest, actionSubmit);
    }
}

function* sendRequestSuccess() {

}

function* sendRequestError(action) {

}

// Watcher
export function* watcherSaga() {
    yield takeLatest(DELETE_ACCOUNT_SEND_SUCCESS, submitSuccess);
    yield takeLatest(REQUEST_PERSONAL_SEND_SUCCESS, sendRequestSuccess);
    yield takeLatest(REQUEST_PERSONAL_SEND_ERROR, sendRequestError);
}

// All sagas to be loaded
export default [
	submitSaga,
	sendRequestSaga,
    watcherSaga,
];
