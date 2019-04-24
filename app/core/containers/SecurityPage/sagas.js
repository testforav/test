import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { safeRequest } from 'core/utils/request';

import {
    SUBMIT_ACTION,
    SUBMIT_DISABLE_GOOGLE_ACTION,
    LOAD_ACTIVITY_ACTION,

    LOAD_BACKUP,
    LOAD_BACKUP_SUCCESS,
    LOAD_BACKUP_ERROR,

    UPDATE_BACKUP,
    UPDATE_BACKUP_SUCCESS,
    UPDATE_BACKUP_ERROR
} from './constants';

import {
    submitSecurityPageSuccess,
    submitSecurityPageError,

    submitSecurityDisableGooglePageSuccess,
    submitSecurityDisableGooglePageError,

    loadActivitySuccess,
    loadActivityError,

    loadBackupCodesSuccess,
    loadBackupCodesError,

    updateBackupCodesSuccess,
    updateBackupCodesError,
} from './actions';

export function* doSubmit(action) {
    const { G2fatkn, Secret } = action;

    const requestURL = '/v1/clients/confirm-g2fa';

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'G2fatkn=' + G2fatkn + '&Secret=' + Secret
    }, submitSecurityPageSuccess, submitSecurityPageError);
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

export function* doSubmitDisableGoogle(action) {
    const { G2fatkn } = action;

    const requestURL = '/v1/clients/switchoff-g2fa';

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'G2fatkn=' + G2fatkn
    }, submitSecurityDisableGooglePageSuccess, submitSecurityDisableGooglePageError);
}

export function* submitDisableGoogleSaga() {
    while (true) {
        const actionSubmit = yield take(SUBMIT_DISABLE_GOOGLE_ACTION);

        if (!actionSubmit) {
            break;
        }

        yield fork(doSubmitDisableGoogle, actionSubmit);
    }
}

export function* doLoadActivity(action) {

    const requestURL = '/v1/clients/activity';

    yield call(safeRequest, requestURL, {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }, loadActivitySuccess, loadActivityError);
}

export function* loadActivitySaga() {
    while (true) {
        const actionLoad = yield take(LOAD_ACTIVITY_ACTION);

        if (!actionLoad) {
            break;
        }

        yield fork(doLoadActivity, actionLoad);
    }
}

// Load backup codes
export function* doLoadBackupCodes(action) {

    const requestURL = '/v1/clients/backup-code';

    yield call(safeRequest, requestURL, {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }, loadBackupCodesSuccess, loadBackupCodesError);
}

export function* loadBackupCodesSaga() {
    while (true) {
        const actionLoad = yield take(LOAD_BACKUP);

        if (!actionLoad) {
            break;
        }

        yield fork(doLoadBackupCodes, actionLoad);
    }
}

// Update backup codes
export function* doUpdateBackupCodes(action) {

    const requestURL = '/v1/clients/backup-code';

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }, updateBackupCodesSuccess, updateBackupCodesError);
}

export function* updateBackupCodesSaga() {
    while (true) {
        const actionLoad = yield take(UPDATE_BACKUP);

        if (!actionLoad) {
            break;
        }

        yield fork(doUpdateBackupCodes, actionLoad);
    }
}

// Individual exports for testing
export function* defaultSaga() {
    // See example in containers/HomePage/sagas.js
}

// All sagas to be loaded
export default [
    submitSaga,
    submitDisableGoogleSaga,
    defaultSaga,
    loadActivitySaga,
    loadBackupCodesSaga,
    updateBackupCodesSaga,
];
