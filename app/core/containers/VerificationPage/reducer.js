/*
 *
 * VerificationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,
    CHANGE_FIELD_ACTION,

    SET_DEFAULT_ACTION,

    SAVE_SUCCESS_ACTION,
    SAVE_ACTION,
    SAVE_ERROR_ACTION,

    CHECK_SUCCESS_ACTION,
    CHECK_ACTION,
    CHECK_ERROR_ACTION,

    CANCEL_SUCCESS_ACTION,
    CANCEL_ACTION,
    CANCEL_ERROR_ACTION,

    UPLOAD_SUCCESS_ACTION,
    UPLOAD_ERROR_ACTION,
    UPLOAD_ACTION,

    POR_SUCCESS_ACTION,
    POR_ERROR_ACTION,
    POR_ACTION,

    INIT_SUCCESS_ACTION,
    INIT_ERROR_ACTION,
    INIT_ACTION,
} from './constants';

import {
    LOAD_USER_SUCCESS,
    SIGNOUT_SUCCESS,
    AJAX_ERROR,
    RESET_DEFAULTS,
} from 'core/containers/App/constants';

const initialState = fromJS({
    data: {
        
    },
    isDefaultPassed: false,
    isLoading: false,
    status: '',
    onfidoToken: '',
    onfidoTokenUpdatedAt: '',
    sumsubApplicantId: '',
    sumsubToken: '',
    sumsubStatusUpdatedAt: -1,
});

function verificationDataPageReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;
        case CHANGE_FIELD_ACTION:
            _debug('change field (reducer): ', action.key, action.value);
            return state
                .setIn(['data', action.key], action.value);

        case SET_DEFAULT_ACTION:
            _debug('set verification default: ', action.data, state.get('data'));
            return state 
                .mergeDeepIn(['data'], action.data)
                .set('status', action.status)
                .set('isDefaultPassed', true);

        case SAVE_ACTION:
            return state
                .set('isLoading', true)
                .mergeDeepIn(['data'], action.data);
        case SAVE_SUCCESS_ACTION:
        case INIT_SUCCESS_ACTION:
            _debug('init success: ', action.data.Result);
            // window.isLockedOnfidoSave = false;
            return state
                .set('isLoading', false)
                .set('sumsubToken', action.data.Result.Token)
                .set('sumsubApplicantId', action.data.Result.ApplicantId)
                .set('sumsubTokenUpdatedAt', '' + new Date());
        case SAVE_ERROR_ACTION:
            window.isLockedOnfidoSave = false;
            return state
                .set('isLoading', false);

        case CHECK_ACTION:
            return state
                .set('isLoading', true);
        case CHECK_SUCCESS_ACTION:
            window.isLockedOnfidoCheck = false;
            return state
                .set('isLoading', false);
        case CHECK_ERROR_ACTION:
            window.isLockedOnfidoCheck = false;
            return state
                .set('isLoading', false);

        case CANCEL_ACTION:
            return state
                .set('isLoading', true);
        case CANCEL_SUCCESS_ACTION:
            return state
                .set('isLoading', false);
        case CANCEL_ERROR_ACTION:
            return state
                .set('isLoading', false);

        case SIGNOUT_SUCCESS:
            return state
                .set('data', initialState.get('data'))
                .set('status', initialState.get('status'))
                .set('isDefaultPassed', initialState.get('isDefaultPassed'))
                .set('onfidoToken', initialState.get('onfidoToken'))
                .set('sumsubToken', initialState.get('sumsubToken'))
                .set('sumsubApplicantId', initialState.get('sumsubApplicantId'));

        case UPLOAD_ACTION:
        case POR_ACTION:
            return state
                .set('isLoading', true);
        case UPLOAD_ERROR_ACTION:
        case POR_ERROR_ACTION:
            return state
                .set('isLoading', false);
        case UPLOAD_SUCCESS_ACTION:
            return state
                .set('isLoading', false)
                .set('documentTimestamp', new Date());

        case POR_SUCCESS_ACTION:
            return state
                .set('isLoading', false);

        case AJAX_ERROR:
            if (action.errors && action.errors[0].Key === 'Token') {
                return state
                    .set('data', initialState.get('data'))
                    .set('status', initialState.get('status'))
                    .set('isDefaultPassed', initialState.get('isDefaultPassed'))
                    .set('onfidoToken', initialState.get('onfidoToken'))
                    .set('sumsubToken', initialState.get('sumsubToken'))
                    .set('sumsubApplicantId', initialState.get('sumsubApplicantId'));
            } else {
                return state;
            }

        case INIT_ACTION:
            return state 
                .set('isLoading', action.isLoading);
        case INIT_ERROR_ACTION:
            return state
                .set('isLoading', false);

        case LOAD_USER_SUCCESS:
            _debug('get some user-data: ', action.data.Client.KycStatus, action.data.Client.PorStatus);
            return state 
                .set('KycStatus', action.data.Client.KycStatus)
                .set('PorStatus', action.data.Client.PorStatus);

        default:
            return state;
    }
}

export default verificationDataPageReducer;
