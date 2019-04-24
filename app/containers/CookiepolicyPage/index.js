/*
 *
 * CookiepolicyPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectCookiepolicyPage from 'core/containers/CookiepolicyPage/selectors';
import messages from './messages';

export class CookiepolicyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <Helmet
                    title="Cookie Policy"
                    meta={[
                        { name: 'description', content: 'IcosID — Cookie Policy' },
                    ]}
                />

                <h2 className="profile__section__header">COOKIE POLICY</h2>

                <div className="cookie-policy__content">
                    <div className="column">
                    <div className="cookie-policy__content__page" title="Page 1">
                        <h3>INFORMATION ABOUT OUR USE OF COOKIES</h3>

                        <p>Last updated: May 15, 2018</p>
                        <p>Terms shall have the meaning as they are defined in Terms of Service <a href="https://icosid.com/tos" target="_blank">https://icosid.com/tos</a> and Privacy Policy <a href="https://icosid.com/privacypolicy" target="_blank">https://icosid.com/privacypolicy</a></p>
                        <p>Our Site uses cookies to distinguish you from other users of our Site. This helps us to provide you with a good experience when you browse our Site and also allows us to improve our Site. By continuing to browse the site, you are agreeing to our use of cookies.</p>
                        <p>A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer if you agree. Cookies contain information that is transferred to your computer&rsquo;s hard drive. A cookie enables the Site to remember your actions and preferences ‒ such as login, language, font size and other display preferences ‒ over a period, so you don&rsquo;t have to keep re-entering them whenever you come back to the site or browse from one page to another.</p>
                        <p>Cookies are placed on your device only if you consent, unless cookies are required for strictly technical functioning of the Site. However, note that if you do not consent to the use of cookies, certain functions of the Site may not function properly or may not function at all.</p>
                        <p>The legal basis for the use of cookies is our legitimate interest in ensuring the technical functionality of the Site. When cookies are used to remember your choices or for statistical purposes, the legal basis is your consent.</p>
                        <p>We use the following cookies:</p>

                        <ul>
                            <li>
                                <p><b>Strictly necessary cookies</b>. These are cookies that are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our Site and process identification of user sessions of ICOSID.</p>
                            </li>
                            <li>
                                <p><b>Analytical/performance cookies</b>. They allow us to recognise and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.</p>
                            </li>
                            <li>
                                <p><b>Functionality cookies</b>. These are used to recognise you when you return to our website. This enables us to personalise our content for you and remember your preferences (for example, your choice of language or region).</p>
                            </li>
                            <li>
                                <p><b>Security cookies</b>. They are used to ensure and improve security of our SIte and your warrant your secure access to the Site.</p>
                            </li>
                        </ul>
                        <p>You can find more information about the individual cookies we use and the purposes for which we use them in the table below:</p>

                    <div className="privacy__content__table-wrap">
                        <table className="table table-striped privacy__content__table article">
                            <thead>
                                <tr>
                                <th>
                                <div className="layoutArea">
                                <div className="column">
                                <p>Cookie</p>
                                </div>
                                </div>
                                </th>
                                <th>
                                <div className="layoutArea">
                                <div className="column">
                                <p>Name</p>
                                </div>
                                </div>
                                </th>
                                <th>
                                <div className="layoutArea">
                                <div className="column">
                                <p>Purpose</p>
                                </div>
                                </div>
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>Strictly necessary cookies</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>IcosId consent_session</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>These cookies enable you to log into secure areas of our Site and enables us to process identification of user sessions of ICOSID.</p>
                            </div>
                            </div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>Functionality cookies</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>Locale</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>This cookie is used to recognise you when you return to our website. This enables us to personalise our content for you and remember your preferences (for example, your choice of language or region).</p>
                            </div>
                            </div>
                            </td>
                            </tr>

                            <tr>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>Security cookies</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>xsrf</p>
                            </div>
                            </div>
                            </td>
                            <td>
                                <p>This cookie is essential for our Site to improve its security and in particular prevent attacks on our Site.</p>
                            </td>
                            </tr>

                            <tr>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>Analytical/performance cookies</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>gtag.js<br />analytics.js<br />ga.js.</p>
                            </div>
                            </div>
                            </td>
                            <td>
                                <p>This cookie enables us to estimate our audience size and usage pattern.</p>
                            </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="layoutArea">
                    <div className="column">
                    <p>Please note that third parties (including, for example providers of external services like web traffic analysis services) may also use cookies, over which we have no control. These cookies are likely to be analytical/performance cookies or targeting cookies.</p>
                    <p>You can control and/or delete cookies as you wish &ndash; for details, see <a href="http://www.youronlinechoices.com/" target="_blank">http://www.youronlinechoices.com/</a>. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. But if you do this you may have to manually adjust some preferences every time you visit a site, while some services and functionalities may not work.</p>
                    <p>Except for essential cookies, all cookies will expire after a short term (a day, a week or a month), though in some cases they may remain valid for up to a year.</p>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>

                <div>
                    <a href="/static/images/documents/cookiepolicy.pdf"><i className="ico-download"></i> Download pdf</a>
                </div>

            </div>
        );
    }
}

CookiepolicyPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    CookiepolicyPage: makeSelectCookiepolicyPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CookiepolicyPage);
