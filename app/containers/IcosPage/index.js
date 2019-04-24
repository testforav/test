/*
 *
 * IcosPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { openContactUs } from 'core/containers/App/actions';

export class IcosPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="buyers__container">
                <Helmet
                    title="Icos Page"
                    meta={[
                        { name: 'description', content: 'Description of IcosPage' },
                    ]}
                />
                <div>
                    <h2 className="profile__section__header"><FormattedMessage {...messages.header} /></h2>
                    <div className="buyers__container__item">
                        <div className="buyers__icon-wrap">
                            <div className="icos-page__icon icon-1"></div>
                        </div>
                        <span className="buyers__container__item-text">
                            <FormattedMessage {...messages.adv1} />
                        </span>
                    </div>
                    <div className="buyers__container__item">
                        <div className="buyers__icon-wrap">
                            <div className="icos-page__icon icon-2"></div>
                        </div>
                        <span className="buyers__container__item-text">
                            <FormattedMessage {...messages.adv2} />
                        </span>
                    </div>
                    <div className="buyers__container__item">
                        <div className="buyers__icon-wrap">
                            <div className="icos-page__icon icon-3"></div>
                        </div>
                        <span className="buyers__container__item-text">
                            <FormattedMessage {...messages.adv3} />
                        </span>
                    </div>
                    <div className="buyers__container__item">
                        <div className="buyers__icon-wrap">
                            <div className="icos-page__icon icon-4"></div>
                        </div>
                        <span className="buyers__container__item-text">
                            <FormattedMessage {...messages.adv4} />
                        </span>
                    </div>
                    <div className="buyers__container__item">
                        <div className="buyers__icon-wrap">
                            <div className="icos-page__icon icon-5"></div>
                        </div>
                        <span className="buyers__container__item-text">
                            <FormattedMessage {...messages.adv5} />
                        </span>
                    </div>
                    <div className="buyers__container__item">
                        <div className="buyers__icon-wrap">
                            <div className="icos-page__icon icon-6"></div>
                        </div>
                        <span className="buyers__container__item-text">
                            <FormattedMessage {...messages.adv6} />
                        </span>
                    </div>
                    <div className="buyers__container__btn__wrapper">
                        <FormattedMessage {...messages.haveQuestions} /> <a
                            href="#"
                            onClick={
                                (evt) => {
                                    evt.preventDefault();
                                    this.props.dispatch(openContactUs());
                                }
                            }
                            ><FormattedMessage {...messages.contactUs} /></a>
                    </div>
                </div>
            </div>
        );
    }
}

IcosPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(null, mapDispatchToProps)(IcosPage);
