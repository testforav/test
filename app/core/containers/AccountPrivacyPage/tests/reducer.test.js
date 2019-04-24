
import { fromJS } from 'immutable';
import accountPrivacyPageReducer from '../reducer';

describe('accountPrivacyPageReducer', () => {
    it('returns the initial state', () => {
        expect(accountPrivacyPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
