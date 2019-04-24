
import { fromJS } from 'immutable';
import verificationPageReducer from '../reducer';

describe('verificationPageReducer', () => {
  it('returns the initial state', () => {
    expect(verificationPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
