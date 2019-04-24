/*
 *
 * SignupPage actions
 *
 */

import _ from 'lodash';

import {
    CONFIRM_CODE_SEND,
    CONFIRM_CODE_SEND_SUCCESS,
    CONFIRM_CODE_SEND_ERROR,

    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_ERROR,

    RESEND_EMAIL,
    RESEND_EMAIL_SUCCESS,
    RESEND_EMAIL_ERROR,

    SOCIAL_GOOGLE_SIGNUP,
    SOCIAL_GOOGLE_SIGNUP_SUCCESS,
    SOCIAL_GOOGLE_SIGNUP_ERROR,

    SOCIAL_FACEBOOK_SIGNUP,
    SOCIAL_FACEBOOK_SIGNUP_SUCCESS,
    SOCIAL_FACEBOOK_SIGNUP_ERROR,

    RESET_TOKEN_ACTION,
} from './constants';


export function changeCodeConfirm({Pin, Token, Consent}) {
    return {
        type: CONFIRM_CODE_SEND,
        Pin,
        Token,
        Consent,
    };
}

export function changeCodeConfirmSuccess(res) {
    return {
        type: CONFIRM_CODE_SEND_SUCCESS,
        data: res.Result,
    };
}

export function changeCodeConfirmError(errors) {
    return {
        type: CONFIRM_CODE_SEND_ERROR,
        errors,
    };
}

export function signupUser({Email, Password, Consent}) {
    return {
        type: SIGNUP_USER,
        auth: false,
        loading: true,
        Email,
        Password,
        Consent,
    };
}

export function signupUserSuccess(res) {
    _debug('signupUserSuccess: ', res);

    return {
        type: SIGNUP_USER_SUCCESS,
        token: res.Result,
    };
}

export function signupUserError(errors) {
    _debug('signupUserError: ', errors);

    return {
        type: SIGNUP_USER_ERROR,
        loading: false,
        errors
    };
}

// Social Google
export function signupUserGoogle(data, consent) {
    return {
        type: SOCIAL_GOOGLE_SIGNUP,
        auth: false,
        loading: true,
        data,
        consent
    };
}

export function signupUserGoogleSuccess(res) {
    _debug('signupUserSuccess: ', res);

    return {
        type: SOCIAL_GOOGLE_SIGNUP_SUCCESS,
        data: res.Result,
    };
}

export function signupUserGoogleError(errors) {
    _debug('signupUserError: ', errors);

    return {
        type: SOCIAL_GOOGLE_SIGNUP_ERROR,
        loading: false,
        errors
    };
}

// Social Facebook
export function signupUserFacebook(data, consent) {
    return {
        type: SOCIAL_FACEBOOK_SIGNUP,
        auth: false,
        loading: true,
        data,
        consent
    };
}

export function signupUserFacebookSuccess(res) {
    _debug('signupUserSuccess: ', res);

    return {
        type: SOCIAL_FACEBOOK_SIGNUP_SUCCESS,
        data: res.Result,
    };
}

export function signupUserFacebookError(errors) {
    _debug('signupUserError: ', errors);

    return {
        type: SOCIAL_FACEBOOK_SIGNUP_ERROR,
        loading: false,
        errors
    };
}

// Resend email
export function resendEmail(token) {
    return {
        type: RESEND_EMAIL,
        token,
    };
}

export function resendEmailSuccess(res) {
    return {
        type: RESEND_EMAIL_SUCCESS,
    };
}

export function resendEmailError(errors) {
    return {
        type: RESEND_EMAIL_ERROR,
    };
}

export function resetToken() {
    return {
        type: RESET_TOKEN_ACTION,
    };
}
