import { createSelector } from 'reselect';

/**
 * Direct selector to the emailConfirmPage state domain
 */
const selectEmailConfirmPageDomain = () => (state) => state.get('emailConfirmPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EmailConfirmPage
 */

const makeSelectEmailConfirmPage = () => createSelector(
    selectEmailConfirmPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectEmailConfirmPage;
export {
    selectEmailConfirmPageDomain,
};
