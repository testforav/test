import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { safeRequest } from 'core/utils/request';

import {
    LOAD_WALLETS_ACTION,
    LOAD_WALLETS_ACTION_SUCCESS,
    LOAD_WALLETS_ACTION_ERROR,
} from './constants';

import {
    loadWalletsSuccess,
    loadWalletsError,
} from './actions';

export function* doLoadWallets(action) {

    const requestURL = '/v1/clients/wallets';

    yield call(safeRequest, requestURL, {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }, loadWalletsSuccess, loadWalletsError);
}

export function* loadWalletsSaga() {
    while (true) {
        const actionLoad = yield take(LOAD_WALLETS_ACTION);

        if (!actionLoad) {
            break;
        }

        yield fork(doLoadWallets, actionLoad);
    }
}

// All sagas to be loaded
export default [
    loadWalletsSaga,
];
