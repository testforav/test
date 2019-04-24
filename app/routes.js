// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import WithAuth from 'containers/Authentication';
import { getAsyncInjectors } from 'core/utils/asyncInjectors';

const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
    _debug('loadModule: ', componentModule);

    cb(null, componentModule.default);
};

export default function createRoutes(store) {
    // create reusable async injectors using getAsyncInjectors factory
    const { injectReducer, injectSagas } = getAsyncInjectors(store);

    return [
        {
            path: '/',
            name: 'mainPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([
                    import ('core/containers/MainPage/sagas'),
                ]);
                importModules.then(([sagas, signinSagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => saga.cancel());
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import ('core/containers/MainPage/reducer'),
                    import ('core/containers/SigninPage/reducer'),
                    import ('containers/MainPage')
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, signinReducer, component]) => {
                    injectReducer('mainPage', reducer.default);
                    injectReducer('signinPage', signinReducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            }
        }, {
            path: '/account',
            name: 'accountPage',
            getComponent(nextState, cb) {
                const importModules = Promise.all([import ('core/containers/AccountPage/reducer'), import ('containers/AccountPage')]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('accountPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            }
        }, {
            path: '/security',
            name: 'securityPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/SecurityPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/SecurityPage/reducer'),
                    import('containers/SecurityPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('securityPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '/signin',
            name: 'signinPage',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/SigninPage/reducer'),
                    import('containers/SigninPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('signinPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '/signup',
            name: 'signupPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([
                    import ('core/containers/SignupPage/sagas'),
                ]);
                importModules.then(([
                    sagas,
                ]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/SignupPage/reducer'),
                    import('core/containers/SigninPage/reducer'),
                    import('containers/SignupPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, signinReducer, component]) => {
                    injectReducer('signupPage', reducer.default);
                    injectReducer('signinPage', signinReducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '/forgot-password',
            name: 'forgotPasswordPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/ForgotPasswordPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/ForgotPasswordPage/reducer'),
                    import('containers/ForgotPasswordPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('forgotPasswordPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '/confirm-email',
            name: 'emailConfirmPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/EmailConfirmPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/EmailConfirmPage/reducer'),
                    import('containers/EmailConfirmPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('emailConfirmPage', reducer.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '/password-reset',
            name: 'passwordResetPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/PasswordResetPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/PasswordResetPage/reducer'),
                    import('containers/PasswordResetPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('passwordResetPage', reducer.default);
                    renderRoute(component);
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '/password',
            name: 'passwordPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/PasswordPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/PasswordPage/reducer'),
                    import('containers/PasswordPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('passwordPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '/verification',
            name: 'verificationPage',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    // import('core/containers/VerificationOnfidoPage/reducer'),
                    import('containers/VerificationPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([component]) => {
                    // injectReducer('verificationOnfidoPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        },
        {
            path: '/faq',
            name: 'faqPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/FaqPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/FaqPage/reducer'),
                    import('containers/FaqPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('faqPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        },
        {
            path: '/faq/detailed-instruction',
            name: 'faqDetailPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/FaqDetailPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/FaqDetailPage/reducer'),
                    import('containers/FaqDetailPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('faqDetailPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        },
        {
            path: '/buyers',
            name: 'buyersPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/FaqPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/FaqPage/reducer'),
                    import('containers/BuyersPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('faqPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '/icos',
            name: 'icosPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/FaqPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/FaqPage/reducer'),
                    import('containers/IcosPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('faqPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '/about',
            name: 'aboutPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/FaqPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/FaqPage/reducer'),
                    import('containers/AboutPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('faqPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
        }, {
            path: '/tos',
            name: 'tosPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/TosPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/TosPage/reducer'),
                    import('containers/TosPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('tosPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '/privacypolicy',
            name: 'privacypolicyPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/PrivacypolicyPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/PrivacypolicyPage/reducer'),
                    import('containers/PrivacypolicyPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('privacypolicyPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
        }, {
            path: '/cookiepolicy',
            name: 'cookiepolicyPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/CookiepolicyPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/CookiepolicyPage/reducer'),
                    import('containers/CookiepolicyPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('cookiepolicyPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '/wallets',
            name: 'walletsPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/WalletsPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/WalletsPage/reducer'),
                    import('containers/WalletsPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('walletsPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '/test',
            name: 'testPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/TestPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/TestPage/reducer'),
                    import('containers/TestPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('testPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '/scopes',
            name: 'scopesPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/ScopesPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/ScopesPage/reducer'),
                    import('containers/ScopesPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('scopesPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '/goodbye',
            name: 'goodbyePage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/GoodbyePage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/GoodbyePage/reducer'),
                    import('containers/GoodbyePage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('goodbyePage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '/account-privacy',
            name: 'accountPrivacyPage',
            onEnter(nextState, replace, callback) {
                if (this.loadedSagas) {
                    callback();
                    return;
                }
                const importModules = Promise.all([import ('core/containers/AccountPrivacyPage/sagas')]);
                importModules.then(([sagas]) => {
                    this.loadedSagas = injectSagas(sagas.default);
                    callback();
                });
                importModules.catch(errorLoading);
            },
            onLeave() {
                if (this.loadedSagas) {
                    this.loadedSagas.forEach((saga) => {
                        saga.cancel();
                    });
                    delete this.loadedSagas;
                }
            },
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('core/containers/AccountPrivacyPage/reducer'),
                    import('containers/AccountPrivacyPage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, component]) => {
                    injectReducer('accountPrivacyPage', reducer.default);
                    renderRoute({
                        default: WithAuth(component.default)
                    });
                });

                importModules.catch(errorLoading);
            },
        }, {
            path: '*',
            name: 'notfound',
            getComponent(nextState, cb) {
                import ('containers/NotFoundPage').then(loadModule(cb)).catch(errorLoading);
            }
        }
    ];
}
