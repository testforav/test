import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { safeRequest } from 'core/utils/request';

import {
    SUBMIT_ACTION,
} from './constants';

import {
    submitTestSuccess,
    submitTestError,
} from './actions';

export function* doSubmit(action) {
    const { name, last_name, email } = action;

    const requestURL = '/api/v1/';

    yield call(safeRequest, requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            last_name,
            email,
        })
    }, submitTestSuccess, submitTestError);
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

// All sagas to be loaded
export default [
    submitSaga,
    defaultSaga,
];
