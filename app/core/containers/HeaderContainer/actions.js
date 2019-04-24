/*
 *
 * HeaderContainer actions
 *
 */

import {
    TICKERS_RECIEVED,
    COMPONENT_UNMOUNT,
} from './constants';

export function tickersRecieved(data) {
    return {
        type: TICKERS_RECIEVED,
        Channel: data.Channel,
        Data: data.Data,
    };
}
