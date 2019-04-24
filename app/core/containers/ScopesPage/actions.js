/*
 *
 * ScopesPage actions
 *
 */

import {
    DEFAULT_ACTION,

    SEND_CONSENT,
    SEND_CONSENT_SUCCESS,
    SEND_CONSENT_ERROR,

    SEND_CONSENT_REJECT,
    SEND_CONSENT_REJECT_SUCCESS,
    SEND_CONSENT_REJECT_ERROR,

    // CHECK_CONSENT,
    // CHECK_CONSENT_SUCCESS,
    // CHECK_CONSENT_ERROR,
    // CHECK_CONSENT_RESET,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

// Send consent
export function sendConsent(consent, requestedScopes) {
    return {
        type: SEND_CONSENT,
        loading: true,
        consent,
        requestedScopes
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

// Send consent reject
export function sendConsentReject(consent, reason) {
    return {
        type: SEND_CONSENT_REJECT,
        loading: true,
        consent,
        reason
    };
}

export function sendConsentRejectSuccess(res) {
    return {
        type: SEND_CONSENT_REJECT_SUCCESS,
        data: res.Result,
        loading: false,
    };
}

export function sendConsentRejectError(errors) {
    return {
        type: SEND_CONSENT_REJECT_ERROR,
        errors,
        loading: false,
    };
}

// Consent check
// export function consentCheck(consent) {
//     return {
//         type: CHECK_CONSENT,
//         consent
//     };
// }
//
// export function consentCheckSuccess(res) {
//     _debug('CHECK_CONSENT_SUCCESS: ', res);
//
//     return {
//         type: CHECK_CONSENT_SUCCESS,
//         data: res.Result
//     };
// }
//
// export function consentCheckError(error) {
//     _debug('CHECK_CONSENT_ERROR: ', error);
//
//     return {
//         type: CHECK_CONSENT_ERROR,
//         error
//     };
// }
//
// export function consentCheckReset() {
//     _debug('CHECK_CONSENT_RESET');
//
//     return {
//         type: CHECK_CONSENT_RESET
//     };
// }
