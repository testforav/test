/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Cookies from 'js-cookie';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import _ from 'lodash';

import messages from './messages';
import NotFoundPage from 'containers/NotFoundPage';
import Notifications from 'components/Notifications';
import HeaderContainer from 'containers/HeaderContainer';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';
import ModalCommon from 'components/ModalCommon';
import ContactUsForm from 'components/ContactUsForm';
import { makeSelectLocale } from 'core/containers/LanguageProvider/selectors';
import { changeLocale } from 'core/containers/LanguageProvider/actions';

import ReactGA from 'react-ga';

import {
    DEFAULT_LOCALE
} from 'core/containers/App/constants';

import {
    makeSelectUserData,
    makeSelectNotifications,
    makeSelectContactUs,
} from 'core/containers/App/selectors';

import {
    loadUser,
    resetDefaults,
    showNotification,
    setConsent,
    closeContactUs,
    sendContactUs,
} from 'core/containers/App/actions';

const allowedLangs = ['en', 'ko', 'ja', 'zh'];

export class App extends React.PureComponent {
    componentWillMount() {
        const lang = this.props.location.query.lang;

        _debug('before mount main APP: ', this.props.locale, this.props.location.query.consent);
        _debug(this.props, this.props.router.getCurrentLocation());

        if (lang) {
            if (_.includes(allowedLangs, lang)) {
                this.props.dispatch(changeLocale(lang));
            } else {
                this.props.dispatch(changeLocale(DEFAULT_LOCALE));
            }
        }

        if (Cookies.get('consentLangChange')) {
            this.props.dispatch(changeLocale(Cookies.get('consentLangChange')));
            Cookies.remove('consentLangChange');
        }

        Cookies.set('locale', this.props.locale);
        this.props.onBeforeAppMount();

        this.initUserDataTimer();

        document.onvisibilitychange = (evt) => {
            const hidden = evt.target.hidden;
            _debug('VISIBILITY CHANGED: ', hidden);
            if (hidden) {
                clearInterval(this.timerUserLoader);
                this.timerUserLoader = null;
            } else {
                this.props.dispatch(loadUser(true));
                this.initUserDataTimer();
            }
        };

        if (this.props.location.query.consent) {
            this.props.dispatch(setConsent(this.props.location.query.consent));
        }

        ReactGA.initialize(process.env.CONFIG.ga, {
            debug: process.env.CONFIG.needConsole,
        });

        this.checkBodyClass(this.props.userData.get('authenticated'));
    }

    initUserDataTimer() {
        if (!this.timerUserLoader) {
            this.timerUserLoader = setInterval(() => {
                this.props.dispatch(loadUser());
            }, 30000);
        }
    }

    componentDidMount() {
        const queryError = this.props.location.query.error;
        const isEmbed = !!this.props.location.query.embed;

        if (queryError && messages[queryError]) {
            this.props.dispatch(showNotification({
                type: 'danger',
                headline: {
                    id: queryError,
                    defaultMessage: queryError,
                },
                message: messages[queryError],
                timeout: 10000,
                unique: true
            }));
        }

        ReactGA.pageview(this.props.location.pathname);

        if (isEmbed) {
            document.body.classList.toggle('body_embed', true);
        }
    }

    componentWillUpdate(nextProps) {
        const nextLocation = nextProps.location.pathname;
        const prevLocation = this.props.location.pathname;
        const isLocationChanged = nextLocation !== prevLocation;

        const isAuth = this.props.userData.get('authenticated');
        const newAuthStatus = nextProps.userData.get('authenticated');

        _debug('APP componentWillUpdate: ', nextLocation, prevLocation, isLocationChanged, isAuth, newAuthStatus);

        if (isLocationChanged) {
            ReactGA.pageview(nextLocation);
        }

        if (isAuth !== newAuthStatus) {
            this.checkBodyClass(newAuthStatus);
        }
    }

    checkBodyClass(newAuthStatus) {
        document.body.classList.toggle('body_auth', newAuthStatus);
    }

    render() {
        let isLoggedIn = this.props.userData.get('authenticated');
        const isEmbed = !!this.props.location.query.embed;

        _debug('Render App: ', this.props.notifications.toJS(), this.props.routes, this.props.routes[this.props.routes.length - 1]);
        _debug('Contact us state: ', this.props.contactUs);

        if (this.props.routes[this.props.routes.length - 1].name === 'notfound') {
            _debug('here render notfound');

            return (
                <div className="main-wrap">
                    <NotFoundPage {...this.props} />
                </div>
            );
        } else {
            return (
                <div className="main-wrap">
                    <Helmet
                        titleTemplate="%s – ICOS ID"
                        defaultTitle=""
                        meta={[{
                            name: 'description',
                            content: 'A React.js Boilerplate application'
                        }]}
                    />
                    <Notifications notifications={this.props.notifications.toJS()} dispatch={this.props.dispatch} />
                    <HeaderContainer {...this.props} />

                    {
                        isLoggedIn
                        ? (
                            <div>
                                {React.Children.toArray(this.props.children)}

                                {
                                    isEmbed ? null : (
                                        <Footer dispatch={this.props.dispatch} userData={this.props.userData} locale={this.props.locale} />
                                    )
                                }
                            </div>
                        )
                        : (
                            <div className="main-page-wrapper">
                                <div className="section__bg">
                                    {React.Children.toArray(this.props.children)}

                                    {
                                        isEmbed ? null : (
                                            <Footer dispatch={this.props.dispatch} userData={this.props.userData} locale={this.props.locale} />
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }

                    <ModalCommon
                        showModal={this.props.contactUs.get('isOpened')}
                        onHide={() => this.props.dispatch(closeContactUs())}
                        className="modal-security"
                    >
                        <ContactUsForm
                            dispatch={this.props.dispatch}
                            submitContactForm={this.props.submitContactForm}
                            isLoading={this.props.contactUs.get('isLoading')}
                            formErrors={this.props.contactUs.get('formErrors')}
                        />
                    </ModalCommon>
                </div>
            );
        }
    }
}

App.propTypes = {
    children: React.PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
    userData: makeSelectUserData(),
    notifications: makeSelectNotifications(),
    locale: makeSelectLocale(),
    contactUs: makeSelectContactUs(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,

        onBeforeAppMount: () => {
            // Обнуляем некоторые поля для юзера после рефреша
            dispatch(resetDefaults());

            dispatch(loadUser());
        },
        submitContactForm: (data) => {
            dispatch(sendContactUs(data));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withProgressBar(injectIntl(App)));
