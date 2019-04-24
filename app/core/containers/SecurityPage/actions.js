/*
 *
 * SecurityPage actions
 *
 */

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

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function errorsShown() {
    return {
        type: ERRORS_SHOWN
    };
}

export function changeSecurityPageCode(code) {
    return {
        type: CODE_CHANGE_ACTION,
        code,
    };
}

export function submitSecurityPage(G2fatkn, Secret) {
    return {
        type: SUBMIT_ACTION,
        G2fatkn,
        Secret,
    };
}

export function submitSecurityDisableGooglePage(G2fatkn) {
    return {
        type: SUBMIT_DISABLE_GOOGLE_ACTION,
        G2fatkn,
    };
}
export function submitSecurityDisableGooglePageSuccess(G2fatkn) {
    return {
        type: SUBMIT_DISABLE_GOOGLE_SUCCESS_ACTION,
    };
}
export function submitSecurityDisableGooglePageError(errors) {
    return {
        type: SUBMIT_DISABLE_GOOGLE_ERROR_ACTION,
        errors,
    };
}

export function submitSecurityPageSuccess(res) {
    return {
        type: SUBMIT_SUCCESS_ACTION,
    };
}

export function submitSecurityPageError(errors) {
    return {
        type: SUBMIT_ERROR_ACTION,
        errors,
    };
}

export function loadActivity() {
    return {
        type: LOAD_ACTIVITY_ACTION,
    };
}
export function loadActivitySuccess(data) {
    return {
        type: LOAD_ACTIVITY_SUCCESS_ACTION,
        data,
    };
}
export function loadActivityError(errors) {
    return {
        type: LOAD_ACTIVITY_ERROR_ACTION,
        errors,
    };
}

// Backup codes
export function loadBackupCodes() {
    return {
        type: LOAD_BACKUP,
    };
}
export function loadBackupCodesSuccess(res) {
    return {
        type: LOAD_BACKUP_SUCCESS,
        data: res.Result,
    };
}
export function loadBackupCodesError(errors) {
    return {
        type: LOAD_BACKUP_ERROR,
        errors,
    };
}

// Update Backup codes
export function updateBackupCodes() {
    return {
        type: UPDATE_BACKUP,
    };
}
export function updateBackupCodesSuccess(res) {
    return {
        type: UPDATE_BACKUP_SUCCESS,
        data: res.Result,
    };
}
export function updateBackupCodesError(errors) {
    return {
        type: UPDATE_BACKUP_ERROR,
        errors,
    };
}

// Terminate sessions
export function terminateSessions() {
    return {
        type: TERMINATE_SESSIONS_ACTION,
    };
}
export function terminateSessionsSuccess(data) {
    return {
        type: TERMINATE_SESSIONS_SUCCESS_ACTION,
        data,
    };
}
export function terminateSessionsError(errors) {
    return {
        type: TERMINATE_SESSIONS_ERROR_ACTION,
        errors,
    };
}

// Clear codes
export function clearBackupCodes() {
    return {
        type: CLEAR_BACKUP_CODES,
    };
}
