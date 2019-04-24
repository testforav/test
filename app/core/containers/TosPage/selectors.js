import { createSelector } from 'reselect';

/**
 * Direct selector to the tosPage state domain
 */
const selectTosPageDomain = () => (state) => state.get('tosPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TosPage
 */

const makeSelectTosPage = () => createSelector(
    selectTosPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectTosPage;
export {
    selectTosPageDomain,
};
