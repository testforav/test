import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { safeRequest } from 'core/utils/request';
import { push } from 'react-router-redux';

import {
    SUBMIT_ACTION,
    SUBMIT_SUCCESS_ACTION,
} from './constants';

import {
    submitEmailConfirmPageSuccess,
    submitEmailConfirmPageError,
} from './actions';

export function* doSubmit(action) {
    const { Pin, Token, Consent } = action;

    _debug('send confirm code: ', Pin, Consent);

    const requestURL = `/v1/clients/confirm-email`;
    let query = 'Pin=' + Pin + '&Token=' + Token;

    if (Consent) {
        query += '&consent=' + Consent
    }

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: query
    }, submitEmailConfirmPageSuccess, submitEmailConfirmPageError);
}

export function* submitSaga() {
    while (true) {
        const actionSubmit = yield take(SUBMIT_ACTION);

        if (!actionSubmit) {
            break;
        }

        yield fork(doSubmit, actionSubmit);
    }
}

// Individual exports for testing
export function* defaultSaga() {
    // See example in containers/HomePage/sagas.js
}

function* submitSuccess() {
    yield put(push('/'));
}

// Watcher
export function* watcherSaga() {
    yield takeLatest(SUBMIT_SUCCESS_ACTION, submitSuccess);
}

// All sagas to be loaded
export default [
	submitSaga,
    defaultSaga,
    watcherSaga,
];
