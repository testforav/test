
import { fromJS } from 'immutable';
import privacypolicyPageReducer from '../reducer';

describe('privacypolicyPageReducer', () => {
    it('returns the initial state', () => {
        expect(privacypolicyPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
