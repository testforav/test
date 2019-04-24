
import { fromJS } from 'immutable';
import goodbyePageReducer from '../reducer';

describe('goodbyePageReducer', () => {
    it('returns the initial state', () => {
        expect(goodbyePageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
