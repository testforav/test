import { createSelector } from 'reselect';

/**
 * Direct selector to the walletsPage state domain
 */
const selectWalletsPageDomain = () => (state) => state.get('walletsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by WalletsPage
 */

const makeSelectWalletsPage = () => createSelector(
    selectWalletsPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectWalletsPage;
export {
    selectWalletsPageDomain,
};
