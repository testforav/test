/*
 *
 * VerificationPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import { detect } from 'detect-browser';

import { checkCameraStatus } from 'utils/helpers';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';

import VerificationPersonalInfoScreen from 'components/verification/VerificationPersonalInfoScreen';
import VerificationAddressesScreen from 'components/verification/VerificationAddressesScreen';

import ProfileWithSidebar from 'components/ProfileWithSidebar';
import ModalCommon from 'components/ModalCommon';
import TooltipBlock from 'components/TooltipBlock';
import SvgIcon from 'components/SvgIcon';

import Button from 'components/basic/Button';

import { showNotification } from 'core/containers/App/actions';

import makeSelectVerificationPage from 'core/containers/VerificationPage/selectors';

import {
    changeFieldAction,
    setDefaultAction,
    saveAction,
    checkAction,
    initAction,
} from 'core/containers/VerificationPage/actions';

export class VerificationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        const tier = props.userData.get('VerificationTier');
        this.state = {
            currentScreen: tier ? 'addresses' : 'personalInfo',
            sumsubInited: false,
            badges: {
                personalInfo: {
                    isActive: tier === 0,
                    isPassed: tier > 0,
                },
                addresses: {
                    isActive: tier === 1,
                    isPassed: tier > 1,
                },
                documents: {
                    isActive: false,
                    isPassed: false,
                },
            },
        };
    }
    componentWillMount() {
        this.props.dispatch(initAction(true));
        this.timer = setInterval(() => {
            this.props.dispatch(initAction(false));
        }, 10 * 60 * 1000);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.VerificationPage.sumsubToken && (nextProps.VerificationPage.sumsubTokenUpdatedAt !== this.props.VerificationPage.sumsubTokenUpdatedAt)) {
            if (!this.state.sumsubInited) {
                clearInterval(this.timer);
                this.setState({
                    sumsubInited: true,
                });
                Telegram.Passport.createAuthButton('telegram_passport_auth', {
                    bot_id:       669660896, // or 691314081 for production
                    scope:        ['id_document', 'id_selfie', 'utility_bill', 'phone_number', 'email'],
                    public_key:   '-----BEGIN PUBLIC KEY-----\n' +
                    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz4BVYGm1jd+ow5NWkIJM\n' +
                    '3C1kvob5KBFHgqL+PQvATSrUkCDsod9cuL7gWOUez5l6yld7xkspXPcv5SwdJJ8v\n' +
                    '1vPbdDazrEb+pMExbE1d1AFyEDLxOgeJ4O2FM2RsxEoVhaV9UnNKFMugru54EKmI\n' +
                    'IUREG67UL+2dvk4HPWIh/tkjz++pQVO0fM/bw0Cx2qBIpofZiP/dvYADDG4UDIvu\n' +
                    'OxWkwp5+2rzB4kkV1BaDANVu0A8N3dE4Mdu5NvFKlyz0Vp0BRgH9Gc8FphjAZHNV\n' +
                    'wmJodKL+R9xAjmE/nTaTCxoan15Q2j4IZvGdBPhCq9eK+BNxhuJK0mgO+KCQvCJp\n' +
                    'lwIDAQAB\n' +
                    '-----END PUBLIC KEY-----',
                    payload: nextProps.VerificationPage.sumsubToken, // <-- put here the token generated on your backend
                    // callback_url: 'https://example.com/callback/' // after authorization a user will be redirected here
                }, {
                    text: 'KYC Check via Telegram Passport' // custom text
                });
                idensic.init(
                    // selector of an iframe container (see above)
                    '#idensic',
                    // configuration object (see preparation steps)
                    {
                        accessToken: nextProps.VerificationPage.sumsubToken,
                        applicantId: nextProps.VerificationPage.sumsubApplicantId,
                    },
                    // function for the ifram callbacks
                    (messageType, payload) => {
                        // just logging the incoming messages
                        _debug('[IDENSIC DEMO] Idensic message:', messageType, payload);
                        if (messageType === 'idCheck.stepCompleted') {
                            if (payload.step === 'PROOF_OF_RESIDENCE') {
                                _debug('[IDENSIC DEMO] Idensic message: going to save!');
                                this.props.dispatch(checkAction());
                            }
                        }
                    }
                );
            }

            // this.checkWebcam();
            this.goForward('addresses', 'personalInfo');
            this.goForward('documents', 'addresses');
        }
        if ((nextProps.VerificationPage.KycStatus !== this.props.VerificationPage.KycStatus) || (nextProps.VerificationPage.PorStatus !== this.props.VerificationPage.PorStatus)) {
            const iframe = document.getElementsByTagName('iframe');
            if (iframe.length) {
                iframe[0].src = iframe[0].src + '';
            }
        }
    }
    componentWillUnmount() {
        this.clearOnfido();
        clearTimeout(this.currentChecker);
        clearInterval(this.timer);
    }
    clearOnfido() {
        if (this.onfidoHandler) {
            this.onfidoHandler.tearDown();
        }
    }
    changeField(evt) {
        const key = evt.target.name;
        const value = evt.target.value;
        _debug('change field (component): ', key, value);
        this.props.dispatch(changeFieldAction(key, value));
    }

    save(data) {
        this.props.dispatch(
            saveAction({
                ...this.props.VerificationPage.data,
                ...data,
            })
        );
    }
    goForward(toScreen, fromScreen) {
        const badges = this.state.badges;

        badges[fromScreen].isPassed = true;
        badges[fromScreen].isActive = false;
        badges[toScreen].isActive = true;

        this.setState({
            currentScreen: toScreen,
            badges: badges,
        });
    }
    goBack(toScreen, fromScreen) {
        const badges = this.state.badges;

        badges[toScreen].isPassed = false;
        badges[toScreen].isActive = true;
        badges[fromScreen].isActive = false;

        this.setState({
            currentScreen: toScreen,
            badges: badges,
        });
    }
    checkWebcam() {
        checkCameraStatus(
            () => {

            },
            () => {
                this.setState({
                    webcamError: true,
                });
                if (!this.state.tooltipClosed) {
                    this.currentChecker = setTimeout(() => {
                        this.checkWebcam();
                    }, 5000);
                }
            },
            () => {
                this.setState({
                    browserError: true,
                });
            }
        );
    }
    getWebcamHelpLink() {
        const browser = detect();
        switch (browser && browser.name) {
            case 'chrome':
                return 'https://support.google.com/chrome/answer/2693767?hl=en';
            case 'firefox':
                return 'https://support.mozilla.org/kb/how-do-i-manage-website-permissions';
            case 'edge':
                return 'https://support.microsoft.com/en-ph/help/17479/windows-internet-explorer-11-change-security-privacy-settings';
            case 'safari':
                return 'https://support.apple.com/guide/safari/websites-preferences-ibrwe2159f50/mac';
            case 'opera':
                return 'http://www.opera.com/help/tutorials/security/control/';
            default:
                return 'https://support.microsoft.com/en-ph/help/17479/windows-internet-explorer-11-change-security-privacy-settings';
        }
    }
    shouldStepsShow() {
        return this.props.VerificationPage.sumsubApplicantId || ((this.props.userData.get('PorStatus') !== 'in_work') && (this.props.userData.get('VerificationStatus') !== 'in_progress'))
    }
    render() {
        const tier = this.props.userData.get('VerificationTier');

        return (
            <ProfileWithSidebar
                userData={this.props.userData}
                router={this.props.router}
                location={this.props.location}
            >
                <Helmet
                    title="Verification"
                    meta={[
                        { name: 'description', content: 'Safe Joint Between Your Cash and Crypto World' },
                    ]}
                />
                <div className={
                    "profile__section"
                    + (this.props.VerificationPage.isLoading ? ' block-loading' : '')
                }>
                    <h2 className="profile__section__header">
                        <FormattedMessage {...messages.header} />
                    </h2>
                    {(tier === 2)
                        ? (
                            <p className="form-group form-group_section text-secondary">
                                <FormattedMessage {...messages.successMessage} />
                            </p>
                        ) : (
                            (this.shouldStepsShow()) ? (
                                <div>
                                    <p className="form-group form-group_section text-secondary">
                                        <FormattedMessage {...messages.unverifiedMessage} />
                                    </p>

                                    <div className="non-mobile-only">
                                        <div className="verification__guide verification__guide-warning">
                                            <SvgIcon name="warning" />
                                            <FormattedMessage {...messages.verificationWarning} />
                                        </div>
                                    </div>

                                    {
                                        (this.state.browserError || this.state.webcamError) ? (
                                            <TooltipBlock
                                                className="alert-warning"
                                                onClose={
                                                    () => {
                                                        this.setState({
                                                            browserError: false,
                                                            webcamError: false,
                                                            tooltipClosed: true,
                                                        });
                                                    }
                                                }
                                            >
                                                {
                                                    (this.state.browserError) ? (
                                                        <p>
                                                            {'Your browser doesn\'t support webcam usage'}
                                                        </p>
                                                    ) : (
                                                        <p>
                                                            { 'It seems your webcamera is disabled by the browser setting or isn\'t connected.' } <br />
                                                            { 'Check the connection and use this guide to fix an error with permissions:' } <br />
                                                            <a className="unstyled" target="_blank" href={this.getWebcamHelpLink()}>
                                                                {this.getWebcamHelpLink()}
                                                            </a>
                                                        </p>
                                                    )
                                                }
                                            </TooltipBlock>
                                        ) : null
                                    }

                                    <div className="verification__badges">

                                        <div className={
                                            "verification__badge"
                                            + (this.state.badges.personalInfo.isActive ? ' verification__badge-active' : '')
                                            + (this.state.badges.personalInfo.isPassed ? ' verification__badge-passed' : '')
                                        }>
                                            <div className="non-mobile-only">
                                                <b>1. <FormattedMessage {...messages.personalInfoTitle} /></b>
                                            </div>
                                            <div className="mobile-only">
                                                <b><FormattedMessage {...messages.personalInfoTitle} /></b>
                                            </div>
                                        </div>

                                        <div className={
                                            "verification__badge"
                                            + (this.state.badges.addresses.isActive ? ' verification__badge-active' : '')
                                            + (this.state.badges.addresses.isPassed ? ' verification__badge-passed' : '')
                                        }>
                                            <div className="non-mobile-only">
                                                <b>2. <FormattedMessage {...messages.addressTitle} /></b>
                                            </div>
                                            <div className="mobile-only">
                                                <b><FormattedMessage {...messages.addressTitle} /></b>
                                            </div>
                                        </div>

                                        <div className={
                                            "verification__badge"
                                            + (this.state.badges.documents.isActive ? ' verification__badge-active' : '')
                                            + (this.state.badges.documents.isPassed ? ' verification__badge-passed' : '')
                                        }>
                                            <div className="non-mobile-only">
                                                <b>3. <FormattedMessage {...messages.proofTitle} /></b>
                                            </div>
                                            <div className="mobile-only">
                                                <b><FormattedMessage {...messages.proofTitle} /></b>
                                            </div>
                                        </div>

                                    </div>

                                    <div>
                                        <div
                                            className={(this.state.currentScreen === 'personalInfo') ? '' : 'hidden'}
                                        >
                                            <VerificationPersonalInfoScreen
                                                getFormState={state => state.get('form')}
                                                {... this.props}
                                                onSubmit={
                                                    (data) => {
                                                        Object.keys(data).forEach((key) => {
                                                            this.props.dispatch(changeFieldAction(key, data[key]));
                                                        });
                                                        this.goForward('addresses', 'personalInfo');
                                                    }
                                                }
                                                initialValues={
                                                    {
                                                        FirstName: this.props.VerificationPage.data.FirstName ? this.props.VerificationPage.data.FirstName : this.props.userData.get('FirstName'),
                                                        MiddleName: this.props.VerificationPage.data.MiddleName ? this.props.VerificationPage.data.MiddleName : this.props.userData.get('MiddleName'),
                                                        LastName: this.props.VerificationPage.data.LastName ? this.props.VerificationPage.data.LastName : this.props.userData.get('LastName'),
                                                        Phone: this.props.VerificationPage.data.Phone ? this.props.VerificationPage.data.Phone : this.props.userData.get('Phone'),
                                                        Gender: this.props.VerificationPage.data.Gender ? this.props.VerificationPage.data.Gender : this.props.userData.get('Gender'),
                                                        DocumentNumber: this.props.VerificationPage.data.DocumentNumber ? this.props.VerificationPage.data.DocumentNumber : this.props.userData.get('DocumentNumber'),
                                                        Dob: this.props.VerificationPage.data.Dob ? this.props.VerificationPage.data.Dob : this.props.userData.get('Dob'),
                                                        Citizenship: this.props.VerificationPage.data.Citizenship ? this.props.VerificationPage.data.Citizenship : this.props.userData.get('Citizenship'),
                                                        DocumentCountry: this.props.VerificationPage.data.DocumentCountry ? this.props.VerificationPage.data.DocumentCountry : '',
                                                        DocumentType: this.props.VerificationPage.data.DocumentType ? this.props.VerificationPage.data.DocumentType : '',
                                                    }
                                                }
                                                messages={messages}
                                            />
                                        </div>

                                        <div
                                            className={(this.state.currentScreen === 'addresses') ? '' : 'hidden'}
                                        >
                                            <VerificationAddressesScreen
                                                getFormState={state => state.get('form')}
                                                {... this.props}
                                                onSubmit={
                                                    (data) => {
                                                        Object.keys(data).forEach((key) => {
                                                            this.props.dispatch(changeFieldAction(key, data[key]));
                                                        });
                                                        this.save(data);
                                                    }
                                                }
                                                initialValues={
                                                    {
                                                        Address: this.props.VerificationPage.data.Address ? this.props.VerificationPage.data.Address : this.props.userData.get('Address'),
                                                        Country: this.props.VerificationPage.data.Country ? this.props.VerificationPage.data.Country : this.props.userData.get('Country'),
                                                        State: this.props.VerificationPage.data.State ? this.props.VerificationPage.data.State : this.props.userData.get('State'),
                                                        City: this.props.VerificationPage.data.City ? this.props.VerificationPage.data.City : this.props.userData.get('City'),
                                                    }
                                                }
                                                messages={messages}
                                                goBack={
                                                    (evt) => {
                                                        evt.preventDefault();
                                                        this.goBack('personalInfo', 'addresses');
                                                    }
                                                }
                                            />
                                        </div>

                                        <div
                                            className={(this.state.currentScreen === 'documents') ? '' : 'hidden'}
                                        >

                                            <div className="non-mobile-only">
                                                <div className="verification__guide row text-center text-secondary">
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                        <img src="/static/images/common/verification/ic_2.svg" className="verification__guide__img" /> <br />
                                                        <FormattedMessage {...messages.docPhoto} />
                                                    </div>
                                                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                                        <img src="/static/images/common/verification/ic_3.svg" className="verification__guide__img" /> <br />
                                                        <FormattedMessage {...messages.docSelfieWithDoc} />
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                        <img src="/static/images/common/verification/ic_1.svg" className="verification__guide__img" /> <br />
                                                        <FormattedMessage {...messages.docBill} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="telegram_passport_auth"></div>

                                            <div id="idensic"></div>

                                            <div className={
                                                "text-center" +
                                                (((this.props.userData.get('PorStatus') === 'in_work') || (this.props.userData.get('VerificationStatus') === 'in_progress')) ? ' hidden' : '')
                                            }>
                                                <Button
                                                    uppercase
                                                    bold
                                                    whiteTransparent
                                                    formSubmit
                                                    wide
                                                    onClick={
                                                        (evt) => {
                                                            evt.preventDefault();
                                                            this.goBack('addresses', 'documents');
                                                        }
                                                    }
                                                    className="verification__back__button"
                                                    noForm
                                                >
                                                    <i className="ico-left-open"></i> <FormattedMessage {...messages.backButton} />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                <p className="form-group form-group_section text-secondary">
                                    <FormattedMessage {...messages.waitingMessage} /> <br />
                                    <FormattedMessage {...messages.waitingSubmessage} /> {' '}
                                    <a href="mailto:support@icosid.com" className="unstyled">
                                        <FormattedMessage {...messages.waitingSupport} />
                                    </a>
                                </p>
                            )


                        )
                    }

                </div>
            </ProfileWithSidebar>
        );
    }
}

VerificationPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    VerificationPage: makeSelectVerificationPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(VerificationPage));
