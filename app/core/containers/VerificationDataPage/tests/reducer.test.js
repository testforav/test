
import { fromJS } from 'immutable';
import VerificationDataPageReducer from '../reducer';

describe('VerificationDataPageReducer', () => {
  it('returns the initial state', () => {
    expect(VerificationDataPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
