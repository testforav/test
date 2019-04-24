/*
 *
 * MainPage actions
 *
 */

import {
    AUTH_ERROR,
    UNAUTH_USER,
    PROTECTED_TEST,
    CLIENT_ROOT_URL,
    API_URL,
    SWITCH_FORM,
    EXTERNAL_MODAL_TRIGGER,
    MODAL_CLOSED,
} from './constants';

export function switchForm(showSignin) {
    return {
        type: SWITCH_FORM,
        showSignin: !showSignin
    };
}

export function externalModalTrigger(externalModalTrigger) {
    return {
        type: EXTERNAL_MODAL_TRIGGER,
        externalModalTrigger,
    };
}

export function modalClosed() {
    return {
        type: MODAL_CLOSED,
    };
}

export function registerUser({
    email,
    firstName,
    lastName,
    password
}) {
    return function (dispatch) {
        dispatch({
            type: 'REGISTER_USER'
        });
    };
}

export function logoutUser() {
    return function (dispatch) {
        dispatch({
            type: UNAUTH_USER
        });
    };
}
