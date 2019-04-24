import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { safeRequest } from 'core/utils/request';

import {
    SUBMIT_FORGOT_PASSWORD,
} from './constants';

import {
    submitForgotPasswordSuccess,
    submitForgotPasswordError,
} from './actions';

export function* doForgot(action) {
    const { Email } = action;

    const requestURL = '/v1/clients/password/reset/request';

    yield call(safeRequest, requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'Email=' + encodeURIComponent(Email)
    }, submitForgotPasswordSuccess, submitForgotPasswordError);
}

export function* forgotSaga() {
    while (true) {
        const action = yield take(SUBMIT_FORGOT_PASSWORD);

        if (!action) {
            break;
        }

        yield fork(doForgot, action);
    }
}

// All sagas to be loaded
export default [
    forgotSaga,
];
