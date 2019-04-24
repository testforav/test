import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { stringify } from 'query-string';
import ReactGA from 'react-ga';

import { safeRequest } from 'core/utils/request';
import { showNotification } from 'core/containers/App/actions';

import {
    SAVE_ACTION,
    SAVE_SUCCESS_ACTION,
    SAVE_ERROR_ACTION,

    CHECK_ACTION,
    CHECK_SUCCESS_ACTION,
    CHECK_ERROR_ACTION,

    CANCEL_ACTION,
    CANCEL_ERROR_ACTION,

    UPLOAD_ACTION,
    UPLOAD_ERROR_ACTION,
    UPLOAD_SUCCESS_ACTION,

    POR_ACTION,
    POR_ERROR_ACTION,
    POR_SUCCESS_ACTION,

    INIT_ACTION,
} from './constants';

import {
    saveSuccessAction,
    saveErrorAction,
    checkSuccessAction,
    checkErrorAction,

    getUploadSuccessAction,
    uploadErrorAction,

    porSuccessAction,
    porErrorAction,

    initSuccessAction,
    initErrorAction,
} from './actions';

import messages from 'containers/VerificationPage/messages';

export function* doSave(action) {
    _debug(action.data);

    const requestURL = '/v1/clients/verify/sumsub/init';
    const data = action.data;
    const bodyString = stringify(data);

    // if (!window.isLockedOnfidoSave || window.disableOnfidoFix) {
    //     window.isLockedOnfidoSave = true;
        yield call(safeRequest, requestURL, {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: bodyString,
        }, saveSuccessAction, saveErrorAction);
    // }
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

export function* doCheck(action) {
    const requestURL = '/v1/clients/verify/sumsub/check';

    // if (!window.isLockedOnfidoCheck || window.disableOnfidoFix) {
    //     window.isLockedOnfidoCheck = true;
    _debug('[IDENSIC DEMO] Idensic message: save!')
        yield call(safeRequest, requestURL, {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }, checkSuccessAction, checkErrorAction);
    // }
}

// Individual exports for testing
export function* checkSaga() {
    // See example in containers/HomePage/sagas.js
    while (true) {
        const checkAction = yield take(CHECK_ACTION);

        if (!checkAction) {
            break;
        }

        yield fork(doCheck, checkAction);
    }
}

export function* checkErrorCallback(action) {
    _debug('error notification: ', action);
    yield put(showNotification({
        type: 'danger',
        message: messages.onfidoErrorMessage,
    }));
}

export function* checkSuccessCallback(action) {
    _debug('success notification: ', action);

    ReactGA.event({
        category: 'Verification',
        action: 'Step3',
        label: 'Submit',
        value: 1
    });

    yield put(showNotification({
        type: 'success',
        message: messages.onfidoProgressMessage,
    }));
}

export function* doPor(action) {
    const requestURL = '/v1/clients/verify/v2/por';
    const data = action.data;
    const bodyString = stringify(data);

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyString,
    }, porSuccessAction, porErrorAction);
}

export function* porSaga() {
    // See example in containers/HomePage/sagas.js
    while (true) {
        const porAction = yield take(POR_ACTION);

        if (!porAction) {
            break;
        }

        yield fork(doPor, porAction);
    }
}

export function* porErrorCallback(action) {
    _debug('error notification: ', action);
    yield put(showNotification({
        type: 'danger',
        message: messages.onfidoErrorMessage,
    }));
}

export function* porSuccessCallback(action) {
    _debug('success notification: ', action);

    ReactGA.event({
        category: 'Verification',
        action: 'POR',
        label: 'Submit',
        value: 1
    });

    yield put(showNotification({
        type: 'success',
        message: messages.onfidoProgressMessage,
    }));
}

export function* cancelErrorCallback(action) {
    _debug('error notification: ', action);
    yield put(showNotification({
        type: 'danger',
        message: messages.onfidoErrorMessage,
    }));
}

export function* saveErrorCallback(action) {
    _debug('error save: ', action);

    yield put(showNotification({
        type: 'danger',
        message: {
            id: action.errors[0].Message,
            defaultMessage: action.errors[0].Message,
        },
    }));
}

export function* saveSuccessCallback(action) {
    _debug('success save: ', action);

    ReactGA.event({
        category: 'Verification',
        action: 'Step2',
        label: 'Submit',
        value: 1
    });
}

// Watcher saga
export function* watcherSaga() {
    yield takeLatest(CHECK_SUCCESS_ACTION, checkSuccessCallback);
    yield takeLatest(CHECK_ERROR_ACTION, checkErrorCallback);

    yield takeLatest(CANCEL_ERROR_ACTION, cancelErrorCallback);

    yield takeLatest(SAVE_ERROR_ACTION, saveErrorCallback);
    yield takeLatest(SAVE_SUCCESS_ACTION, saveSuccessCallback);

    yield takeLatest(UPLOAD_ERROR_ACTION, uploadErrorCallback);
    yield takeLatest(UPLOAD_SUCCESS_ACTION, uploadSuccessCallback);

    yield takeLatest(POR_ERROR_ACTION, porErrorCallback);
    yield takeLatest(POR_SUCCESS_ACTION, porSuccessCallback);
}

export function* doCancel(action) {
    const requestURL = '/v1/clients/verify/onfido/cancel';

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }, cancelSuccessAction, cancelErrorAction);
}

// Individual exports for testing
export function* cancelSaga() {
    // See example in containers/HomePage/sagas.js
    while (true) {
        const cancelAction = yield take(CANCEL_ACTION);

        if (!cancelAction) {
            break;
        }

        yield fork(doCancel, cancelAction);
    }
}

export function* doUpload(action) {
    _debug('upload in saga: ', action.file.name);
    const requestURL = '/v1/clients/verify/v2/por/upload';
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
        message: messages.uploadError,
    }));
}

export function* uploadSuccessCallback(action) {
    _debug('success notification: ', action);
    yield put(showNotification({
        type: 'success',
        message: messages.uploadSuccess,
    }));
}

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

export function* doInit(action) {
    const requestURL = '/v1/clients/verify/sumsub/token';

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }, initSuccessAction, initErrorAction);
}

// Individual exports for testing
export function* initSaga() {
    // See example in containers/HomePage/sagas.js
    while (true) {
        const initAction = yield take(INIT_ACTION);

        if (!initAction) {
            break;
        }

        yield fork(doInit, initAction);
    }
}

// All sagas to be loaded
export default [
    defaultSaga,
    checkSaga,
    porSaga,
    cancelSaga,
    watcherSaga,
    uploadSaga,
    initSaga,
];
