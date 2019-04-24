import { createSelector } from 'reselect';

/**
 * Direct selector to the VerificationNetkiPage state domain
 */
const selectVerificationNetkiPageDomain = () => (state) => state.get('verificationNetkiPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by VerificationNetkiPage
 */

const makeSelectVerificationNetkiPage = () => createSelector(
    selectVerificationNetkiPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectVerificationNetkiPage;
export {
    selectVerificationNetkiPageDomain,
};
