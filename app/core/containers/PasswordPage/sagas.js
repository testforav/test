import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { safeRequest } from 'core/utils/request';
import { push } from 'react-router-redux';

import { stringify } from 'query-string';

import { showNotification } from 'core/containers/App/actions';

import {
    SEND_PASSWORD_CHANGE,
    SEND_PASSWORD_CHANGE_SUCCESS,
    SEND_PASSWORD_CHANGE_ERROR,
} from './constants';

import {
    sendPasswordChangeSuccess,
    sendPasswordChangeError,
} from './actions';

import messages from 'containers/PasswordPage/messages';

export function* changePassSaga() {
    while (true) {
        const actionChangePass = yield take(SEND_PASSWORD_CHANGE);
        if (!actionChangePass) {
            break;
        }
        yield fork(doChangePass, actionChangePass);

        yield takeLatest(SEND_PASSWORD_CHANGE_SUCCESS, changePassSuccess);
    }
}

function* changePassSuccess() {
    yield put(showNotification({
        type: 'success',
        message: messages.changeSuccessMessage,
    }));
}

export function* doChangePass(action) {
    const { Password, OldPassword } = action;
    const requestURL = '/v1/clients/password/change';

    _debug('DO SEND_PASSWORD_CHANGE: ', Password, OldPassword);

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'Password=' + encodeURIComponent(Password) + '&OldPassword=' + encodeURIComponent(OldPassword),
    }, sendPasswordChangeSuccess, sendPasswordChangeError);
}

// All sagas to be loaded
export default [
    changePassSaga,
];
