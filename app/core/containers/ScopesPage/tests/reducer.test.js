
import { fromJS } from 'immutable';
import scopesPageReducer from '../reducer';

describe('scopesPageReducer', () => {
    it('returns the initial state', () => {
        expect(scopesPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
