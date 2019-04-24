/*
 *
 * GoodbyePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectGoodbyePage from 'core/containers/GoodbyePage/selectors';
import messages from './messages';

import GlobalLink from 'components/GlobalLink';

import {
    submitEmailConfirmPage
} from 'core/containers/GoodbyePage/actions';

const REDIRECT_TIMEOUT = 10000;

export class GoodbyePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            canRender: true,
            deleteRequestSent: false,
            deleteRequestSentComplete: false,
            redirectTimeout: 10,
        };
    }

    componentWillMount() {
        if (!this.props.location.query.Token) {
            this.setState({
                canRender: false
            });

            this.props.router.push('/');
        }
    }

    componentDidMount() {
        const token = this.props.location.query.Token;

        if (token && !this.state.deleteRequestSent) {
            this.setState({
                deleteRequestSent: true
            });

            this.props.dispatch(submitEmailConfirmPage(token));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.GoodbyePage.deleteRequestSent && !this.state.deleteRequestSentComplete) {
            this.setState({
                deleteRequestSentComplete: true
            });

            this.startRedirectTimeout();
        }
    }

    startRedirectTimeout() {
        this.redirectTimeout = setInterval(() => {
            this.setState({
                redirectTimeout: this.state.redirectTimeout - 1
            });

            if (this.state.redirectTimeout < 1) {
                this.props.router.push('/');

                clearInterval(this.redirectTimeout);
            }
        }, 1000);
    }

    render() {
        if (this.state.canRender) {
            return (
                <div className="content content_slim main__container">
                    <Helmet
                        title="Email Confirm"
                        meta={[
                            { name: 'description', content: 'Safe Joint Between Your Cash and Crypto World' },
                        ]}
                    />

                    <div className="main__column main__column-single">
                        <div className="main__column__text content-padding">
                            <h1 className="main__title text-center"><FormattedMessage {...messages.header} /></h1>

                            <div
                                className={
                                    "text-center" + (this.props.GoodbyePage.formLoading ? ' block-loading' : '')
                                }
                                >
                                {
                                    this.state.deleteRequestSentComplete
                                    ? (
                                        <div>
                                            <div className="article">
                                                <p><FormattedMessage {...messages.success} /></p>
                                                <p><FormattedMessage {...messages.successAgain} values={{
                                                        url: <GlobalLink to="/signup" dispatch={this.props.dispatch}>icosid.com</GlobalLink>
                                                    }}/></p>
                                            </div>
                                            <div>
                                                <p>
                                                    <FormattedMessage {...messages.redirectTimer} values={{
                                                            time: this.state.redirectTimeout
                                                        }}/>
                                                </p>
                                            </div>
                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>

                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

GoodbyePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    GoodbyePage: makeSelectGoodbyePage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodbyePage);
