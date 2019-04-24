import { createSelector } from 'reselect';

/**
 * Direct selector to the passwordPage state domain
 */
const selectPasswordPageDomain = () => (state) => state.get('passwordPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PasswordPage
 */

const makeSelectPasswordPage = () => createSelector(
    selectPasswordPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectPasswordPage;
export {
    selectPasswordPageDomain,
};
