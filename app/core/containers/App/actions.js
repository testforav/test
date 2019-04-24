/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import _ from 'lodash';
import { fromJS } from 'immutable';

import {
    LOAD_REPOS,
    LOAD_REPOS_SUCCESS,
    LOAD_REPOS_ERROR,

    LOAD_USER,
    LOAD_USER_SUCCESS,
    LOAD_USER_ERROR,

    LOAD_WALLETS,
    CHANGE_WALLETS,
    LOAD_WALLETS_SUCCESS,
    LOAD_WALLETS_ERROR,

    SIGNOUT,
    SIGNOUT_SUCCESS,
    SIGNOUT_ERROR,

    RESET_DEFAULTS,
    HARD_RESET_DEFAULTS,
    AJAX_ERROR,

    NOTIFICATION_SHOW,
    NOTIFICATION_HIDE,

    HOT_GET,
    HOT_GET_SUCCESS,
    HOT_GET_ERROR,

    TOTAL_RECEIVE_GET,
    TOTAL_RECEIVE_GET_SUCCESS,
    TOTAL_RECEIVE_GET_ERROR,

    SEND_CONSENT,
    SEND_CONSENT_SUCCESS,
    SEND_CONSENT_ERROR,

    SEND_CONTACT_US,
    SEND_CONTACT_US_SUCCESS,
    SEND_CONTACT_US_ERROR,

    CHECK_CONSENT,
    CHECK_CONSENT_SUCCESS,
    CHECK_CONSENT_ERROR,
    CHECK_CONSENT_RESET,
    CHECK_CONSENT_RESET_SCOPES,

    OPEN_CONTACT_US,
    CLOSE_CONTACT_US,

    CONTACT_US_ERRORS_SHOWN,

    SET_CONSENT,

    FORM_SUBMIT,

    CLEAN_USER,
} from './constants';

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
    return {
        type: LOAD_REPOS_SUCCESS,
        repos,
        username,
    };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
    return {
        type: LOAD_REPOS_ERROR,
        error,
    };
}

export function ajaxError(res) {
    _debug('action AJAX_ERROR: ', res);

    return {
        type: AJAX_ERROR,
        errors: res
    };
}

export function loadUser(force) {
    return {
        type: LOAD_USER,
        force,
    };
}

export function loadUserSuccess(res) {
    _debug('loadUserSuccess: ', res);

    return {
        type: LOAD_USER_SUCCESS,
        data: res.Result
    };
}

export function loadUserError(error) {
    _debug('loadUserError: ', error);

    return {
        type: LOAD_USER_ERROR,
        error
    };
}

export function loadWallets() {
    return {
        type: LOAD_WALLETS
    };
}

export function loadWalletsSuccess(res) {
    _debug('LOAD_WALLETS: ', res);

    return {
        type: LOAD_WALLETS_SUCCESS,
        data: res.result
    };
}

export function loadWalletsError(error) {
    _debug('LOAD_WALLETS: ', error);

    return {
        type: LOAD_WALLETS_ERROR,
        error
    };
}

export function consentCheck(consent) {
    return {
        type: CHECK_CONSENT,
        consent
    };
}

export function consentCheckSuccess(res) {
    _debug('CHECK_CONSENT_SUCCESS: ', res);

    return {
        type: CHECK_CONSENT_SUCCESS,
        data: res.Result
    };
}

export function consentCheckError(error) {
    _debug('CHECK_CONSENT_ERROR: ', error);

    return {
        type: CHECK_CONSENT_ERROR,
        error
    };
}

export function consentCheckReset() {
    _debug('CHECK_CONSENT_RESET');

    return {
        type: CHECK_CONSENT_RESET
    };
}

export function consentCheckResetScopes() {
    _debug('CHECK_CONSENT_RESET_SCOPES');

    return {
        type: CHECK_CONSENT_RESET_SCOPES
    };
}

export function signout() {
    return {
        type: SIGNOUT,
        loading: true
    };
}

export function signoutSuccess(res) {
    _debug('signoutSuccess: ', res);

    return {
        type: SIGNOUT_SUCCESS,
        data: res,
        loading: false
    };
}

export function signoutError(error) {
    _debug('signoutError: ', error);

    return {
        type: SIGNOUT_ERROR,
        error,
        loading: false
    };
}

export function changeWallet(data) {
    _debug('hello from action: ', data);
    return {
        data,
        type: CHANGE_WALLETS,
    };
}

export function resetDefaults() {
    return {
        type: RESET_DEFAULTS
    };
}

// Notifications
export function showNotification(notification) {
    let defaults = {
        id: (new Date()).getTime(),
        timeout: 4000
    };

    return {
        type: NOTIFICATION_SHOW,
        notification: fromJS(_.merge(defaults, notification))
    };
}

export function hideNotification(notification) {
    return {
        type: NOTIFICATION_HIDE,
        notification
    };
}

// Hot wallets
export function getHotWallets() {
    return {
        type: HOT_GET,
        loading: true,
    };
}

export function getHotWalletsSuccess(res) {
    return {
        type: HOT_GET_SUCCESS,
        data: res.Result,
        loading: false,
    };
}

export function getHotWalletsError(errors) {
    return {
        type: HOT_GET_ERROR,
        errors,
        loading: false,
    };
}

// Total received
export function getTotalReceive() {
    return {
        type: TOTAL_RECEIVE_GET,
        loading: true,
    };
}

export function getTotalReceiveSuccess(res) {
    return {
        type: TOTAL_RECEIVE_GET_SUCCESS,
        data: res.Result,
        loading: false,
    };
}

export function getTotalReceiveError(errors) {
    return {
        type: TOTAL_RECEIVE_GET_ERROR,
        errors,
        loading: false,
    };
}

// Send consent
export function sendConsent(consent) {
    return {
        type: SEND_CONSENT,
        loading: true,
        consent
    };
}

export function sendConsentSuccess(res) {
    return {
        type: SEND_CONSENT_SUCCESS,
        data: res.Result,
        loading: false,
    };
}

export function sendConsentError(errors) {
    return {
        type: SEND_CONSENT_ERROR,
        errors,
        loading: false,
    };
}

export function setConsent(consent) {
    return {
        type: SET_CONSENT,
        consent
    };
}

export function sendContactUsSuccess(res) {
    return {
        type: SEND_CONTACT_US_SUCCESS,
        data: res.Result,
        loading: false,
    };
}

export function sendContactUsError(errors) {
    return {
        type: SEND_CONTACT_US_ERROR,
        errors,
        loading: false,
    };
}

export function sendContactUs(data) {
    return {
        type: SEND_CONTACT_US,
        data,
    };
}

export function openContactUs() {
    return {
        type: OPEN_CONTACT_US,
    };
}
export function closeContactUs() {
    return {
        type: CLOSE_CONTACT_US,
    };
}

export function contactUsErrorsShown() {
    return {
        type: CONTACT_US_ERRORS_SHOWN,
    };
}

export function formSubmit(submitAction, SUCCESS_ACTION, ERROR_ACTION, values, resolve, reject) {
    return {
        type: FORM_SUBMIT,
        submitAction,
        SUCCESS_ACTION,
        ERROR_ACTION,
        values,
        resolve,
        reject,
    };
}

export function cleanUser() {
    return {
        type: CLEAN_USER,
    };
}

export function hardResetDefaults() {
    return {
        type: HARD_RESET_DEFAULTS,
    };
}