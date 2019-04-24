import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { safeRequest } from 'core/utils/request';
import { showNotification } from 'core/containers/App/actions';

import {
    SUBMIT_ACTION,
    SUBMIT_SUCCESS_ACTION,
    SUBMIT_ERROR_ACTION,
} from './constants';

import {
    submitPasswordResetPageSuccess,
    submitPasswordResetPageError,
} from './actions';

import {
    loadUser
} from 'core/containers/App/actions';

export function* doSubmit(action) {
    const { pass, token } = action;

    const requestURL = '/v1/clients/password/reset';

    yield call(safeRequest, requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'Password=' + encodeURIComponent(pass) + '&Token=' + token
    }, submitPasswordResetPageSuccess, submitPasswordResetPageError);
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

function* submitSuccess() {
    yield put(replace('/signin'));
}

function* submitError(action) {
    yield put(showNotification({
        type: 'danger',
        message: {
            id: action.errors[0].Message,
            defaultMessage: action.errors[0].Message,
        },
    }));
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
