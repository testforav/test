import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { safeRequest } from 'core/utils/request';
import { showNotification, loadUser } from 'core/containers/App/actions';
import { replace } from 'react-router-redux';
import * as Cookies from 'js-cookie';

import {
    AUTH_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_ERROR,

    GA_CODE_SEND,
    GA_CODE_SEND_SUCCESS,
    GA_CODE_SEND_ERROR,

    SOCIAL_GOOGLE_SIGNIN,
    SOCIAL_GOOGLE_SIGNIN_SUCCESS,
    SOCIAL_GOOGLE_SIGNIN_ERROR,

    SOCIAL_FACEBOOK_SIGNIN,
    SOCIAL_FACEBOOK_SIGNIN_SUCCESS,
    SOCIAL_FACEBOOK_SIGNIN_ERROR,

    CHANGE_REDIRECT_URL,
} from './constants';

import {
    AJAX_ERROR,
} from 'core/containers/App/constants';

import {
    loginUserSuccess,
    loginUserError,

    submitGACodeSuccess,
    submitGACodeError,

    signinUserGoogleSuccess,
    signinUserGoogleError,

    signinUserFacebookSuccess,
    signinUserFacebookError,

    needGA,
} from './actions';

let redirectUrl = '/account';

export function* defaultSaga() {
    while (true) {
        const actionConfrimSignin = yield take(AUTH_USER);
        if (!actionConfrimSignin) {
            break;
        }
        yield fork(doConfirmSendSignin, actionConfrimSignin);
    }
}

function* signinSuccess(actionAuthSuccess) {
    const { authData } = actionAuthSuccess;

    _debug(authData);
    if (!authData.Session.GaAccepted && authData.Session.UseGa) {
        _debug('not really login');
        yield put(needGA(true));
    } else {
        yield put(loadUser());
        // yield put(loadWallets());
        _debug('redirect url is ', redirectUrl);
        yield put(replace(redirectUrl));
    }
}

export function* doConfirmSendSignin(action) {
    const { Username, Password, Captcha, Consent } = action;

    const requestURL = '/v1/clients/signin';
    let query = 'Username=' + encodeURIComponent(Username) + '&Password=' + encodeURIComponent(Password);

    if (Consent) {
        query += '&consent=' + Consent;
    }
    if (Captcha) {
        query += '&Captcha=' + Captcha;
    }

    _debug('DO SIGNIN: ', action, query);

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: query,
    }, loginUserSuccess, loginUserError);
}

// Verification code ===
export function* verificationCodeSaga() {
    while (true) {
        const actionGA = yield take(GA_CODE_SEND);
        if (!actionGA) {
            break;
        }
        yield fork(doSendGa, actionGA);
    }
}

function* sendGaSuccess() {
    yield put(loadUser());
    yield put(replace(redirectUrl));
}

export function* doSendGa(action) {
    const { G2fatkn, Consent } = action;
    let requestURL = '/v1/clients/confirm-signin';

    let query = 'G2fatkn=' + G2fatkn;

    if (Consent) {
        query += '&consent=' + Consent
    }

    _debug('DO GA_CODE_SEND: ', G2fatkn, Consent);

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: query
    }, submitGACodeSuccess, submitGACodeError);
}

// Signin Google
export function* signinSagaGoogle() {
    while (true) {
        const actionConfrimSigninGoogle = yield take(SOCIAL_GOOGLE_SIGNIN);

        if (!actionConfrimSigninGoogle) {
            break;
        }

        yield fork(doConfirmSendSigninGoogle, actionConfrimSigninGoogle);
    }
}

function* signinGoogleSuccess(googleSuccessData) {
    const { data } = googleSuccessData;

    if (!data.Session.GaAccepted && data.Session.UseGa) {
        _debug('not really login');
        yield put(needGA(true));
    } else {
        yield put(loadUser());
        yield put(replace(redirectUrl));
    }
}

function* signinGoogleError(action) {
    yield put(showNotification({
        type: 'danger',
        message: {
            id: action.errors[0].Message,
            defaultMessage: action.errors[0].Message,
        },
    }));
}

export function* doConfirmSendSigninGoogle(action) {
    const { data, consent } = action;

    _debug('DO SIGNIN Google: ', data);

    let requestURL = '/v1/clients/signin-google';

    if (consent) {
        requestURL += '?consent=' + consent;
    }

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }, signinUserGoogleSuccess, signinUserGoogleError);
}

// Signin Facebook
export function* signinSagaFacebook() {
    while (true) {
        const actionConfrimSigninFacebook = yield take(SOCIAL_FACEBOOK_SIGNIN);

        if (!actionConfrimSigninFacebook) {
            break;
        }

        yield fork(doConfirmSendSigninFacebook, actionConfrimSigninFacebook);
    }
}

function* signinFacebookSuccess(facebookSuccessData) {
    const { data } = facebookSuccessData;

    if (!data.Session.GaAccepted && data.Session.UseGa) {
        _debug('not really login');
        yield put(needGA(true));
    } else {
        yield put(loadUser());
        yield put(replace(redirectUrl));
    }
}

function* signinFacebookError(action) {
    yield put(showNotification({
        type: 'danger',
        message: {
            id: action.errors[0].Message,
            defaultMessage: action.errors[0].Message,
        },
    }));
}

export function* doConfirmSendSigninFacebook(action) {
    const { data, consent } = action;

    _debug('DO SIGNIN Facebook: ', data);

    let requestURL = '/v1/clients/signin-facebook';

    if (consent) {
        requestURL += '?consent=' + consent;
    }

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }, signinUserFacebookSuccess, signinUserFacebookError);
}

// Watcher saga
export function* watcherSaga() {
    yield takeLatest(AUTH_USER_SUCCESS, signinSuccess);
    yield takeLatest(GA_CODE_SEND_SUCCESS, sendGaSuccess);
    yield takeLatest(SOCIAL_GOOGLE_SIGNIN_SUCCESS, signinGoogleSuccess);
    yield takeLatest(SOCIAL_GOOGLE_SIGNIN_ERROR, signinGoogleError);
    yield takeLatest(SOCIAL_FACEBOOK_SIGNIN_SUCCESS, signinFacebookSuccess);
    yield takeLatest(SOCIAL_FACEBOOK_SIGNIN_ERROR, signinFacebookError);
}

export function* changeRedirectUrlSaga() {
    while (true) {
        const action = yield take(CHANGE_REDIRECT_URL);

        if (!action) {
            break;
        }

        _debug('change redirect url: ', action.url);

        redirectUrl = action.url;
    }
}

// All sagas to be loaded
export default [
    defaultSaga,
    verificationCodeSaga,
    signinSagaGoogle,
    signinSagaFacebook,
    watcherSaga,
    changeRedirectUrlSaga,
];
