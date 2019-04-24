import { createSelector } from 'reselect';

/**
 * Direct selector to the faqDetailPage state domain
 */
const selectFaqDetailPageDomain = () => (state) => state.get('faqDetailPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FaqDetailPage
 */

const makeSelectFaqDetailPage = () => createSelector(
    selectFaqDetailPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectFaqDetailPage;
export {
    selectFaqDetailPageDomain,
};
