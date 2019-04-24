/*
 *
 * BuyersPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export class BuyersPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        const isLoggedIn = this.props.userData.get('authenticated');
        return (
            <div className="buyers__container">
                <Helmet
                    title="Buyers Page"
                    meta={[
                        { name: 'description', content: 'Description of BuyersPage' },
                    ]}
                />
                <div>
                    <h2 className="profile__section__header"><FormattedMessage {...messages.header} /></h2>
                    <p className="text-secondary buyers__container__subtitle">
                        <FormattedMessage {...messages.description} />
                    </p>
                    <div className="buyers__container__item">
                        <div className="buyers__icon-wrap">
                            <div className="buyers__icon icon-1"></div>
                        </div>
                        <span className="buyers__container__item-text">
                            <FormattedMessage {...messages.adv1} /> <br /> <FormattedMessage {...messages.adv1_2} />
                        </span>
                    </div>
                    <div className="buyers__container__item">
                        <div className="buyers__icon-wrap">
                            <div className="buyers__icon icon-2"></div>
                        </div>
                        <span className="buyers__container__item-text">
                            <FormattedMessage {...messages.adv2} />
                        </span>
                    </div>
                    <div className="buyers__container__item">
                        <div className="buyers__icon-wrap">
                            <div className="buyers__icon icon-3"></div>
                        </div>
                        <span className="buyers__container__item-text">
                            <FormattedMessage {...messages.adv3} />
                        </span>
                    </div>
                    <div className="buyers__container__item">
                        <div className="buyers__icon-wrap">
                            <div className="buyers__icon icon-4"></div>
                        </div>
                        <span className="buyers__container__item-text">
                            <FormattedMessage {...messages.adv4} />
                        </span>
                    </div>
                    <div className="buyers__container__item">
                        <div className="buyers__icon-wrap">
                            <div className="buyers__icon icon-5"></div>
                        </div>
                        <span className="buyers__container__item-text">
                            <FormattedMessage {...messages.adv5} />
                        </span>
                    </div>
                    <div className="buyers__container__item">
                        <div className="buyers__icon-wrap">
                            <div className="buyers__icon icon-6"></div>
                        </div>
                        <span className="buyers__container__item-text">
                            <FormattedMessage {...messages.adv6} />
                        </span>
                    </div>
                    {
                        (isLoggedIn) ? null : (
                            <div className="account_btn_wrapper buyers__container__btn__wrapper">
                                <Link to="/signup" className="btn btn_aqua btn_uppercase btn_block">
                                    <FormattedMessage {...messages.signup} />
                                </Link>
                            </div>
                        )
                    }

                </div>
            </div>
        );
    }
}

BuyersPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(null, mapDispatchToProps)(BuyersPage);
