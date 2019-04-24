/*
 *
 * WalletsPage actions
 *
 */

import {
    DEFAULT_ACTION,

    LOAD_WALLETS_ACTION,
    LOAD_WALLETS_ACTION_SUCCESS,
    LOAD_WALLETS_ACTION_ERROR,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}

export function loadWallets() {
    return {
        type: LOAD_WALLETS_ACTION,
    };
}

export function loadWalletsSuccess(data) {
    return {
        type: LOAD_WALLETS_ACTION_SUCCESS,
        data,
    };
}

export function loadWalletsError(errors) {
    return {
        type: LOAD_WALLETS_ACTION_ERROR,
        errors,
    };
}
