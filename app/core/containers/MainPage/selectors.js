import { createSelector } from 'reselect';

/**
 * Direct selector to the mainPage state domain
 */
const selectMainPageDomain = () => (state) => state.get('mainPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MainPage
 */

const makeSelectMainPage = () => createSelector(
    selectMainPageDomain(),
    (substate) => substate.toJS()
);

const makeSelectUsername = () => createSelector(
    selectMainPageDomain(),
    (mainPageState) => {
        return {
            email: mainPageState.get('email'),
            password: mainPageState.get('password'),
            emailSignup: mainPageState.get('emailSignup'),
            passwordSignup: mainPageState.get('passwordSignup')
        };
    }
);

export default makeSelectMainPage;
export {
    selectMainPageDomain,
    makeSelectUsername
};
