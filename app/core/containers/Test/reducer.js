/*
 *
 * Test reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,

    ERRORS_SHOWN,

    SUBMIT_ACTION,
    SUBMIT_SUCCESS_ACTION,
    SUBMIT_ERROR_ACTION,

    NAME_CHANGE_ACTION,
    LAST_NAME_CHANGE_ACTION,
    EMAIL_CHANGE_ACTION,
} from './constants';

const initialState = fromJS({
    isFormLoading: false,
    formErrors: [],
    name: '',
    last_name: '',
    email: '',
});

function testReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;

        case SUBMIT_ACTION:
            return state
                .set('isFormLoading', true);
        case SUBMIT_SUCCESS_ACTION:
            return state
                .set('isFormLoading', false)
                .set('formErrors', []);
        case SUBMIT_ERROR_ACTION:
            return state
                .set('isFormLoading', false)
                .set('formErrors', action.errors);

        case NAME_CHANGE_ACTION:
            return state
                .set('name', action.name);
        case LAST_NAME_CHANGE_ACTION:
            return state
                .set('last_name', action.last_name);
        case EMAIL_CHANGE_ACTION:
            return state
                .set('email', action.email);

        default:
            return state;
    }
}

export default testReducer;
