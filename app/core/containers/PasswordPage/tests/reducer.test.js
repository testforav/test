
import { fromJS } from 'immutable';
import passwordPageReducer from '../reducer';

describe('passwordPageReducer', () => {
    it('returns the initial state', () => {
        expect(passwordPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
