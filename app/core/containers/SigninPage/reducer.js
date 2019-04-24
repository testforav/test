/*
 *
 * SigninPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,

    SOCIAL_GOOGLE_SIGNIN,
    SOCIAL_GOOGLE_SIGNIN_SUCCESS,
    SOCIAL_GOOGLE_SIGNIN_ERROR,

    SOCIAL_FACEBOOK_SIGNIN,
    SOCIAL_FACEBOOK_SIGNIN_SUCCESS,
    SOCIAL_FACEBOOK_SIGNIN_ERROR,

    NEED_GA,
} from './constants';

const initialState = fromJS({
    isFormLoading: false,
    email: '',
    password: '',
    gaCode: '',
    formErrors: [],
    needGa: false,
});

function signinPageReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

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

        case NEED_GA:
            return state
                .set('needGa', action.value);

        default:
            return state;
    }
}

export default signinPageReducer;
