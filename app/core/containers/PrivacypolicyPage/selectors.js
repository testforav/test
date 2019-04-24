import { createSelector } from 'reselect';

/**
 * Direct selector to the privacypolicyPage state domain
 */
const selectPrivacypolicyPageDomain = () => (state) => state.get('privacypolicyPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PrivacypolicyPage
 */

const makeSelectPrivacypolicyPage = () => createSelector(
    selectPrivacypolicyPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectPrivacypolicyPage;
export {
    selectPrivacypolicyPageDomain,
};
