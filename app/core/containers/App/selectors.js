/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectCurrentUser = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('currentUser')
);

const makeSelectUserData = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('userData')
);

const makeSelectHotWallets = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('hotWallets')
);

const makeSelectSubWallets = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('subWallets')
);

const makeSelectTotalReceived = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('totalReceived')
);

const makeSelectNotifications = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('notifications')
);

const makeSelectLoading = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
    selectGlobal,
    (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectLoadings = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('loadings')
);

const makeSelectUserTokens = () => createSelector(
    selectGlobal,
    (globalState) => globalState.getIn(['userData', 'tokens'])
);

const makeSelectConsent = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('consent')
);
const makeSelectConsentInfo = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('consentInfo')
);
const makeSelectContactUs = () => createSelector(
    selectGlobal,
    (globalState) => globalState.get('contactUs')
);

const makeSelectLocationState = () => {
    let prevRoutingState;
    let prevRoutingStateJS;

    return (state) => {
        const routingState = state.get('route'); // or state.route

        if (!routingState.equals(prevRoutingState)) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }

        return prevRoutingStateJS;
    };
};

export {
    selectGlobal,
    makeSelectUserData,
    makeSelectHotWallets,
    makeSelectSubWallets,
    makeSelectTotalReceived,
    makeSelectNotifications,
    makeSelectCurrentUser,
    makeSelectLoading,
    makeSelectError,
    makeSelectRepos,
    makeSelectLocationState,
    makeSelectLoadings,
    makeSelectUserTokens,
    makeSelectConsent,
    makeSelectConsentInfo,
    makeSelectContactUs,
};
