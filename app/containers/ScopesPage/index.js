/*
 *
 * ScopesPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { parse } from 'query-string';

import makeSelectScopesPage from 'core/containers/ScopesPage/selectors';
import ModalCommon from 'components/ModalCommon';

import messages from './messages';

import {
    // sendConsent,
    consentCheck,
    consentCheckReset,
    consentCheckResetScopes,
} from 'core/containers/App/actions';

import {
    makeSelectConsent,
    makeSelectConsentInfo
} from 'core/containers/App/selectors';

import {
    sendConsent,
    sendConsentReject,
} from 'core/containers/ScopesPage/actions';

export class ScopesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            consentModalOpen: true,
        };
    }

    componentDidMount() {
        let isLoggedIn = this.props.userData.get('authenticated');

        if (isLoggedIn) {
            this.props.dispatch(consentCheckReset());
            this.props.dispatch(consentCheck(this.props.consent));
        }
    }

    componentWillReceiveProps(nextProps) {

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

    render() {
        const redirectUrl = this.props.consentInfo.get('redirectUrl') || '';
        const redirectUrlArr = redirectUrl.split('/');
        const parsedRedirectData = parse(redirectUrlArr[redirectUrlArr.length - 1]);
        const parsedRedirectDataUrl = parsedRedirectData.redirect_uri || '';
        const domainString = parsedRedirectDataUrl.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im);
        const appDomain = domainString ? domainString[1] : '';

        const appName = this.props.consentInfo.get('Name') ? this.props.consentInfo.get('Name') : appDomain;

        return (
            <div className="content content_slim main__container">
                <div className="main__column main__column-single modal__ii">
                    <div className="modal__ii-approve-placeholder">

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
                    <div className={"" + (this.props.ScopesPage.isFormLoading ? ' block-loading light' : '')}>
                        <div
                            className={
                                "modal__ii-approve text-center"
                                + (this.props.ScopesPage.isFormShowing ? '' : ' hidden')
                            }
                            >
                            <div className="modal__ii-approve__logo">
                                <div className="logo-ii"></div>
                            </div>

                            <div className="modal__ii-approve__text">
                                <FormattedMessage
                                    {...messages.consent_modal_text}
                                    values={{
                                        company: <b>{appName}</b>
                                    }}
                                />
                            </div>

                            <div className="modal__ii-approve__action">
                                <button
                                    onClick={() => {
                                        _debug('consent modal confirm');

                                        this.props.dispatch(sendConsent(this.props.consent, this.props.consentInfo.get('requestedScopes').toJS()));
                                        // this.props.dispatch(sendConsent(this.testConsent, 'wrongglobals'));
                                        setTimeout(() => {
                                            this.props.dispatch(consentCheckResetScopes());
                                        });
                                    }}
                                    className="btn btn_aqua btn_uppercase btn_ultrawide btn_small"
                                    >
                                    <FormattedMessage
                                        {...messages.consent_modal_confirm}
                                    />
                                </button>
                            </div>

                            <div className="modal__ii-approve__action">
                                <a
                                    href="#"
                                    className="modal__ii-approve__secondary"
                                    onClick={(e) => {
                                        _debug('consent modal cancel');
                                        e.preventDefault();

                                        this.props.dispatch(sendConsentReject(this.props.consent, 'reject'));
                                        setTimeout(() => {
                                            this.props.dispatch(consentCheckReset());
                                        });
                                    }}
                                    >
                                    <FormattedMessage
                                        {...messages.consent_modal_cancel}
                                    />
                                </a>
                            </div>

                            <div>
                                <a target="_blank" href="/tos" className="modal__ii-approve__link">Terms of Service</a>
                                <a target="_blank" href="/privacypolicy" className="modal__ii-approve__link">Privacy policy</a>
                                <a target="_blank" href="/cookiepolicy" className="modal__ii-approve__link">Cookie policy</a>
                            </div>
                        </div>
                    </div>
                </ModalCommon>
            </div>
        );
    }
}

ScopesPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    ScopesPage: makeSelectScopesPage(),
    consent: makeSelectConsent(),
    consentInfo: makeSelectConsentInfo(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScopesPage);
