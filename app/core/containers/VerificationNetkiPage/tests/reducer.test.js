
import { fromJS } from 'immutable';
import VerificationNetkiPageReducer from '../reducer';

describe('VerificationNetkiPageReducer', () => {
  it('returns the initial state', () => {
    expect(VerificationNetkiPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
