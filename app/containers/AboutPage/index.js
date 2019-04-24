/*
 *
 * AboutPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export class AboutPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            selectedSlide: 1,
        };
    }
    render() {
        const isLoggedIn = this.props.userData.get('authenticated');
        return (
            <div className="about__page">
                <Helmet
                    title="About us"
                    meta={[
                        { name: 'description', content: 'Description of AboutPage' },
                    ]}
                />
                <div className="buyers__container buyers__container-transparent buyers__container-wide">
                    <h2 className="profile__section__header"><FormattedMessage {...messages.header_who} /></h2>
                    <div className="buyers__container__text">
                        <FormattedMessage {...messages.text_who} />
                    </div>
                </div>
                <div className="buyers__container buyers__container-flex buyers__container-wide row">
                    <div className="col-lg-7 col-md-7 col-sm-15 col-xs-15">
                        <div className="about__page__laptop"></div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-15 col-xs-15">
                        <h2 className="profile__section__header"><FormattedMessage {...messages.header_service} /></h2>
                        <div className="buyers__container__text">
                            <FormattedMessage {...messages.text_service} />
                        </div>
                    </div>
                </div>
                <div className="buyers__container buyers__container-transparent buyers__container-flex row buyers__container-wide">
                    <div className="col-lg-7 col-md-7 col-sm-15 col-xs-15">
                        <h2 className="profile__section__header"><FormattedMessage {...messages.header_verification} /></h2>
                        <div className="buyers__container__text">
                            <FormattedMessage {...messages.text_verification} />

                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-15 col-xs-15 text-center">
                        <div className="about__page__slider__wrapper">
                            <div
                                className={
                                    "about__page__slider__scroller about__page__slider__scroller_" + this.state.selectedSlide
                                }
                            >
                                <img
                                    className="about__page__slider"
                                    src="/static/images/common/about/slide_1.jpg"
                                />
                                <img
                                    className="about__page__slider"
                                    src="/static/images/common/about/slide_2.jpg"
                                />
                            </div>
                            <div className="about__page__slider__toggle">
                                <div
                                    className={
                                        "about__page__slider__toggle__item" +
                                        ((this.state.selectedSlide === 1) ? " about__page__slider__toggle__item-active" : "")
                                    }
                                    onClick={
                                        (evt) => {
                                            this.setState({
                                                selectedSlide: 1,
                                            });
                                        }
                                    }
                                ></div>
                                <div
                                    className={
                                        "about__page__slider__toggle__item" +
                                        ((this.state.selectedSlide === 2) ? " about__page__slider__toggle__item-active" : "")
                                    }
                                    onClick={
                                        (evt) => {
                                            this.setState({
                                                selectedSlide: 2,
                                            });
                                        }
                                    }
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AboutPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(null, mapDispatchToProps)(AboutPage);
