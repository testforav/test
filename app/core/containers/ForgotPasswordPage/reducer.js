/*
 *
 * ForgotPasswordPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
	SUBMIT_FORGOT_PASSWORD_SUCCESS,
} from './constants';

const initialState = fromJS({
    isSuccess: false,
});

function forgotPasswordPageReducer(state = initialState, action) {
    switch (action.type) {
    	case SUBMIT_FORGOT_PASSWORD_SUCCESS: 
    		return state
    			.set('isSuccess', true);
        default:
            return state;
    }
}

export default forgotPasswordPageReducer;
