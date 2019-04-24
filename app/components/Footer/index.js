import React from 'react';
import { FormattedMessage } from 'react-intl';

import { openContactUs } from 'core/containers/App/actions';

import GlobalLink from 'components/GlobalLink';
import LocaleSwitch from 'components/LocaleSwitch';
import messages from './messages';

class Footer extends React.Component {
    render() {
            return (
                <div className="footer">
                    <div className="content footer__content">
                        <div className="footer__logo-wrap">
                            <GlobalLink
                                to="/"
                                dispatch={this.props.dispatch}
                                className="unstyled"
                            >
                                <div className="logo logo_img"></div>
                            </GlobalLink>
                        </div>
                        <div className="footer__copy-wrap">
                            <ul className="footer__nav">
                                <li>
                                    <GlobalLink
                                        to="/tos"
                                        dispatch={this.props.dispatch}
                                    >
                                        Terms of Service
                                    </GlobalLink>
                                </li>
                                <li>
                                    <GlobalLink
                                        to="/privacypolicy"
                                        dispatch={this.props.dispatch}
                                    >
                                        Privacy policy
                                    </GlobalLink>
                                </li>
                                <li>
                                    <GlobalLink
                                        to="/cookiepolicy"
                                        dispatch={this.props.dispatch}
                                    >
                                        Cookie policy
                                    </GlobalLink>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={
                                            (evt) => {
                                                evt.preventDefault();
                                                this.props.dispatch(openContactUs());
                                            }
                                        }
                                    >
                                        <FormattedMessage {...messages.contactUs}/>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="mailto:support@icosid.com"
                                    >
                                        support@icosid.com
                                    </a>
                                </li>
                            </ul>

                            <div className="footer__copy">
                                © ICOSID 2018
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}

export default Footer;
