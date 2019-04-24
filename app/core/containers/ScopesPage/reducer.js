/*
 *
 * ScopesPage reducer
 *
 */

import { fromJS } from 'immutable';
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

import {
    CHECK_CONSENT,
    CHECK_CONSENT_SUCCESS,
    CHECK_CONSENT_ERROR,
    CHECK_CONSENT_RESET,
} from 'core/containers/App/constants';

const initialState = fromJS({
    isFormLoading: false,
    isFormShowing: false,

    isConsentInfoGet: false,
    consentInfo: {},
});

function scopesPageReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case SEND_CONSENT:
            return state
                .set('isFormLoading', true);
        case SEND_CONSENT_SUCCESS:
            return state
                .set('isFormLoading', false);
        case SEND_CONSENT_ERROR:
            return state
                .set('isFormLoading', false);

        case SEND_CONSENT_REJECT:
            return state
                .set('isFormLoading', true);
        case SEND_CONSENT_REJECT_SUCCESS:
            return state
                .set('isFormLoading', false);
        case SEND_CONSENT_REJECT_ERROR:
            return state
                .set('isFormLoading', false);

        case CHECK_CONSENT:
            return state
                .set('isFormLoading', true);
        case CHECK_CONSENT_SUCCESS:
            return state
                .set('isConsentInfoGet', true)
                .set('isFormLoading', false)
                .set('isFormShowing', true)
                .set('consentInfo', action.data);
        case CHECK_CONSENT_ERROR:
            return state
                .set('isFormShowing', true)
                .set('isFormLoading', false)
                .set('isConsentInfoGet', false)
                .set('consentInfo', {});
        case CHECK_CONSENT_RESET:
            return state
                .set('isConsentInfoGet', false)
                .set('consentInfo', {});

        default:
            return state;
    }
}

export default scopesPageReducer;
