import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { safeRequest } from 'core/utils/request';
import { showNotification } from 'core/containers/App/actions';

import { stringify } from 'query-string';

import {
    SAVE_ACTION,
    SAVE_SUCCESS_ACTION,

    UPLOAD_ACTION,
    UPLOAD_ERROR_ACTION,
    UPLOAD_SUCCESS_ACTION,
} from './constants';

import {
    saveSuccessAction,
    saveErrorAction,

    getUploadSuccessAction,
    uploadErrorAction,
} from './actions';

export function* doSave(action) {
    _debug(action.data);
    const requestURL = '/v1/clients/verify/kyc';
    const data = action.data;

    data.Address = (data.Postal || '') + ' // ' + data.Street + ' // ' + (data.Appartments || '');
    data.Documents = JSON.stringify(data.Documents);

    const bodyString = stringify(data);

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyString,
    }, saveSuccessAction, saveErrorAction);
}

export function* doUpload(action) {
    _debug('upload in saga: ', action.file.name);
    const requestURL = '/v1/clients/verify/kyc/upload';
    const data = new FormData();

    data.append('Scan', action.file, action.file.name);

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: "same-origin",
        body: data
    }, getUploadSuccessAction(action.index), uploadErrorAction);
}

export function* uploadErrorCallback(action) {
    _debug('error notification: ', action);
    yield put(showNotification({
        type: 'danger',
        message: 'Upload error. Please, re-upload your file',
    }));
}

export function* uploadSuccessCallback(action) {
    _debug('success notification: ', action);
    yield put(showNotification({
        type: 'success',
        message: 'Upload success',
    }));
}

export function* doNotification(action) {
    _debug('saved notification');
    yield put(showNotification({
        type: 'success',
        message: 'KYC verification data sent',
        timeout: 500,
    }));
}

// Individual exports for testing
export function* notificationsSaga() {
    // See example in containers/HomePage/sagas.js
    while (true) {
        const action = yield take(SAVE_SUCCESS_ACTION);

        if (!action) {
            break;
        }

        yield fork(doNotification, action);
    }
}

// Individual exports for testing
export function* uploadSaga() {
    // See example in containers/HomePage/sagas.js
    while (true) {
        const loadAction = yield take(UPLOAD_ACTION);

        if (!loadAction) {
            break;
        }

        yield fork(doUpload, loadAction);
    }
}

// Individual exports for testing
export function* defaultSaga() {
    // See example in containers/HomePage/sagas.js
    while (true) {
        const saveAction = yield take(SAVE_ACTION);

        if (!saveAction) {
            break;
        }

        yield fork(doSave, saveAction);
    }
}

// Watcher saga
export function* watcherSaga() {
    yield takeLatest(UPLOAD_ERROR_ACTION, uploadErrorCallback);
    yield takeLatest(UPLOAD_SUCCESS_ACTION, uploadSuccessCallback);
}

// All sagas to be loaded
export default [
    defaultSaga,
    uploadSaga,
    notificationsSaga,
    watcherSaga,
];
