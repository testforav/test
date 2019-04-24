/*
 *
 * AccountPrivacyPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,

    DELETE_ACCOUNT_SEND,
    DELETE_ACCOUNT_SEND_SUCCESS,
    DELETE_ACCOUNT_SEND_ERROR,

    REQUEST_PERSONAL_SEND,
    REQUEST_PERSONAL_SEND_SUCCESS,
    REQUEST_PERSONAL_SEND_ERROR,
} from './constants';

const initialState = fromJS({
    deleteLoading: false,
    deleteRequestSent: false,

    requestDataLoading: false,
    requestDataSent: false,
});

function accountPrivacyPageReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case DELETE_ACCOUNT_SEND:
            return state
                .set('deleteLoading', true);
        case DELETE_ACCOUNT_SEND_SUCCESS:
            return state
                .set('deleteRequestSent', true)
                .set('deleteLoading', false);
        case DELETE_ACCOUNT_SEND_ERROR:
            return state
                .set('deleteRequestSent', false)
                .set('deleteLoading', false);

        case REQUEST_PERSONAL_SEND:
            return state
                .set('requestDataLoading', true);
        case REQUEST_PERSONAL_SEND_SUCCESS:
            return state
                .set('requestDataSent', true)
                .set('requestDataLoading', false);
        case REQUEST_PERSONAL_SEND_ERROR:
            return state
                .set('requestDataSent', false)
                .set('requestDataLoading', false);


        default:
            return state;
    }
}

export default accountPrivacyPageReducer;
