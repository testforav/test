import { createSelector } from 'reselect';

/**
 * Direct selector to the goodbyePage state domain
 */
const selectGoodbyePageDomain = () => (state) => state.get('goodbyePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by GoodbyePage
 */

const makeSelectGoodbyePage = () => createSelector(
    selectGoodbyePageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectGoodbyePage;
export {
    selectGoodbyePageDomain,
};
