
import { fromJS } from 'immutable';
import tosPageReducer from '../reducer';

describe('tosPageReducer', () => {
    it('returns the initial state', () => {
        expect(tosPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
