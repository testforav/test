import { createSelector } from 'reselect';

/**
 * Direct selector to the gaConfirmPage state domain
 */
const selectGaConfirmPageDomain = () => (state) => state.get('gaConfirmPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by GaConfirmPage
 */

const makeSelectGaConfirmPage = () => createSelector(
    selectGaConfirmPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectGaConfirmPage;
export {
    selectGaConfirmPageDomain,
};
