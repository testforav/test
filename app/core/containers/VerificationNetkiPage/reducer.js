/*
 *
 * VerificationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,
    CHANGE_FIELD_ACTION,

    SAVE_SUCCESS_ACTION,
    SAVE_ERROR_ACTION,
    SAVE_ACTION,

    UPLOAD_SUCCESS_ACTION,
    UPLOAD_ERROR_ACTION,
    UPLOAD_ACTION,
} from './constants';

const initialState = fromJS({
    data: {
        Documents: [],
    },
    isLoading: false,
});

function verificationNetkiPageReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;
        case CHANGE_FIELD_ACTION:
            return state
                .setIn(['data', action.key], action.value);

        case SAVE_ACTION:
            return state
                .set('isLoading', true);
        case SAVE_ERROR_ACTION:
            return state
                .set('isLoading', false);
        case SAVE_SUCCESS_ACTION:
            return state
                .set('isLoading', false);

        case UPLOAD_ACTION:
            return state
                .set('isLoading', true);
        case UPLOAD_ERROR_ACTION:
            return state
                .set('isLoading', false);
        case UPLOAD_SUCCESS_ACTION:
            _debug('upload: ', action);

            const docs = state.get('data').toJS().Documents;
            let isExist = false;
            _debug(docs);

            for (let i = 0, l = docs.length; i < l; i++) {
                if (docs[i].DocumentType === action.index) {
                    docs[i].Document = action.data.Result.Message.Url;
                    isExist = true;
                    break;
                }
            }

            if (!isExist) {
                docs.push({
                    Document: action.data.Result.Message.Url,
                    DocumentType: action.index,
                });
            }

            return state
                .set('isLoading', false)
                .setIn(['data', 'Documents'], docs);

        default:
            return state;
    }
}

export default verificationNetkiPageReducer;
