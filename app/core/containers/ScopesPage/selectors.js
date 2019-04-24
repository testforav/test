import { createSelector } from 'reselect';

/**
 * Direct selector to the scopesPage state domain
 */
const selectScopesPageDomain = () => (state) => state.get('scopesPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ScopesPage
 */

const makeSelectScopesPage = () => createSelector(
    selectScopesPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectScopesPage;
export {
    selectScopesPageDomain,
};
