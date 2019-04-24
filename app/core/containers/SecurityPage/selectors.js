import { createSelector } from 'reselect';

/**
 * Direct selector to the securityPage state domain
 */
const selectSecurityPageDomain = () => (state) => state.get('securityPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SecurityPage
 */

const makeSelectSecurityPage = () => createSelector(
    selectSecurityPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectSecurityPage;
export {
    selectSecurityPageDomain,
};
