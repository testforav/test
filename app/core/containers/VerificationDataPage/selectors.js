import { createSelector } from 'reselect';

/**
 * Direct selector to the VerificationDataPage state domain
 */
const selectVerificationDataPageDomain = () => (state) => state.get('verificationDataPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by VerificationDataPage
 */

const makeSelectVerificationDataPage = () => createSelector(
    selectVerificationDataPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectVerificationDataPage;
export {
    selectVerificationDataPageDomain,
};
