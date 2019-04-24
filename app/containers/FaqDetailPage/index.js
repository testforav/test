/*
 *
 * FaqDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import { fromJS } from 'immutable';

import Button from 'components/basic/Button';
import { Form, Textarea } from 'react-validation/lib/build/validation.rc';
import GlobalLink from 'components/GlobalLink';

import { makeSelectUserData } from 'core/containers/App/selectors';

import AccordionFixed from 'components/AccordionFixed';
import ProfileWithSidebar from 'components/ProfileWithSidebar';
import makeSelectFaqDetailPage from 'core/containers/FaqDetailPage/selectors';
import { openContactUs } from 'core/containers/App/actions';

import messages from './messages';

export class FaqDetailPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            isAccordionOpen: false,
            containerHeight: 0,
        };

        this.kycItems = {};
        this.aboutItems = {};
        this.pageContainer = null;
        this.initialContainerHeight = 0;
        this.activeItem = null;
    }

    toggleActiveItem(item) {
        if (!item.state.isOpen) {
            if (this.activeItem && (this.activeItem.props.index !== item.props.index || this.activeItem.props.blockIndex !== item.props.blockIndex)) {
                this.activeItem.toggle();
            }

            this.activeItem = item;
        } else if (this.activeItem && this.activeItem.props.index === item.props.index && this.activeItem.props.blockIndex === item.props.blockIndex) {
            this.activeItem = null;
        }
    }

    componentDidMount() {
        const initialHeight = this.pageContainer.getBoundingClientRect().height;

        this.setContainerHeight(initialHeight);
        this.initialContainerHeight = initialHeight;

        _debug('on faq load container height: ', initialHeight);
    }

    setContainerHeight(height) {
        this.setState({
            containerHeight: height
        });
    }

    resetContainerHeight() {
        this.setState({
            containerHeight: this.initialContainerHeight
        });
    }

    getItem(i, collection) {
        return this[collection + 'Items'][i];
    }

    render() {
        const isLoggedIn = this.props.userData.get('authenticated');

        return (
            <div>
                <Helmet
                    title="Detailed instruction"
                    meta={[
                        { name: 'description', content: 'Detailed instruction' },
                    ]}
                />

                <h2 className="profile__section__header"><FormattedMessage {...messages.header} /></h2>

                <p className="text-secondary form-group form-group_section">At Onfido we are always happy to hear from customers and fans alike, so feel free to contact us anytime!</p>

                <div className="content__block">
                    <div className="profile__section">
                        <div className="faq-page__container article" ref={(element) => {this.pageContainer = element}} style={this.state.containerHeight ? {minHeight: this.state.containerHeight} : null}>
                            <AccordionFixed
                                title={this.props.intl.formatMessage(messages.q1)}
                                key={1}
                                index={1}
                                total={1}
                                noBg={true}
                                ref={(element) => {this.aboutItems[0] = element}}
                                getItem={(i) => this.getItem(i, 'about')}
                                setContainerHeight={(height) => this.setContainerHeight(height)}
                                resetContainerHeight={() => this.resetContainerHeight()}
                                toggleActiveItem={(item) => this.toggleActiveItem(item)}
                                blockIndex={1}
                                totalBlocks={1}
                                commonContainerEl={this.pageContainer}
                                commonContainerDefaultSize={this.initialContainerHeight}
                                >
                                <div className="faq-detail">
                                    <div className="faq-detail__item">
                                        <div className="faq-detail__image-wrap">
                                            <img src="/static/images/common/faq/GOOD.png" alt=""/>
                                        </div>
                                        <div className="faq-detail__descr">
                                            <div className="faq-detail__descr__title"><span className="text-aqua"><i className="ico-ok"></i> Good</span> Example</div>
                                            <div className="faq-detail__descr__text">
                                                The photo should be on the screnn FULL and FLAT (Also, the moddle fold must be completely UNFOLDED)
                                            </div>
                                        </div>
                                    </div>
                                    <div className="faq-detail__item">
                                        <div className="faq-detail__image-wrap">
                                            <img src="/static/images/common/faq/BAD1.png" alt=""/>
                                        </div>
                                        <div className="faq-detail__descr">
                                            <div className="faq-detail__descr__title"><span className="text-danger"><i className="ico-cancel"></i> Bad</span> Example 1</div>
                                            <div className="faq-detail__descr__text">
                                                Photos that do not fill the screen may fail to authenticate
                                            </div>
                                        </div>
                                    </div>
                                    <div className="faq-detail__item">
                                        <div className="faq-detail__image-wrap">
                                            <img src="/static/images/common/faq/BAD2.png" alt=""/>
                                        </div>
                                        <div className="faq-detail__descr">
                                            <div className="faq-detail__descr__title"><span className="text-danger"><i className="ico-cancel"></i> Bad</span> Example 2</div>
                                            <div className="faq-detail__descr__text">
                                                BLURRY photos may fail to authenticate
                                            </div>
                                        </div>
                                    </div>
                                    <div className="faq-detail__item">
                                        <div className="faq-detail__image-wrap">
                                            <img src="/static/images/common/faq/BAD3.png" alt=""/>
                                        </div>
                                        <div className="faq-detail__descr">
                                            <div className="faq-detail__descr__title"><span className="text-danger"><i className="ico-cancel"></i> Bad</span> Example 3</div>
                                            <div className="faq-detail__descr__text">
                                                Photos taken at an angle may fail to autheticate
                                            </div>
                                        </div>
                                    </div>
                                    <div className="faq-detail__item">
                                        <div className="faq-detail__image-wrap">
                                            <img src="/static/images/common/faq/BAD4.png" alt=""/>
                                        </div>
                                        <div className="faq-detail__descr">
                                            <div className="faq-detail__descr__title"><span className="text-danger"><i className="ico-cancel"></i> Bad</span> Example 4</div>
                                            <div className="faq-detail__descr__text">
                                                Photo should be on the screen Flat
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionFixed>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

FaqDetailPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    FaqDetailPage: makeSelectFaqDetailPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FaqDetailPage));
