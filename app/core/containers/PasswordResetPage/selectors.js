import { createSelector } from 'reselect';

/**
 * Direct selector to the passwordResetPage state domain
 */
const selectPasswordResetPageDomain = () => (state) => state.get('passwordResetPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PasswordResetPage
 */

const makeSelectPasswordResetPage = () => createSelector(
    selectPasswordResetPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectPasswordResetPage;
export {
    selectPasswordResetPageDomain,
};
