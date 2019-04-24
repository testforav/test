import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { safeRequest } from 'core/utils/request';
import { push } from 'react-router-redux';

import {
    SUBMIT_ACTION,
    SUBMIT_SUCCESS_ACTION,
    SUBMIT_ERROR_ACTION,
} from './constants';

import {
    submitDeleteSuccess,
    submitDeleteError,
} from './actions';

import {
    hardResetDefaults,
} from 'core/containers/App/actions'

export function* doSubmit(action) {
    const { token } = action;
    let query = '';

    _debug('send delete confirm: ', token);

    const requestURL = `/v1/clients/delete`;

    if (token) {
        query += 'Token=' + token
    }

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: query
    }, submitDeleteSuccess, submitDeleteError);
}

export function* submitSaga() {
    yield takeLatest(SUBMIT_ACTION, doSubmit);
}

function* submitSuccess() {
    yield put(hardResetDefaults());
}

function* submitError() {

}

// Watcher
export function* watcherSaga() {
    yield takeLatest(SUBMIT_SUCCESS_ACTION, submitSuccess);
    yield takeLatest(SUBMIT_ERROR_ACTION, submitError);
}

// All sagas to be loaded
export default [
	submitSaga,
    watcherSaga,
];
