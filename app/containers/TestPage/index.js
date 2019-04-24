/*
 *
 * TestPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectTestPage from 'core/containers/TestPage/selectors';
import messages from './messages';

import * as Cookies from 'js-cookie';

import SigninForm from 'components/SigninForm';

import {
    // sendConsent,
    consentCheck,
    consentCheckReset,
} from 'core/containers/App/actions';

import {
    makeSelectConsent,
    makeSelectConsentInfo
} from 'core/containers/App/selectors';

import {
    sendConsent,

    changeUsername,
    changePassword,
    changeGaCode,

    loginUser,
    submitGACode,

    needGA,
} from 'core/containers/TestPage/actions';

import ModalConfirm from 'components/ModalConfirm';
import ModalCommon from 'components/ModalCommon';

const canRender = process.env.CONFIG.needConsole;

export class TestPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            consentModalOpen: false,
        };

        let isLoggedIn = this.props.userData.get('authenticated');

        if (!isLoggedIn) {
            Cookies.set('testConsent', this.props.consent);
        } else {
            this.testConsent = Cookies.get('testConsent');
        }

        _debug('Test consent: ', isLoggedIn, this.testConsent);
    }

    openConsentModal() {
        this.setState({
            consentModalOpen: true,
        });
    }

    closeConsentModal() {
        this.setState({
            consentModalOpen: false,
        });
    }

    componentDidMount() {
        // this.props.dispatch(consentCheck(this.props.consent));
        this.props.dispatch(consentCheckReset());
        this.props.dispatch(consentCheck(this.testConsent));
    }

    componentWillReceiveProps(nextProps) {
        let isLoggedIn = this.props.userData.get('authenticated');
        // _debug('test next props: ', nextProps, nextProps.consentInfo, isLoggedIn);
        //
        // if (nextProps.consentInfo && isLoggedIn) {
        //     this.openConsentModal();
        // }
    }

    render() {
        if (canRender) {
            return (
                <div className="content content_slim main__container">
                    <div className="main__column main__column-single">
                        <div className="main__column__text">
                            <h1 className="main__title"
                                onClick={
                                    () => {
                                        this.openConsentModal();
                                    }
                                }
                                ><FormattedMessage {...messages.header} /></h1>

                            <SigninForm
                                {... this.props}
                                SigninPage={this.props.TestPage}
                                />
                        </div>
                    </div>

                    <ModalCommon
                        showModal={this.state.consentModalOpen}
                        backdrop={'static'}
                        hideClose={true}
                        hideHeader={true}
                        onHide={() => this.closeConsentModal()}
                        className="modal-medium"
                        cancelText="Cancel"
                        confirmText="Continue"
                    >
                        <div className={"modal__ii-approve text-center" + (this.props.TestPage.isFormLoading ? ' block-loading light' : '')}>
                            <div className="modal__ii-approve__logo">
                                <div className="logo-ii"></div>
                            </div>

                            <div className="modal__ii-approve__text">
                                <b>ICOS ID</b> will receive your information: Date of birth, Email, KYC status
                            </div>

                            <div className="modal__ii-approve__action">
                                <button
                                    onClick={() => {
                                        _debug('consent modal confirm');

                                        this.props.dispatch(sendConsent(this.testConsent, this.props.consentInfo.requestedScopes));
                                        // this.props.dispatch(sendConsent(this.testConsent, 'wrongglobals'));
                                        setTimeout(() => {
                                            this.props.dispatch(consentCheckReset());
                                        });

                                        // this.closeConsentModal();
                                    }}
                                    className="btn btn_aqua btn_uppercase btn_ultrawide btn_small"
                                    >
                                    authorize
                                </button>
                            </div>

                            <div className="">
                                <a
                                    href="#"
                                    className="modal__ii-approve__secondary"
                                    onClick={(e) => {
                                        _debug('consent modal cancel');
                                        e.preventDefault();

                                        this.closeConsentModal();
                                    }}
                                    >
                                    Cancel
                                </a>
                            </div>
                        </div>
                    </ModalCommon>
                </div>
            );
        } else {
            return null;
        }
    }
}

TestPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    TestPage: makeSelectTestPage(),
    consent: makeSelectConsent(),
    consentInfo: makeSelectConsentInfo(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,

        onChangeSigninUsername: (evt) => dispatch(changeUsername(evt.target.value)),
        onChangeSigninPassword: (evt) => dispatch(changePassword(evt.target.value)),
        onChangeSigninGaCode: (evt) => dispatch(changeGaCode(evt.target.value)),

        onSubmitSigninForm: (email, password, captcha, consent) => dispatch(loginUser(email, password, captcha, consent)),
        onSubmitGACode: (code, consent) => dispatch(submitGACode(code, consent)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
