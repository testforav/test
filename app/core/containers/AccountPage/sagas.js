import { take, call, put, select, fork, takeLatest, all } from 'redux-saga/effects';
import { safeRequest } from 'core/utils/request';
import { replace } from 'react-router-redux';

import { stringify } from 'query-string';

import { loadUser, showNotification } from 'core/containers/App/actions';

import {
    SEND_ACCOUNT_CHANGE,
    SEND_ACCOUNT_CHANGE_SUCCESS,
    SEND_ACCOUNT_CHANGE_ERROR,

    SAVE_EMAIL_AGREEMENT,
    SAVE_EMAIL_AGREEMENT_SUCCESS,
    SAVE_EMAIL_AGREEMENT_ERROR,
} from './constants';

import {
    sendAccountChangeSuccess,
    sendAccountChangeError,

    saveEmailAgreementSuccess,
    saveEmailAgreementError,
} from './actions';

import { FormattedMessage } from 'react-intl';
import messages from 'containers/AccountPage/messages';

// Account
export function* updateAccountSaga() {
    while (true) {
        const actionUpdateAccount = yield take(SEND_ACCOUNT_CHANGE);
        if (!actionUpdateAccount) {
            break;
        }
        const [ account, email ] = yield all([
            fork(doUpdateAccount, actionUpdateAccount),
            // fork(doSaveAgreement, actionUpdateAccount),
        ]);

        yield takeLatest(SEND_ACCOUNT_CHANGE_SUCCESS, updateAccountSuccess);
    }
}

function* updateAccountSuccess(action) {
    _debug('update account success: ', action);
    yield put(showNotification({
        type: 'success',
        needTranslate: true,
        message: messages.saveSuccessMessage,
        headline: messages.saveSuccessHeadline,
    }));

    if (!action.data.GlobalidVerify && !action.data.GlobalidAgentVerify) {
        yield put(replace('/verification'));
    }
}

export function* doUpdateAccount(action) {
    const requestURL = '/v1/clients/update';
    const bodyString = stringify(action.formData);

    _debug('DO SEND_ACCOUNT_CHANGE: ', bodyString);

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyString,
    }, sendAccountChangeSuccess, sendAccountChangeError);
}

// Email agreement
export function* saveEmailAgreementSaga() {
    while (true) {
        const action = yield take(SAVE_EMAIL_AGREEMENT);
        if (!action) {
            break;
        }
        yield fork(doSaveAgreement, action);
    }
}

export function* doSaveAgreement(action) {
    const requestURL = '/v1/clients/enable-marketing-email';
    const { EnableMarketingEmails } = action;

    const bodyString = 'EnableMarketingEmail=' + EnableMarketingEmails;

    _debug('DO SAVE_EMAIL_AGREEMENT: ', bodyString);

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyString,
    }, saveEmailAgreementSuccess, saveEmailAgreementError);
}

function* onSaveAgreementSuccess(action) {
    _debug('onSaveAgreementSuccess: ', action);

    yield put(showNotification({
        type: 'success',
        needTranslate: true,
        message: messages.saveSuccessMessage,
        headline: messages.saveSuccessHeadline,
    }));

    yield put(loadUser());
}

// Watcher saga
export function* watcherSaga() {
    yield takeLatest(SAVE_EMAIL_AGREEMENT_SUCCESS, onSaveAgreementSuccess);
}

// All sagas to be loaded
export default [
    updateAccountSaga,
    saveEmailAgreementSaga,
    watcherSaga,
];
