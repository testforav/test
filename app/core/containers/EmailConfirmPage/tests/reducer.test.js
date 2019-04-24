
import { fromJS } from 'immutable';
import emailConfirmPageReducer from '../reducer';

describe('emailConfirmPageReducer', () => {
    it('returns the initial state', () => {
        expect(emailConfirmPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
