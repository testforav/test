/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';
import createEncryptor from 'redux-persist-transform-encrypt';
import createExpirationTransform from 'redux-persist-transform-expire';

import headerContainerReducer from 'core/containers/HeaderContainer/reducer';
import * as headerContainerSaga from 'core/containers/HeaderContainer/sagas';
import * as verificationContainerSaga from 'core/containers/VerificationPage/sagas';
import * as appSaga from 'core/containers/App/sagas';
import * as accountSaga from 'core/containers/AccountPage/sagas';
import * as signinSaga from 'core/containers/SigninPage/sagas';

import createReducer from './reducers';
import { getAsyncInjectors } from 'core/utils/asyncInjectors';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [sagaMiddleware, routerMiddleware(history)];

    const enhancers = [
        applyMiddleware(...middlewares),
        autoRehydrate()
    ];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = process.env.NODE_ENV === 'development' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;
    /* eslint-enable */

    const store = createStore(createReducer(), fromJS(initialState), composeEnhancers(...enhancers));

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.asyncReducers = {
        // headerContainer: headerContainerReducer
    }; // Async reducer registry

    // Подключаем саги, непривязанные к роутеру
    const { injectSagas } = getAsyncInjectors(store);
    injectSagas(headerContainerSaga.default);
    injectSagas(appSaga.default);
    injectSagas(verificationContainerSaga.default);
    injectSagas(accountSaga.default);
    injectSagas(signinSaga.default);

    // Encryptor settings
    const encryptor = createEncryptor({ secretKey: 'tDkYiPVHNaxirDpcFWbcHR3P' });

    const expireTransform = createExpirationTransform({
        expireKey: 'persistExpiresAt',
        defaultState: {
            usdrData: {
                repositories: false,
                authenticated: false,
                _accsstkn: ''
            }
        }
    });

    persistStore(store, {
        whitelist: ['global', 'language', 'verificationPage'],
        transforms: [
            expireTransform
            // encryptor
        ]
    });

    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            import ('./reducers').then((reducerModule) => {
                const createReducers = reducerModule.default;
                const nextReducers = createReducers(store.asyncReducers);

                store.replaceReducer(nextReducers);
            });
        });
    }

    return store;
}
