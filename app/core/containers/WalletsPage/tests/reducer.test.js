
import { fromJS } from 'immutable';
import walletsPageReducer from '../reducer';

describe('walletsPageReducer', () => {
    it('returns the initial state', () => {
        expect(walletsPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
