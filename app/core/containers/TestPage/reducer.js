/*
 *
 * TestPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,

    CHANGE_USERNAME,
    CHANGE_PASSWORD,
    CHANGE_GA_CODE,

    AUTH_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_ERROR,

    ERRORS_SHOWN,

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

    SEND_CONSENT,
    SEND_CONSENT_SUCCESS,
    SEND_CONSENT_ERROR,
} from './constants';

const initialState = fromJS({
    isFormLoading: false,
    email: '',
    password: '',
    gaCode: '',
    formErrors: [],
    needGa: false,
});

function testPageReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case CHANGE_USERNAME:
            return state
                .set('email', action.email);
        case CHANGE_PASSWORD:
            return state
                .set('password', action.password);
        case CHANGE_GA_CODE:
            return state
                .set('gaCode', action.gaCode);

        case AUTH_USER:
            return state
                .set('isFormLoading', action.loading);
        case AUTH_USER_SUCCESS:
            return state
                .set('isFormLoading', action.loading)
                .set('formErrors', []);
        case AUTH_USER_ERROR:
            return state
                .set('isFormLoading', action.loading)
                .set('formErrors', action.errors);

        case GA_CODE_SEND:
            return state
                .set('isFormLoading', action.loading);
        case GA_CODE_SEND_SUCCESS:
            _debug('GA_CODE_SEND_SUCCESS: ', action);

            return state
                .set('formErrors', [])
                .set('isFormLoading', action.loading);
        case GA_CODE_SEND_ERROR:
            return state
                .set('formErrors', action.errors)
                .set('isFormLoading', action.loading);

        case SOCIAL_GOOGLE_SIGNIN:
            return state
                .set('isFormLoading', true);
        case SOCIAL_GOOGLE_SIGNIN_SUCCESS:
            return state
                .set('isFormLoading', false);
        case SOCIAL_GOOGLE_SIGNIN_ERROR:
            return state
                .set('isFormLoading', false);

        case SOCIAL_FACEBOOK_SIGNIN:
            return state
                .set('isFormLoading', true);
        case SOCIAL_FACEBOOK_SIGNIN_SUCCESS:
            return state
                .set('isFormLoading', false);
        case SOCIAL_FACEBOOK_SIGNIN_ERROR:
            return state
                .set('isFormLoading', false);

        case ERRORS_SHOWN:
            return state
                .set('formErrors', []);

        case SEND_CONSENT:
            return state
                .set('isFormLoading', true);
        case SEND_CONSENT_SUCCESS:
            return state
                .set('isFormLoading', false);
        case SEND_CONSENT_ERROR:
            return state
                .set('isFormLoading', false);

        case NEED_GA:
            return state
                .set('needGa', action.value);

        default:
            return state;
    }
}

export default testPageReducer;
