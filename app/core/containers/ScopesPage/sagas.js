import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { safeRequest } from 'core/utils/request';
import { showNotification, loadUser } from 'core/containers/App/actions';
import { replace } from 'react-router-redux';
import * as Cookies from 'js-cookie';

import {
    SEND_CONSENT,
    SEND_CONSENT_SUCCESS,
    SEND_CONSENT_ERROR,

    SEND_CONSENT_REJECT,
    SEND_CONSENT_REJECT_SUCCESS,
    SEND_CONSENT_REJECT_ERROR,

    // CHECK_CONSENT,
    // CHECK_CONSENT_SUCCESS,
    // CHECK_CONSENT_ERROR,
    // CHECK_CONSENT_RESET,
} from './constants';

import { setConsent } from 'core/containers/App/actions';

import {
    sendConsentSuccess,
    sendConsentError,

    sendConsentRejectSuccess,
    sendConsentRejectError
} from './actions';

// Consent
export function* consentSaga() {
    while (true) {
        const watcher = yield take(SEND_CONSENT);

        if (!watcher) {
            break;
        }

        yield fork(doSendConsent, watcher);
    }
}

export function* doSendConsent(action) {
    const { consent, requestedScopes } = action;

    _debug('SEND_CONSENT: ', consent, requestedScopes);

    const requestURL = '/v1/consents/accept';

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: 'include',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'Consent=' + consent + '&GrantedScopes=' + requestedScopes
    }, sendConsentSuccess, sendConsentError);
}

function* onSendConsentSuccess(action) {
    _debug('SEND_CONSENT_SUCCESS: ', action);
}

function* onSendConsentError(action) {
    _debug('SEND_CONSENT_ERROR: ', action);

    if (action.errors && (action.errors[0].Key !== 'Token')) {
        yield put(setConsent(''));
    }

    window.location.replace('/account');
}

// Consent reject
export function* consentRejectSaga() {
    while (true) {
        const watcher = yield take(SEND_CONSENT_REJECT);

        if (!watcher) {
            break;
        }

        yield fork(doSendConsentReject, watcher);
    }
}

export function* doSendConsentReject(action) {
    const { consent, reason } = action;

    _debug('SEND_CONSENT_REJECT: ', consent, reason);

    const requestURL = '/v1/consents/reject';

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: 'include',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'Consent=' + consent + '&Reason=' + reason
    }, sendConsentRejectSuccess, sendConsentRejectError);
}

function* onSendConsentRejectSuccess(action) {
    _debug('SEND_CONSENT_REJECT_SUCCESS: ', action);

    if (action.data && !action.data.Redirect) {
        yield put(setConsent(''));

        window.location.replace('/account');
    }
}

function* onSendConsentRejectError(action) {
    _debug('SEND_CONSENT_REJECT_ERROR: ', action);

    if (action.errors && (action.errors[0].Key !== 'Token')) {
        yield put(setConsent(''));
    }

    window.location.replace('/account');
}


// Watcher saga
export function* watcherSaga() {
    yield takeLatest(SEND_CONSENT_SUCCESS, onSendConsentSuccess);
    yield takeLatest(SEND_CONSENT_ERROR, onSendConsentError);

    yield takeLatest(SEND_CONSENT_REJECT_SUCCESS, onSendConsentRejectSuccess);
    yield takeLatest(SEND_CONSENT_REJECT_ERROR, onSendConsentRejectSuccess);
}

// All sagas to be loaded
export default [
    watcherSaga,

    consentSaga,
    consentRejectSaga
];
