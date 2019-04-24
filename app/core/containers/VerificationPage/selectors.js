import { createSelector } from 'reselect';

/**
 * Direct selector to the verificationPage state domain
 */
const selectVerificationPageDomain = () => (state) => state.get('verificationPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by VerificationPage
 */

const makeSelectVerificationPage = () => createSelector(
    selectVerificationPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectVerificationPage;
export {
    selectVerificationPageDomain,
};
