// import { take, call, put, select } from 'redux-saga/effects';

/**
 * Gets the repositories of the user from Github
 */

import { take, call, fork, put, select, cancel, takeLatest, takeEvery, race } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { replace } from 'react-router-redux';
import { safeRequest } from 'core/utils/request';
import * as Cookies from 'js-cookie';
import { setConsent } from 'core/containers/App/actions';

import { push } from 'react-router-redux';

import {
    LOAD_USER,
    LOAD_WALLETS,
    SIGNOUT,
    SIGNOUT_SUCCESS,
    AJAX_ERROR,

    HOT_GET,
    HOT_GET_SUCCESS,
    HOT_GET_ERROR,

    TOTAL_RECEIVE_GET,
    TOTAL_RECEIVE_GET_SUCCESS,
    TOTAL_RECEIVE_GET_ERROR,

    SEND_CONSENT,
    SEND_CONSENT_SUCCESS,
    SEND_CONSENT_ERROR,

    CHECK_CONSENT,
    CHECK_CONSENT_SUCCESS,
    CHECK_CONSENT_ERROR,

    SEND_CONTACT_US,
    SEND_CONTACT_US_SUCCESS,

    FORM_SUBMIT,
} from './constants';

import {
    loadUser,
    loadUserSuccess,
    loadUserError,
    loadWalletsSuccess,
    loadWalletsError,
    signoutSuccess,
    signoutError,
    ajaxError,
    showNotification,

    getHotWallets,
    getHotWalletsError,
    getHotWalletsSuccess,

    getTotalReceiveSuccess,
    getTotalReceiveError,

    sendConsentSuccess,
    sendConsentError,

    sendContactUsSuccess,
    sendContactUsError,

    consentCheckSuccess,
    consentCheckError,

    cleanUser,
} from './actions';

import messages from 'containers/App/messages';

import { makeSelectUserData } from './selectors';

/**
 * Github repos request/response handler
 */
export function* doLoadUser(action) {
    // Select userdata from store
    const userData = yield select(makeSelectUserData());
    const authenticated = userData.get('authenticated');

    // _debug('load user data: ', AccessToken);
    console.log('auth: ', authenticated);
    if (!authenticated && !action.force) {
        return;
    }

    const requestURL = '/v1/clients/user-data';

    yield call(safeRequest, requestURL, {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }, loadUserSuccess, loadUserError);
}

// Individual exports for testing
export function* defaultSaga() {
    while (true) {
        const watcher = yield take(LOAD_USER);
        if (!watcher) {
            break;
        }
        yield call(doLoadUser, watcher);
    }

    // Suspend execution until location changes
    // yield take(LOCATION_CHANGE);
    // yield cancel(watcher);
}

// Signout
export function* signoutSaga() {
    // const watcher = yield takeEvery(SIGNOUT, doSignout);
    while (true) {
        const watcher = yield take(SIGNOUT);

        if (!watcher) {
            break;
        }

        yield fork(doSignout);
    }

    // Suspend execution until location changes
    // yield take(LOCATION_CHANGE);
    // yield cancel(locChange);
}

export function* doSignout() {
    // Select userdata from store
    const userData = yield select(makeSelectUserData());

    _debug('signout saga start: ');

    const requestURL = '/v1/clients/logout';

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: 'include',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }, signoutSuccess, signoutError);
}

function* onSignoutSuccess(actionSignoutSuccess) {
    yield put(replace('/'));
}

// Ajax errorr
export function* ajaxErrorSaga() {
    while (true) {
        const action = yield take(AJAX_ERROR);
        _debug('ajaxErrorSaga: ', action);

        if (!action) {
            break;
        }

        const userData = yield select(makeSelectUserData());
        const authenticated = userData.get('authenticated');

        if (action.errors && action.errors[0].Key === 'Token') {
            if (authenticated) {
                yield put(push('/'));
                yield put(showNotification({
                    type: 'info',
                    headline: messages.sessionErrorHeadline,
                    message: messages.sessionErrorMessage,
                    timeout: 5000,
                    unique: true,
                }));
                yield put(cleanUser());
            }
        }
        if (action.errors && action.errors[0].Key === 'timeout') {
            if (authenticated) {
                yield put(push('/'));
                yield put(showNotification({
                    type: 'danger',
                    headline: messages.sessionErrorHeadline,
                    message: messages.sessionErrorMessage,
                    timeout: 5000,
                    unique: true,
                }));
            }
        }
        if (action.errors && action.errors[0].Key === '_xsrf') {
            yield put(loadUser());
            yield put(showNotification({
                type: 'danger',
                headline: messages.serverErrorHeadline,
                message: messages.serverErrorMessage,
                timeout: 5000,
                unique: true
            }));
        }
        if (action.errors) {
            for (let error of action.errors) {
                _debug('AJAX ERRORS LOOP: ', error);

                if (error.Alert) {
                    yield put(showNotification({
                        type: 'danger',
                        headline: {
                            id: 'Error',
                            defaultMessage: 'Error',
                        },
                        message: {
                            id: error.Message,
                            defaultMessage: error.Message,
                        },
                        timeout: 5000,
                        unique: true
                    }));
                }
            }
        }
    }
}


