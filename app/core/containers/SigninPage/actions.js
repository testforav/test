/*
 *
 * SigninPage actions
 *
 */

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

    NEED_GA,

    CHANGE_REDIRECT_URL,
} from './constants';

export function loginUser({ Username, Password, Captcha, Consent }) {
    return {
        type: AUTH_USER,
        Username,
        Password,
        Consent,
        Captcha,
    };
}

export function loginUserSuccess(res) {
    _debug('loginUserSuccess: ', res);

    return {
        type: AUTH_USER_SUCCESS,
        auth: true,
        authData: res.Result,
        loading: false
    };
}

export function loginUserError(errors) {
    _debug('loginUserError: ', errors);

    return {
        type: AUTH_USER_ERROR,
        loading: false,
        errors
    };
}

// 2fa Verification
export function needGA(value) {
    return {
        type: NEED_GA,
        value,
    }
}
export function submitGACode({ G2fatkn, Consent }) {
    return {
        type: GA_CODE_SEND,
        G2fatkn,
        Consent,
    };
}

export function submitGACodeSuccess(res) {
    return {
        type: GA_CODE_SEND_SUCCESS,
        data: res.result
    };
}

export function submitGACodeError(errors) {
    return {
        type: GA_CODE_SEND_ERROR,
        errors
    };
}

// Google
// Social Google
export function signinUserGoogle(data, consent) {
    return {
        type: SOCIAL_GOOGLE_SIGNIN,
        auth: false,
        loading: true,
        data,
        consent
    };
}

export function signinUserGoogleSuccess(res) {
    _debug('signinUserSuccess: ', res);

    return {
        type: SOCIAL_GOOGLE_SIGNIN_SUCCESS,
        data: res.Result,
    };
}

export function signinUserGoogleError(errors) {
    _debug('signinUserError: ', errors);

    return {
        type: SOCIAL_GOOGLE_SIGNIN_ERROR,
        loading: false,
        errors
    };
}

// Social Facebook
export function signinUserFacebook(data, consent) {
    return {
        type: SOCIAL_FACEBOOK_SIGNIN,
        auth: false,
        loading: true,
        data,
        consent
    };
}

export function signinUserFacebookSuccess(res) {
    _debug('signinUserSuccess: ', res);

    return {
        type: SOCIAL_FACEBOOK_SIGNIN_SUCCESS,
        data: res.Result,
    };
}

export function signinUserFacebookError(errors) {
    _debug('signinUserError: ', errors);

    return {
        type: SOCIAL_FACEBOOK_SIGNIN_ERROR,
        loading: false,
        errors
    };
}

export function changeRedirectUrl(url) {
    return {
        type: CHANGE_REDIRECT_URL,
        url,
    };
}