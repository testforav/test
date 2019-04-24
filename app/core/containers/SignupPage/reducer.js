/*
 *
 * SignupPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,

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
import {
    NEED_GA
} from 'core/containers/SigninPage/constants';

const initialState = fromJS({
    isFormLoading: false,
    isResendLoading: false,
    confirmCode: '',
    emailSignup: '',
    passwordSignup: '',
    formErrors: [],

    needGa: false
});

function signupPageReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case SIGNUP_USER_SUCCESS:
            return state
                .set('token', action.token);

        case RESEND_EMAIL:
            return state
                .set('isFormLoading', true);
        case RESEND_EMAIL_SUCCESS:
            return state
                .set('isFormLoading', false)
                .set('emailResended', new Date().getTime());
        case RESEND_EMAIL_ERROR:
            return state
                .set('isFormLoading', false);

        case SOCIAL_GOOGLE_SIGNUP:
            return state
                .set('isFormLoading', true);
        case SOCIAL_GOOGLE_SIGNUP_SUCCESS:
            return state
                .set('isFormLoading', false);
        case SOCIAL_GOOGLE_SIGNUP_ERROR:
            return state
                .set('isFormLoading', false);

        case SOCIAL_FACEBOOK_SIGNUP:
            return state
                .set('isFormLoading', true);
        case SOCIAL_FACEBOOK_SIGNUP_SUCCESS:
            return state
                .set('isFormLoading', false);
        case SOCIAL_FACEBOOK_SIGNUP_ERROR:
            return state
                .set('isFormLoading', false);

        case RESET_TOKEN_ACTION:
            return state
                .set('token', null);

        case NEED_GA:
            return state
                .set('needGa', action.value);

        default:
            return state;
    }
}

export default signupPageReducer;