// Wallets
export function* doLoadWallets() {
    // Select userdata from store
    const userData = yield select(makeSelectUserData());
    const authenticated = userData.get('authenticated');

    _debug('load user wallets: ');

    if (!authenticated) {
        return;
    }

    const requestURL = '/api/v1/wallets';

    yield call(safeRequest, requestURL, {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        }
    }, loadWalletsSuccess, loadWalletsError);
}

export function* walletsSaga() {
    while (true) {
        const watcher = yield take(LOAD_WALLETS);

        if (!watcher) {
            break;
        }
        yield call(doLoadWallets);
    }

    // Suspend execution until location changes
    // yield take(LOCATION_CHANGE);
    // yield cancel(watcher);
}

// Hot wallets
export function* hotWalletsSaga() {
    while (true) {
        const actionGetHot = yield take(HOT_GET);
        if (!actionGetHot) {
            break;
        }
        yield fork(doGetHot, actionGetHot);
    }
}

export function* doGetHot(action) {

    _debug('doGetHot: ');

    const requestURL = `/v1/storages`;

    yield call(safeRequest, requestURL, {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }, getHotWalletsSuccess, getHotWalletsError);
}

// Sub wallets
export function* subWalletsSaga() {
    while (true) {
        const actionGetSub = yield take(TOTAL_RECEIVE_GET);
        if (!actionGetSub) {
            break;
        }
        yield fork(doGetSub, actionGetSub);
    }
}

export function* doGetSub(action) {

    _debug('doGetSub: ');

    const requestURL = `/v1/address`;

    yield call(safeRequest, requestURL, {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }, getTotalReceiveSuccess, getTotalReceiveError);
}

// Consent check
export function* consentCheckSaga() {
    while (true) {
        const action = yield take(CHECK_CONSENT);
        if (!action) {
            break;
        }
        yield fork(doConsentCheck, action);
    }
}

export function* doConsentCheck(action) {
    const { consent } = action;

    _debug('doConsentCheck: ', consent);

    const requestURL = `/v1/consents?Consent=${consent}`;

    yield call(safeRequest, requestURL, {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }, consentCheckSuccess, consentCheckError);
}

function* onCheckConsentSuccess(action) {
    _debug('CHECK_CONSENT_SUCCESS: ', action);
}

function* onCheckConsentError(action) {
    _debug('CHECK_CONSENT_ERROR: ', action);

    if (action.error && (action.error[0].Key !== 'Token')) {
        yield put(setConsent(''));
    }

    window.location.replace('/account');
}

// Consent
export function* consentSaga() {
    // const watcher = yield takeEvery(SIGNOUT, doSignout);
    while (true) {
        const watcher = yield take(SEND_CONSENT);

        if (!watcher) {
            break;
        }

        yield fork(doSendConsent, watcher);
    }
}

export function* doSendConsent(action) {
    // Select userdata from store
    const { consent } = action;

    _debug('SEND_CONSENT: ', consent);

    const requestURL = '/v1/consents/accept';

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: 'include',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'Consent=' + consent
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

    window.location.replace('/signin');
}

// Contact us
export function* contactUsSaga() {
    // const watcher = yield takeEvery(SIGNOUT, doSignout);
    while (true) {
        const watcher = yield take(SEND_CONTACT_US);

        if (!watcher) {
            break;
        }

        yield fork(doSendContactUs, watcher);
    }
}

export function* doSendContactUs(action) {
    // Select userdata from store
    const { name, email, phone, subject, message, company, captcha } = action.data;

    _debug('SEND_CONTACT_US: ', action);

    const requestURL = '/v1/contact';
    let requestBody =
        'Name=' + name +
        '&Email=' + encodeURIComponent(email) +
        '&Captcha=' + captcha +
        '&Message=' + message;

    if (phone) {
        requestBody += '&Phone=' + phone;
    }
    if (subject) {
        requestBody += '&Subject=' + subject;
    }
    if (company) {
        requestBody += '&Company' + company;
    }

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: 'include',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody
    }, sendContactUsSuccess, sendContactUsError);
}

function* onSendContactUsSuccess(action) {
    _debug('SEND_CONSENT_SUCCESS: ', action);
}

// Watcher saga
export function* watcherSaga() {
    yield takeLatest(SIGNOUT_SUCCESS, onSignoutSuccess);
    yield takeLatest(SEND_CONSENT_SUCCESS, onSendConsentSuccess);
    yield takeLatest(SEND_CONSENT_ERROR, onSendConsentError);
    yield takeLatest(CHECK_CONSENT_SUCCESS, onCheckConsentSuccess);
    yield takeLatest(CHECK_CONSENT_ERROR, onCheckConsentError);
}

// redux-form submit via Promise
function* formSubmitSaga({
    submitAction,
    SUCCESS_ACTION,
    ERROR_ACTION,
    values,
    resolve,
    reject,
}) {
    yield put(submitAction(values));

    const { success, failure } = yield race({
        success: take(SUCCESS_ACTION),
        failure: take(ERROR_ACTION),
    });

    if (success) {
        resolve();
    } else {
        reject(failure);
    }
}

export function* watchFormSubmitSaga() {
  yield takeEvery(FORM_SUBMIT, formSubmitSaga);
}

// All sagas to be loaded
export default [
    defaultSaga,
    signoutSaga,
    ajaxErrorSaga,
    walletsSaga,
    watcherSaga,
    hotWalletsSaga,
    subWalletsSaga,
    consentSaga,
    consentCheckSaga,
    contactUsSaga,
    watchFormSubmitSaga,
];
