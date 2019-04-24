/*
 *
 * FaqPage
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
import makeSelectFaqPage from 'core/containers/FaqPage/selectors';
import { openContactUs } from 'core/containers/App/actions';

import {
    Tab,
    Nav,
    NavItem,
} from 'react-bootstrap';

import messages from './messages';

export class FaqPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
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

    getSectionData(collection) {
        const isLoggedIn = this.props.userData.get('authenticated');
        const data = {
            'kyc': [
                { q: 'q1_1', a: 'a1_1', idx:'1' },
                { q: 'q1_3', a: 'a1_3', idx:'3' },
                { q: 'q1_4', a: 'a1_4', idx:'4' },
                { q: 'q1_6', a: 'a1_6', idx:'5' },
                { q: 'q1_8', a: 'a1_8', idx:'6' },
                { q: 'q1_9', a: 'a1_9', idx:'7' },
                { q: 'q1_10', a: 'a1_10', idx:'8' },
            ],
            'about': [
                { q: 'about_q1', a: 'about_a1', idx:'9', values: {} },
                {
                    q: 'about_q2',
                    a: 'about_a2',
                    idx:'10',
                    values: {
                        bb: <a target="_blank" href="http://snowfox.tech/">book building</a>
                    }
                },
                { q: 'about_q3', a: 'about_a3', idx:'11', values: {} },
                {
                    q: 'about_q5',
                    a: 'about_a5',
                    idx:'13',
                    values: {
                        link: isLoggedIn
                            ? <GlobalLink
                                className="unstyled"
                                to="/account-privacy"
                                dispatch={this.props.dispatch}
                            >
                                {this.props.intl.formatMessage(messages.about_a5_form)}
                            </GlobalLink>
                            : this.props.intl.formatMessage(messages.about_a5_form)
                    }
                },
                {
                    q: 'about_q6',
                    a: 'about_a6',
                    idx:'9',
                    values: {
                        linkBuyers: <GlobalLink
                            className="unstyled"
                            to="/buyers"
                            dispatch={this.props.dispatch}
                        >
                            {this.props.intl.formatMessage(messages.buyers)}
                        </GlobalLink>,
                        linkPerspective: <GlobalLink
                            className="unstyled"
                            to="/icos"
                            dispatch={this.props.dispatch}
                        >
                            {this.props.intl.formatMessage(messages.icos)}
                        </GlobalLink>
                    }
                },
            ]
        };

        return data[collection];
    }

    getItem(i, collection) {
        return this[collection + 'Items'][i];
    }

    tabKyc() {
        const kycSection = this.getSectionData('kyc');

        const items = kycSection.map((item, index) => {
            return (
                <AccordionFixed
                    title={this.props.intl.formatMessage(messages[item.q])}
                    key={index}
                    index={index}
                    idx={item.idx}
                    total={kycSection.length}
                    ref={(element) => {this.kycItems[index] = element}}
                    getItem={(i) => this.getItem(i, 'kyc')}
                    setContainerHeight={(height) => this.setContainerHeight(height)}
                    resetContainerHeight={() => this.resetContainerHeight()}
                    toggleActiveItem={(item) => this.toggleActiveItem(item)}
                    blockIndex={1}
                    totalBlocks={2}
                    commonContainerEl={this.pageContainer}
                    commonContainerDefaultSize={this.initialContainerHeight}
                    >
                    <div><FormattedMessage {...messages[item.a]} /></div>
                </AccordionFixed>
            );
        });

        return (
            <div className="faq__tab__content">
                <div className="faq__tab__list accordion-panel-fixed-list">
                    { items }
                </div>
            </div>
        );
    }


    tabAbout() {
        const isLoggedIn = this.props.userData.get('authenticated');
        const aboutSection = this.getSectionData('about');

        const items = aboutSection.map((item, index) => {
            return (
                <AccordionFixed
                    title={this.props.intl.formatMessage(messages[item.q])}
                    key={index}
                    index={index}
                    idx={item.idx}
                    total={aboutSection.length}
                    ref={(element) => {this.aboutItems[index] = element}}
                    getItem={(i) => this.getItem(i, 'about')}
                    setContainerHeight={(height) => this.setContainerHeight(height)}
                    resetContainerHeight={() => this.resetContainerHeight()}
                    toggleActiveItem={(item) => this.toggleActiveItem(item)}
                    blockIndex={2}
                    totalBlocks={2}
                    commonContainerEl={this.pageContainer}
                    commonContainerDefaultSize={this.initialContainerHeight}
                    >
                    <div><FormattedMessage {...messages[item.a]} values={item.values} /></div>
                </AccordionFixed>
            );
        });

        return (
            <div className="faq__tab__content">
                <div className="faq__tab__list accordion-panel-fixed-list">
                    { items }
                </div>
            </div>
        )
    }

    renderTab(tabName) {
        if (_.isFunction(this['tab' + tabName])) {
            return this['tab' + tabName]();
        } else {
            return null;
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

    render() {
        const isLoggedIn = this.props.userData.get('authenticated');

        return (
            <div>
                <Helmet
                    title="FAQ"
                    meta={[
                        { name: 'description', content: 'Description of FaqPage' },
                    ]}
                />

                <h2 className="profile__section__header"><FormattedMessage {...messages.header} /></h2>

                <div className="faq-page__container article" ref={(element) => {this.pageContainer = element}} style={this.state.containerHeight ? {minHeight: this.state.containerHeight} : null}>
                    <div className="faq__subheader"><FormattedMessage {...messages.kycAml} /></div>
                    {this.renderTab('Kyc')}

                    <div className="faq__subheader"><FormattedMessage {...messages.about_title} /></div>
                    {this.renderTab('About')}
                </div>
            </div>
        );
    }
}

FaqPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    FaqPage: makeSelectFaqPage(),
    userData: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FaqPage));
