import { createSelector } from 'reselect';

/**
 * Direct selector to the accountPrivacyPage state domain
 */
const selectAccountPrivacyPageDomain = () => (state) => state.get('accountPrivacyPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AccountPrivacyPage
 */

const makeSelectAccountPrivacyPage = () => createSelector(
    selectAccountPrivacyPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectAccountPrivacyPage;
export {
    selectAccountPrivacyPageDomain,
};
