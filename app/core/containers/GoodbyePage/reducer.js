/*
 *
 * GoodbyePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,

    SUBMIT_ACTION,
    SUBMIT_SUCCESS_ACTION,
    SUBMIT_ERROR_ACTION,
} from './constants';

const initialState = fromJS({
    deleteRequestSent: false,
    formLoading: false
});

function goodbyePageReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case SUBMIT_ACTION:
            return state
                .set('formLoading', true);
        case SUBMIT_SUCCESS_ACTION:
            return state
                .set('formLoading', false)
                .set('deleteRequestSent', true);
        case SUBMIT_ERROR_ACTION:
            return state
                .set('formLoading', false)
                .set('deleteRequestSent', false);

        default:
            return state;
    }
}

export default goodbyePageReducer;
