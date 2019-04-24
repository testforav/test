import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push, replace } from 'react-router-redux';
import ReactGA from 'react-ga';

import { safeRequest } from 'core/utils/request';
import { makeSelectUserData } from 'core/containers/App/selectors';
import { showNotification, loadUser } from 'core/containers/App/actions';

import makeSelectSignupPage from './selectors';
import {
    changeCodeConfirmSuccess,
    changeCodeConfirmError,

    signupUserSuccess,
    signupUserError,

    resendEmailSuccess,
    resendEmailError,

    signupUserGoogleSuccess,
    signupUserGoogleError,

    signupUserFacebookSuccess,
    signupUserFacebookError,
} from './actions';
import {
    needGA
} from 'core/containers/SigninPage/actions';
import {
    CONFIRM_CODE_SEND,
    CONFIRM_CODE_SEND_SUCCESS,

    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,

    RESEND_EMAIL,
    RESEND_EMAIL_SUCCESS,

    SOCIAL_GOOGLE_SIGNUP,
    SOCIAL_GOOGLE_SIGNUP_SUCCESS,
    SOCIAL_GOOGLE_SIGNUP_ERROR,

    SOCIAL_FACEBOOK_SIGNUP,
    SOCIAL_FACEBOOK_SIGNUP_SUCCESS,
    SOCIAL_FACEBOOK_SIGNUP_ERROR,
} from './constants';

// Signup
export function* signupSaga() {
    while (true) {
        const actionConfrimSignup = yield take(SIGNUP_USER);

        if (!actionConfrimSignup) {
            break;
        }

        yield fork(doConfirmSendSignup, actionConfrimSignup);
    }
}

function* signupSuccess() {
    _debug('signupSuccess: ');
    ReactGA.event({
        category: 'Signup',
        action: 'Submit',
        label: 'Success',
        value: 1
    });
}

export function* doConfirmSendSignup(action) {
    const { Email, Password, Consent } = action;

    _debug('DO SIGNUP: ', Email, Password, Consent, action);

    const requestURL = '/v1/clients/signup';
    let query = 'Email=' + encodeURIComponent(Email) + '&Password=' + encodeURIComponent(Password);

    if (Consent) {
        query += '&consent=' + Consent
    }

    yield call(safeRequest, requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: query
    }, signupUserSuccess, signupUserError);
}

// Signup Google
export function* signupSagaGoogle() {
    while (true) {
        const actionConfrimSignupGoogle = yield take(SOCIAL_GOOGLE_SIGNUP);

        if (!actionConfrimSignupGoogle) {
            break;
        }

        yield fork(doConfirmSendSignupGoogle, actionConfrimSignupGoogle);
    }
}

function* signupGoogleSuccess(googleSuccessData) {
    const { data } = googleSuccessData;

    if (!data.Session.GaAccepted && data.Session.UseGa) {
        _debug('not really login');
        yield put(needGA(true));
    } else {
        yield put(loadUser());
        yield put(replace('/account'));
    }
}

function* signupGoogleError(action) {
    yield put(showNotification({
        type: 'danger',
        message: {
            id: action.errors[0].Message,
            defaultMessage: action.errors[0].Message,
        },
    }));
}

export function* doConfirmSendSignupGoogle(action) {
    const { data, consent } = action;

    _debug('DO SIGNUP Google: ', data);

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
    }, signupUserGoogleSuccess, signupUserGoogleError);
}

// Signup Facebook
export function* signupSagaFacebook() {
    while (true) {
        const actionConfrimSignupFacebook = yield take(SOCIAL_FACEBOOK_SIGNUP);

        if (!actionConfrimSignupFacebook) {
            break;
        }

        yield fork(doConfirmSendSignupFacebook, actionConfrimSignupFacebook);
    }
}

function* signupFacebookSuccess(facebookSuccessData) {
    const { data } = facebookSuccessData;

    if (!data.Session.GaAccepted && data.Session.UseGa) {
        _debug('not really login');
        yield put(needGA(true));
    } else {
        yield put(loadUser());
        yield put(replace('/account'));
    }
}

function* signupFacebookError(action) {
    yield put(showNotification({
        type: 'danger',
        message: {
            id: action.errors[0].Message,
            defaultMessage: action.errors[0].Message,
        },
    }));
}

export function* doConfirmSendSignupFacebook(action) {
    const { data, consent } = action;

    _debug('DO SIGNUP Facebook: ', data);

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
    }, signupUserFacebookSuccess, signupUserFacebookError);
}

// Resend
export function* resendSaga() {
    while (true) {
        const actionResend = yield take(RESEND_EMAIL);

        if (!actionResend) {
            break;
        }

        yield fork(doResendEmail, actionResend);
        // yield takeLatest(RESEND_EMAIL_SUCCESS, resendSuccess);
    }
}

function* resendSuccess(action) {
    const message = action.flash;

    yield put(showNotification({
        type: 'success',
        message: {
            id: message,
            defaultMessage: message,
        },
    }));
}

export function* doResendEmail(action) {
    const { token } = action;
    const requestURL = '/v1/clients/repeat-confirm-email';

    yield call(safeRequest, requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'Token=' + token
    }, resendEmailSuccess, resendEmailError);
}

// Individual exports for testing
export function* defaultSaga() {
    // See example in containers/HomePage/sagas.js

    while (true) {
        const actionConfrim = yield take(CONFIRM_CODE_SEND);

        if (!actionConfrim) {
            break;
        }

        yield fork(doConfirmSend, actionConfrim);
    }
}

export function* confirmCodeSuccess() {
    yield put(push('/'));
}

export function* doConfirmSend(action) {
    const { Pin, Token, Consent } = action;

    _debug('send confirm code: ', Pin, Consent);

    const requestURL = `/v1/clients/confirm-email`;
    let query = 'Pin=' + Pin + '&Token=' + Token;

    if (Consent) {
        query += '&consent=' + Consent
    }

    yield call(safeRequest, requestURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: query
    }, changeCodeConfirmSuccess, changeCodeConfirmError);
}

// Watcher
export function* watcherSaga() {
    yield takeLatest(SOCIAL_GOOGLE_SIGNUP_SUCCESS, signupGoogleSuccess);
    yield takeLatest(SOCIAL_GOOGLE_SIGNUP_ERROR, signupGoogleError);
    yield takeLatest(SOCIAL_FACEBOOK_SIGNUP_SUCCESS, signupFacebookSuccess);
    yield takeLatest(SOCIAL_FACEBOOK_SIGNUP_ERROR, signupFacebookError);

    yield takeLatest(SIGNUP_USER_SUCCESS, signupSuccess);
    yield takeLatest(CONFIRM_CODE_SEND_SUCCESS, confirmCodeSuccess);
}

// All sagas to be loaded
export default [
    defaultSaga,
    resendSaga,
    signupSaga,
    signupSagaGoogle,
    signupSagaFacebook,

    watcherSaga,
];
