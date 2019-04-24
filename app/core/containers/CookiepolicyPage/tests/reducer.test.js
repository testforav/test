
import { fromJS } from 'immutable';
import cookiepolicyPageReducer from '../reducer';

describe('cookiepolicyPageReducer', () => {
    it('returns the initial state', () => {
        expect(cookiepolicyPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
