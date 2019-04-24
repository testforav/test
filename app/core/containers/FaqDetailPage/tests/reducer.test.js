
import { fromJS } from 'immutable';
import faqDetailPageReducer from '../reducer';

describe('faqDetailPageReducer', () => {
    it('returns the initial state', () => {
        expect(faqDetailPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
