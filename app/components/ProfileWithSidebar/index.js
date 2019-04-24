/**
*
* ProfileWithSidebar
*
*/

import React from 'react';
// import styled from 'styled-components';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import messages from './messages';
import { Link } from 'react-router';

class ProfileWithSidebar extends React.Component { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {

    }

    componentWillUnmount() {

    }

    renderRegular() {
        return (
            <div className="profile__content">
                { this.props.children }
            </div>
        );
    }
    renderCustom() {
        return this.props.children;
    }

    render() {
        _debug('profile with sidebar render: ');

        return (
            <div className="content profile">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-0 sidebar-wrap">
                        <div className="sidebar js-profile-sidebar">
                            <ul className="sidebar__nav">
                                <li
                                    className={'sidebar__nav__item' + (this.props.router.isActive('/account')
                                        ? ' active'
                                        : '')}
                                >
                                    <Link to="/account"><FormattedMessage {...messages.account} /></Link>
                                </li>

                                {((this.props.userData.get('VerificationStatus') === 'verified') && (this.props.userData.get('PorStatus') === 'approved'))
                                    ? (
                                        null
                                    )
                                    : (
                                        <li
                                            className={'sidebar__nav__item' + (this.props.router.isActive('/verification') || this.props.router.isActive('/verification/netki')
                                                ? ' active'
                                                : '')}
                                        >
                                            <Link
                                                to="/verification"
                                            ><FormattedMessage {...messages.verification} /></Link>
                                        </li>
                                    )
                                }

                                <li
                                    className={'sidebar__nav__item' + (this.props.router.isActive('/password')
                                        ? ' active'
                                        : '')}
                                >
                                    <Link to="/password"><FormattedMessage {...messages.pass} /></Link>
                                </li>
                                <li
                                    className={'sidebar__nav__item' + (this.props.router.isActive('/security')
                                        ? ' active'
                                        : '')}
                                >
                                    <Link to="/security"><FormattedMessage {...messages.security} /></Link>
                                </li>
                                <li
                                    className={'sidebar__nav__item' + (this.props.router.isActive('/account-privacy')
                                        ? ' active'
                                        : '')}
                                >
                                    <Link to="/account-privacy"><FormattedMessage {...messages.accountPrivacy} /></Link>
                                </li>
                                <li
                                    className={'sidebar__nav__item hidden' + (this.props.router.isActive('/wallets')
                                        ? ' active'
                                        : '')}
                                >
                                    <Link to="/wallets"><FormattedMessage {...messages.wallets} /></Link>
                                </li>
                                <li
                                    className={'sidebar__nav__item' + (this.props.router.isActive('/faq')
                                        ? ' active'
                                        : '')}
                                >
                                    <Link to="/faq"><FormattedMessage {...messages.faq} /></Link>
                                </li>
                                <li
                                    style={{display: 'none'}}
                                    className={'sidebar__nav__item' + (this.props.router.isActive('/deposits')
                                        ? ' active'
                                        : '')}
                                >
                                    <Link to="/deposits"><FormattedMessage {...messages.deposits} /></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-15 profile__content__wrap offcanvas__content__wrap">
                        { this.props.custom ? this.renderCustom() : this.renderRegular() }
                    </div>
                </div>
            </div>
        );
    }
}

ProfileWithSidebar.propTypes = {

};

export default ProfileWithSidebar;
