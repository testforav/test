import 'whatwg-fetch';
import config from 'core/utils/config';
import { take, call, put, select, cancel, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { ajaxError, setConsent } from 'core/containers/App/actions';
import _ from 'lodash';
import * as Cookies from 'js-cookie';
// import AbortController from "abort-controller";
import { delay } from 'redux-saga';

const xsrfMethos = ['POST', 'PUT', 'DELETE'];
const REQUEST_MAX_TIMEOUT = 30000;

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
    if (response.status === 413) {
        return {
            ok: 0,
            errors: [{
                field: 'error',
                text: 'File size is too big'
            }]
        };
    } else {
        return response.json();
    }
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
    _debug('checkStatus: ', response);
    return response;
}

export function* proccessResponse(res, actionSuccess, actionError, actionAjaxError) {
    if (res.Status === 'ok') {
        if (res.Result && res.Result.Redirect) {
            yield put(setConsent(''));

            setTimeout(() => {
                window.location.replace(res.Result.Redirect);
            }, 100);
        }

        yield put(actionSuccess(res));
    } else {
        yield put(actionAjaxError(res.Result));
        yield put(actionError(res.Result));
    }
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
    const baseUrl = config.api.base;

    url = baseUrl + url;

    _debug('REQUEST baseUrl: ', baseUrl, url);

    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON);
}

export function* requestTimeoutCheck(controller, onError, ajaxError) {
    const defaultError = [{
        'Key': 'timeout',
        'Message': 'Request timeout, please try again or contact support'
    }];

    _debug('!requestTimeoutCheck!');

    yield call(delay, REQUEST_MAX_TIMEOUT);

    controller.abort();

    yield put(onError(defaultError));
    yield put(ajaxError(defaultError));
}

export function* safeRequest(url, data, onSuccess, onError) {
    // const controller = new AbortController();
    // const signal = controller.signal;

    const defaultError = [{
        'Key': 'error',
        'Message': 'Server error, please try again or contact support'
    }];

    // data.signal = signal;

    // const checkSync = yield fork(requestTimeoutCheck, controller, onError, ajaxError);

    try {
        const _xsrf = Cookies.get('_xsrf');

        if (_.includes(xsrfMethos, data.method) && _xsrf) {
            let xsrfDecoded = atob(_xsrf.split('|')[0]);

            if (data.headers) {
                data.headers['X-Xsrftoken'] = xsrfDecoded;
            } else {
                data.headers = {
                    'X-Xsrftoken': xsrfDecoded
                };
            }

            _debug('safeRequest add xsrf: ', data, data.method, _xsrf, xsrfDecoded);
        }

        const requestXhr = yield call(request, url, data);
        yield call(proccessResponse, requestXhr, onSuccess, onError, ajaxError);

        // yield cancel(checkSync);
    } catch (e) {
        _debug('safeRequest catch: ', e);

        yield put(onError(defaultError));
        yield put(ajaxError(defaultError));

        // yield cancel(checkSync);
    }
}
