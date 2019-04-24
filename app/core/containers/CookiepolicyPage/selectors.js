import { createSelector } from 'reselect';

/**
 * Direct selector to the cookiepolicyPage state domain
 */
const selectCookiepolicyPageDomain = () => (state) => state.get('cookiepolicyPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CookiepolicyPage
 */

const makeSelectCookiepolicyPage = () => createSelector(
    selectCookiepolicyPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectCookiepolicyPage;
export {
    selectCookiepolicyPageDomain,
};
