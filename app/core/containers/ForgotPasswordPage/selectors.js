import { createSelector } from 'reselect';

/**
 * Direct selector to the forgotPasswordPage state domain
 */
const selectForgotPasswordPageDomain = () => (state) => state.get('forgotPasswordPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ForgotPasswordPage
 */

const makeSelectForgotPasswordPage = () => createSelector(
    selectForgotPasswordPageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectForgotPasswordPage;
export {
    selectForgotPasswordPageDomain,
};
