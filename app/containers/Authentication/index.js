/*
 *
 * Authentication
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserData, makeSelectUserTokens } from 'core/containers/App/selectors';
import ProfileWithSidebar from 'components/ProfileWithSidebar';
import _ from 'lodash';

import {
    sendConsent,
    consentCheck
} from 'core/containers/App/actions';

import {
    changeRedirectUrl,
} from 'core/containers/SigninPage/actions';

const privatePageList = [
    'scopesPage',
    'securityPage',
    'accountPage',
    'passwordPage',
    'verificationPage',
    'verificationNetkiPage',
    'depositsPage',
    'verificationDataPage',
    'verificationPage',
    'accountPrivacyPage',
];
const authPages = [
    'mainPage',
    'signinPage',
    'signupPage',
    'passwordResetPage',
    'emailConfirmPage',
];

const polymorphPages = [
    'tosPage',
    'privacypolicyPage',
    'cookiepolicyPage',
    'buyersPage',
    'icosPage',
    'faqPage',
    'faqDetailPage',
    'aboutPage',
    'testPage',
];

import {
    makeSelectConsent
} from 'core/containers/App/selectors';

let redirectUrl = '/account';

function WithAuth(ComposedComponent) {
    class Authentication extends React.Component { // eslint-disable-line react/prefer-stateless-function
        constructor(props) {
            super(props);

            this.state = {
                canRender: true
            };
        }

        static contextTypes = {
            router: PropTypes.object
        }

        checkRoutes() {
            if (this.props.userData.get('authenticated')) {
                // this.props.dispatch(consentCheck(this.props.consent));

                _debug('AUTH CHECK!!!: ', this.props.consent);
                // После реги или логина с consent отправляем пользователя на /scopes
                if (this.props.consent && !_.includes(polymorphPages, this.props.route.name)) {
                    if (this.props.route.path === '/scopes') {
                        return;
                    } else {
                        this.setState({ canRender: false });
                        this.props.router.push('/scopes');
                    }
                } else {
                    if (this.props.route.path === '/scopes') {
                        this.props.router.push(redirectUrl);
                    }
                }

                // Защита от бесконечных переадресаций
                if (this.props.route.path === redirectUrl) {
                    return;
                }

                // if (this.props.route.path === '/signin' && this.props.consent) {
                //     this.props.dispatch(sendConsent(this.props.consent));
                //     this.setState({ canRender: false });
                //     return;
                // }

                if (_.includes(authPages, this.props.route.name)) {
                    this.setState({ canRender: false });
                    this.props.router.push(redirectUrl);
                }
            } else {
                if (_.includes(privatePageList, this.props.route.name)) {
                    // Защита от бесконечных переадресаций
                    if (this.props.route.path === '/') {
                        return;
                    }

                    this.setState({ canRender: false });
                    redirectUrl = this.props.route.path;
                    this.props.dispatch(changeRedirectUrl(this.props.route.path));
                    this.props.router.push('/');
                }
            }
        }

        componentWillMount() {
            _debug('Auth componentWillMount!!!: ', this.props.userData.get('authenticated'), this.props, this.props.route.name, this.props.userData.get('is_email_confirmed'), this.props.userData.get('authenticated'));
            return this.checkRoutes();
        }

        componentWillUpdate(nextProps) {
            _debug('Auth componentWillUpdate: ', nextProps);
        }

        componentWillUnmount() {
            _debug('componentWillUnmount: ', this.props.userData.get('authenticated'));
        }
        renderRaw() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
        renderPolymorph() {
            const isLoggedIn = this.props.userData.get('authenticated');
            if (isLoggedIn) {
                return (
                    <ProfileWithSidebar
                        userData={this.props.userData}
                        router={this.props.router}
                        location={this.props.location}
                    >
                        <div className="profile__section faq-page__content">
                            <ComposedComponent {...this.props} />
                        </div>
                    </ProfileWithSidebar>
                );
            } else {
                return (
                    <div className="content main__container faq-page">
                        <div className="profile__section faq-page__content">
                            <ComposedComponent {...this.props} />
                        </div>
                    </div>
                );
            }
        }
        render() {
            if (this.state.canRender) {
                return _.includes(polymorphPages, this.props.route.name) ? this.renderPolymorph() : this.renderRaw();
            } else {
                return null;
            }
        }
    }

    Authentication.propTypes = {
        dispatch: PropTypes.func.isRequired,
        router: PropTypes.object
    };

    const mapStateToProps = createStructuredSelector({
        userData: makeSelectUserData(),
        userTokens: makeSelectUserTokens(),
        consent: makeSelectConsent(),
    });

    function mapDispatchToProps(dispatch) {
        return {
            dispatch,
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}

export default WithAuth;
