
import { fromJS } from 'immutable';
import gaConfirmPageReducer from '../reducer';

describe('gaConfirmPageReducer', () => {
  it('returns the initial state', () => {
    expect(gaConfirmPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
