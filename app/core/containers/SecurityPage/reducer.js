/*
 *
 * SecurityPage reducer
 *
 */

import { fromJS } from 'immutable';

import {
    DEFAULT_ACTION,

    ERRORS_SHOWN,

    SUBMIT_ACTION,
    SUBMIT_SUCCESS_ACTION,
    SUBMIT_ERROR_ACTION,

    SUBMIT_DISABLE_GOOGLE_ACTION,
    SUBMIT_DISABLE_GOOGLE_SUCCESS_ACTION,
    SUBMIT_DISABLE_GOOGLE_ERROR_ACTION,

    LOAD_ACTIVITY_ACTION,
    LOAD_ACTIVITY_SUCCESS_ACTION,
    LOAD_ACTIVITY_ERROR_ACTION,

    TERMINATE_SESSIONS_ACTION,
    TERMINATE_SESSIONS_SUCCESS_ACTION,
    TERMINATE_SESSIONS_ERROR_ACTION,

    LOAD_BACKUP,
    LOAD_BACKUP_SUCCESS,
    LOAD_BACKUP_ERROR,

    UPDATE_BACKUP,
    UPDATE_BACKUP_SUCCESS,
    UPDATE_BACKUP_ERROR,

    CLEAR_BACKUP_CODES,

    CODE_CHANGE_ACTION,
} from './constants';

const makeId = () => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < 16; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text.toUpperCase();
}

const secret = makeId();
const secretData = 'otpauth://totp/Example:alice@google.com?secret=' + secret + '&issuer=Example';

const initialState = fromJS({
    isFormLoading: false,
    formErrors: [],
    code: '',
    qrSecret: secret,
    qrSecretData: secretData,
    isLoading: true,
    activityHistory: [],
    backupCodes: []
});

function securityPageReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case SUBMIT_ACTION:
        case SUBMIT_DISABLE_GOOGLE_ACTION:
            return state
                .set('isFormLoading', true);
        case SUBMIT_SUCCESS_ACTION:
        case SUBMIT_DISABLE_GOOGLE_SUCCESS_ACTION:
            return state
                .set('isFormLoading', false)
                .set('formErrors', [])
                .set('externalCloseModal', new Date().getTime());
        case SUBMIT_ERROR_ACTION:
        case SUBMIT_DISABLE_GOOGLE_ERROR_ACTION:
            return state
                .set('isFormLoading', false)
                .set('formErrors', action.errors);

        case CODE_CHANGE_ACTION:
            return state
                .set('code', action.code);

        case LOAD_ACTIVITY_ACTION:
        case TERMINATE_SESSIONS_ACTION:
            return state
                .set('isLoading', true);

        case LOAD_ACTIVITY_ERROR_ACTION:
        case TERMINATE_SESSIONS_ERROR_ACTION:
        case TERMINATE_SESSIONS_SUCCESS_ACTION:
            return state
                .set('isLoading', false);

        case LOAD_ACTIVITY_SUCCESS_ACTION:
            return state
                .set('activityHistory', action.data.Result.Items)
                .set('isLoading', false);

        case LOAD_BACKUP_SUCCESS:
            return state
                .set('backupCodes', action.data);
        case UPDATE_BACKUP_SUCCESS:
            return state
                .set('backupCodes', action.data);
        case CLEAR_BACKUP_CODES:
            return state
                .set('backupCodes', []);

        default:
            return state;
    }
}

export default securityPageReducer;
