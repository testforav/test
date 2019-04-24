import { take, call, put, select, fork } from 'redux-saga/effects';
import { safeRequest } from 'core/utils/request';
import { push } from 'react-router-redux';

import { makeSelectUserData } from 'core/containers/App/selectors';

import {
    gaConfirmTokenSend,
    gaConfirmTokenSendSuccess,
    gaConfirmTokenSendError
} from './actions';

import {
    GA_CONFIRM_TOKEN_SEND,
    GA_CONFIRM_TOKEN_SEND_SUCCESS,
    GA_CONFIRM_TOKEN_SEND_ERROR
} from './constants';

// Individual exports for testing
export function* defaultSaga() {
    while (true) {
        const actionConfrim = yield take(GA_CONFIRM_TOKEN_SEND);
        if (!actionConfrim) {
            break;
        }
        yield fork(doConfirmSendToken, actionConfrim);

        yield take(GA_CONFIRM_TOKEN_SEND_SUCCESS);
        yield put(push('/security'));
    }
}

export function* doConfirmSendToken(action) {
    const { token } = action;

    _debug('send confirm token: ', token);

    const requestURL = '/api/v1/users/ga/set/confirm';

    yield call(safeRequest, requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token
        })
    }, gaConfirmTokenSendSuccess, gaConfirmTokenSendError);
}

// All sagas to be loaded
export default [
    defaultSaga,
];
