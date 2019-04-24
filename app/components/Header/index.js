/**
*
* Header
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';
import { connect } from 'react-redux';
import {
    Dropdown,
    MenuItem,
} from 'react-bootstrap';

import GlobalLink from 'components/GlobalLink';
import { push } from 'react-router-redux';
import SignOut from 'components/SignOut';
import _ from 'lodash';
import { Modal } from 'react-bootstrap';
import LocaleSwitch from 'components/LocaleSwitch';

const profileUrls = [
    '/account',
    '/password',
    '/security',
    '/verification',
];

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            isMobileNavOpen: false
        };
    }

    componentWillUpdate(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.setState({
                isMobileNavOpen: false
            });
        }
    }

    renderVerificationStatus() {
        const verificationTier = this.props.userData.get('VerificationTier');
        const verificationStatus = this.props.userData.get('VerificationStatus');
        const porStatus = this.props.userData.get('PorStatus');

        if (verificationTier === 1) {
            // Получен 1 тир
            if (porStatus === 'in_work' || porStatus === 'sent') {
                return (
                    <span className="header__nav__status__text text-warning">
                        <i className="header__nav__status__icon ico-clock"></i>
                            <span><FormattedMessage {...messages.tierVerificationProgress} values={{
                                num: 2
                            }}/></span>
                    </span>
                );
            } else {
                return (
                    <span className="header__nav__status__text text-aqua">
                        <i className="header__nav__status__icon ico-ok-round"></i>
                        <span><FormattedMessage {...messages.tierVerified} values={{
                            num: verificationTier
                        }}/></span>
                    </span>
                );
            }
        } else if (verificationTier === 2) {
            // Получен 2 тир, конечное состояние
            return (
                <span className="header__nav__status__text text-aqua">
                    <i className="header__nav__status__icon ico-ok-round"></i>
                    <span><FormattedMessage {...messages.tierVerified} values={{
                        num: verificationTier
                    }}/></span>
                </span>
            );
        } else {
            // Пока никакой тир не получен
            if (verificationStatus === 'in_progress') {
                return (
                    <span className="header__nav__status__text text-warning">
                        <i className="header__nav__status__icon ico-clock"></i>
                            <span><FormattedMessage {...messages.tierVerificationProgress} values={{
                                num: 1
                            }}/></span>
                    </span>
                );
            } else {
                return (
                    <GlobalLink
                        to="/verification"
                        className="unstyled"
                        dispatch={this.props.dispatch}
                    >
                        <span className="header__nav__status__text text-danger">
                            <i className="header__nav__status__icon ico-cancel-round"></i>
                            <span><FormattedMessage {...messages.unverified} /></span>
                        </span>
                    </GlobalLink>
                );
            }
        }
    }

    render() {
        let isLoggedIn = this.props.userData.get('authenticated');
        const isEmbed = !!this.props.location.query.embed;
        _debug('render header here: ', this.props.location);

        return (
            <div className={"content clearfix header__content" + (isEmbed ? ' hidden' : '')}>
                <div className="row header__content__wrap">
                    <div className="col-lg-11 col-md-10 col-sm-7 col-xs-3 text-right header__main__content-wrap">
                        <div
                            className="clearfix header__main-logo-wrap"
                        >
                            <div className="tablet-only">
                                <a
                                    className={
                                        'header__info__nav-mobile__btn navbar-toggle pull-left'
                                        + (this.state.isMobileNavOpen ? ' open' : '')
                                    }
                                    onClick={
                                        () => {
                                            this.setState({
                                                isMobileNavOpen: !this.state.isMobileNavOpen
                                            });
                                        }
                                    }
                                >
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </a>
                            </div>

                            {
                                isLoggedIn
                                    ? this.props.location.pathname === '/account'
                                        ? (
                                            <div className="desktop-only">
                                                <div
                                                    className="logo-wrap pull-left"
                                                >
                                                    <div className={"logo logo_img"}></div>
                                                </div>
                                            </div>
                                        )
                                        : (
                                            <div className="desktop-only">
                                                <GlobalLink
                                                    className="logo-wrap pull-left"
                                                    to="/account"
                                                    dispatch={this.props.dispatch}
                                                >
                                                    <div className={"logo logo_img"}></div>
                                                </GlobalLink>
                                            </div>
                                        )
                                    : this.props.location.pathname === '/'
                                        ? (
                                            <div className="desktop-only">
                                                <div
                                                    className="logo-wrap pull-left"
                                                >
                                                    <div className={"logo logo_img"}></div>
                                                </div>
                                            </div>
                                        )
                                        : (
                                            <div className="desktop-only">
                                                <GlobalLink
                                                    className="logo-wrap pull-left "
                                                    to="/"
                                                    dispatch={this.props.dispatch}
                                                >
                                                    <div className={"logo logo_img"}></div>
                                                </GlobalLink>
                                            </div>
                                        )
                            }

                        </div>

                        {
                            isLoggedIn ? null : (
                                <div className="w1200-only header__main-menu-wrap">
                                    <GlobalLink
                                        to="/buyers"
                                        dispatch={this.props.dispatch}
                                        className={
                                            "header__nav__link" +
                                            (this.props.router.isActive('/buyers') ? ' header__nav__link-active' : '')
                                        }
                                    >
                                        <FormattedMessage {...messages.forTokenBuyers} />
                                    </GlobalLink>
                                    <GlobalLink
                                        to="/icos"
                                        dispatch={this.props.dispatch}
                                        className={
                                            "header__nav__link" +
                                            (this.props.router.isActive('/icos') ? ' header__nav__link-active' : '')
                                        }
                                    >
                                        <FormattedMessage {...messages.forProspectiveIco} />
                                    </GlobalLink>
                                    <GlobalLink
                                        to="/about"
                                        dispatch={this.props.dispatch}
                                        className={
                                            "header__nav__link" +
                                            (this.props.router.isActive('/about') ? ' header__nav__link-active' : '')
                                        }
                                    >
                                        <FormattedMessage {...messages.aboutUs} />
                                    </GlobalLink>
                                    <GlobalLink
                                        to="/faq"
                                        dispatch={this.props.dispatch}
                                        className={
                                            "header__nav__link" +
                                            (this.props.router.isActive('/faq') ? ' header__nav__link-active' : '')
                                        }
                                    >
                                        <FormattedMessage {...messages.faq} />
                                    </GlobalLink>
                                </div>
                            )
                        }
                    </div>

                    <div className="col-lg-7 col-md-8 col-sm-8 col-xs-12 header__info">
                        {isLoggedIn
                            ? (
                                <div>
                                    <ul className="header__nav__list">
                                        <li
                                            className={'header__nav__item' + (this.props.location.pathname === '/account'
                                                ? ' active'
                                                : '')}
                                        >
                                            <Dropdown
                                                id="header-settings"
                                                className="header__nav__dropdown header__nav__dropdown_flex"
                                                pullRight={true}
                                                >
                                                <Dropdown.Toggle
                                                    useAnchor={true}
                                                    className="header__nav__item__link"
                                                    >
                                                    {this.props.userData.get('Email')}
                                                </Dropdown.Toggle>
                                                <div className="header__nav__status">
                                                    { this.renderVerificationStatus() }
                                                </div>
                                                <Dropdown.Menu
                                                    className="header__nav__dropdown__menu"
                                                >
                                                    <MenuItem
                                                        onClick={(evt) => {
                                                            evt.preventDefault();
                                                            this.props.dispatch(push('/account'));
                                                        }}
                                                        >
                                                        <FormattedMessage {...messages.account} />

                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={(evt) => {
                                                            evt.preventDefault();
                                                            this.props.dispatch(push('/password'));
                                                        }}
                                                        >
                                                        <FormattedMessage {...messages.pass} />
                                                    </MenuItem>

                                                    {(this.props.userData.get('VerificationStatus') !== 'unverified')
                                                        ? (
                                                            null
                                                        )
                                                        : (
                                                            <MenuItem
                                                                onClick={(evt) => {
                                                                    evt.preventDefault();
                                                                    this.props.dispatch(push('/verification'));
                                                                }}
                                                                >
                                                                <FormattedMessage {...messages.verification} />
                                                            </MenuItem>
                                                        )
                                                    }

                                                    <MenuItem
                                                        onClick={(evt) => {
                                                            evt.preventDefault();
                                                            this.props.dispatch(push('/security'));
                                                        }}
                                                        >
                                                        <FormattedMessage {...messages.security} />
                                                    </MenuItem>
                                                    <MenuItem
                                                        className="hidden"
                                                        onClick={(evt) => {
                                                            evt.preventDefault();
                                                            this.props.dispatch(push('/wallets'));
                                                        }}
                                                        >
                                                        <FormattedMessage {...messages.wallets} />
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={(evt) => {
                                                            evt.preventDefault();
                                                            this.props.dispatch(push('/faq'));
                                                        }}
                                                        >
                                                        <FormattedMessage {...messages.faq} />
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={(evt) => {
                                                            evt.preventDefault();
                                                            this.props.dispatch(push('/about'));
                                                        }}
                                                        >
                                                        <FormattedMessage {...messages.aboutUs} />
                                                    </MenuItem>
                                                    <MenuItem divider />
                                                    <MenuItem
                                                        className="header__signout-wrap"
                                                        >
                                                        <SignOut
                                                            globalLoadings={this.props.globalLoadings}
                                                            dispatch={this.props.dispatch}
                                                            type={'text'}
                                                        />
                                                    </MenuItem>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>
                                    </ul>

                                    <div className="header__locale header__login__action">
                                        <LocaleSwitch
                                            display={true}
                                            pullRight={true}
                                            dropup={false}
                                            dispatch={this.props.dispatch}
                                            locale={this.props.locale}
                                            />
                                    </div>
                                </div>
                            )
                            : (
                                <div
                                    className={'header__login'}
                                >
                                    <GlobalLink
                                        to={"/signup"}
                                        dispatch={this.props.dispatch}
                                        className="header__login__action"
                                        >
                                        <FormattedMessage {...messages.signup} />
                                    </GlobalLink>
                                    <GlobalLink
                                        to={"/signin"}
                                        dispatch={this.props.dispatch}
                                        className="btn btn_slim btn_white-transparent header__login__action"
                                    >
                                        <FormattedMessage {...messages.signin} />
                                    </GlobalLink>

                                    <div className="header__locale header__login__action non-mobile-only">
                                        <LocaleSwitch
                                            display={true}
                                            pullRight={true}
                                            dropup={false}
                                            dispatch={this.props.dispatch}
                                            locale={this.props.locale}
                                            />
                                    </div>
                                </div>
                            )}
                    </div>
                </div>

                <Modal
                    show={this.state.isMobileNavOpen}
                    onHide={
                        () => {
                            this.setState({
                                isMobileNavOpen: false
                            });
                        }
                    }
                    className="modal_menu"
                >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <div>
                            {
                                isLoggedIn ? (
                                    <ul className="nav-mobile__list js-nav-list">
                                        <li className="nav-mobile__list__item nav-mobile__list__item__verification">
                                            { this.renderVerificationStatus() }
                                        </li>

                                        <hr />

                                        <li className="nav-mobile__list__item">
                                            <GlobalLink to="/account" dispatch={this.props.dispatch}><FormattedMessage {...messages.account} /></GlobalLink>
                                        </li>

                                        {(this.props.userData.get('VerificationTier') === 2)
                                            ? (
                                                null
                                            )
                                            : (
                                                <li className="nav-mobile__list__item">
                                                    <GlobalLink
                                                        to="/verification"
                                                        dispatch={this.props.dispatch}
                                                    ><FormattedMessage {...messages.verification} /></GlobalLink>
                                                </li>
                                            )
                                        }

                                        <li className="nav-mobile__list__item">
                                            <GlobalLink to="/password" dispatch={this.props.dispatch}><FormattedMessage {...messages.pass} /></GlobalLink>
                                        </li>
                                        <li className="nav-mobile__list__item">
                                            <GlobalLink to="/security" dispatch={this.props.dispatch}><FormattedMessage {...messages.security} /></GlobalLink>
                                        </li>
                                        <li className="nav-mobile__list__item hidden">
                                            <GlobalLink to="/wallets" dispatch={this.props.dispatch}><FormattedMessage {...messages.wallets} /></GlobalLink>
                                        </li>
                                        <li className="nav-mobile__list__item">
                                            <GlobalLink to="/faq" dispatch={this.props.dispatch}><FormattedMessage {...messages.faq} /></GlobalLink>
                                        </li>
                                        <li className="nav-mobile__list__item">
                                            <GlobalLink to="/about" dispatch={this.props.dispatch}><FormattedMessage {...messages.aboutUs} /></GlobalLink>
                                        </li>
                                        <li className="nav-mobile__list__item">
                                            <GlobalLink to="/buyers" dispatch={this.props.dispatch}><FormattedMessage {...messages.forTokenBuyers} /></GlobalLink>
                                        </li>
                                        <li className="nav-mobile__list__item">
                                            <GlobalLink to="/icos" dispatch={this.props.dispatch}><FormattedMessage {...messages.forProspectiveIco} /></GlobalLink>
                                        </li>
                                        <li className="nav-mobile__list__item">
                                            <GlobalLink to="/account-privacy" dispatch={this.props.dispatch}><FormattedMessage {...messages.accountPrivacy} /></GlobalLink>
                                        </li>
                                        <hr/>
                                        <li className="nav-mobile__list__item">
                                            <SignOut
                                                globalLoadings={this.props.globalLoadings}
                                                dispatch={this.props.dispatch}
                                                type={'text'}
                                            />
                                        </li>
                                    </ul>
                                ) : (
                                    <ul className="nav-mobile__list js-nav-list">
                                        <li className="nav-mobile__list__logo">
                                            <div className={"logo logo_img"}></div>
                                        </li>
                                        <li className="nav-mobile__list__item">
                                            <GlobalLink to="/faq" dispatch={this.props.dispatch}><FormattedMessage {...messages.faq} /></GlobalLink>
                                        </li>
                                        <li className="nav-mobile__list__item">
                                            <GlobalLink to="/about" dispatch={this.props.dispatch}><FormattedMessage {...messages.aboutUs} /></GlobalLink>
                                        </li>
                                        <li className="nav-mobile__list__item">
                                            <GlobalLink to="/buyers" dispatch={this.props.dispatch}><FormattedMessage {...messages.forTokenBuyers} /></GlobalLink>
                                        </li>
                                        <li className="nav-mobile__list__item">
                                            <GlobalLink to="/icos" dispatch={this.props.dispatch}><FormattedMessage {...messages.forProspectiveIco} /></GlobalLink>
                                        </li>
                                        <hr className="mobile-only"/>
                                        <li className="mobile-only nav-mobile__list__locale">
                                            <LocaleSwitch
                                                display={true}
                                                pullRight={false}
                                                dropup={false}
                                                theme={'lite'}
                                                dispatch={this.props.dispatch}
                                                locale={this.props.locale}
                                                />
                                        </li>
                                    </ul>
                                )
                            }

                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

Header.propTypes = {

};

export default injectIntl(Header);
