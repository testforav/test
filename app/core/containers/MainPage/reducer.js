/*
 *
 * MainPage reducer
 *
 */

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { fromJS } from 'immutable';

import {
    AUTH_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_ERROR,
} from 'core/containers/SigninPage/constants';

import {
    SIGNUP_USER_SUCCESS,
} from 'core/containers/SignupPage/constants';

import {
    SUBMIT_FORGOT_PASSWORD_SUCCESS,
} from 'core/containers/ForgotPasswordPage/constants';

import {
    DEFAULT_ACTION,
    EXTERNAL_MODAL_TRIGGER,
    PROTECTED_TEST,
    SWITCH_FORM,
    MODAL_CLOSED,
} from './constants';

const initialState = fromJS({
    loading: false,
    error: false,
    message: '',
    currentUser: false,
    showSignin: true,
    emailSignup: '',
    passwordSignup: '',
    userData: {
        repositories: false
    }
});

function mainPageReducer(state = initialState, action) {
    switch (action.type) {
        case SWITCH_FORM:
            return state
                .set('showSignin', action.showSignin);
        case EXTERNAL_MODAL_TRIGGER:
            return state
                .set('externalModalTrigger', action.externalModalTrigger);
        case MODAL_CLOSED:
            return state
                .set('externalModalTrigger', '');
        case SIGNUP_USER_SUCCESS:
            return state
                .set('externalModalTrigger', 'signup_success');
        case SUBMIT_FORGOT_PASSWORD_SUCCESS:
            return state 
                .set('externalModalTrigger', 'forgot_success');
        case DEFAULT_ACTION:
            return state;
        default:
            return state;
    }
}

export default mainPageReducer;
