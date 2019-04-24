/*
 *
 * TosPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectTosPage from 'core/containers/TosPage/selectors';
import messages from './messages';

export class TosPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <Helmet
                    title="TERMS OF SERVICE"
                    meta={[
                        { name: 'description', content: 'IcosID TERMS OF SERVICE' },
                    ]}
                />

                <h2 className="profile__section__header">TERMS OF SERVICE</h2>

                <div className="terms__content">

                    <div className="terms__content__page" title="Page 1">
                    <div className="layoutArea">
                    <div className="column">
                    <p>Last Updated: May 15, 2018</p>
                    </div>
                    </div>
                    <div className="layoutArea">
                    <div className="column">
                    <p>This is a legal agreement between you and ICOBox Ltd., a Cayman Island company, with registered office at Fifth Floor, Zephyr House, 122 Mary Street, George Town, Grand Cayman, Cayman Islands (hereinafter &ndash; &ldquo;<b>ICOBox</b>&rdquo;) that describes the Terms of Service (&ldquo;<b>Terms</b>&rdquo;) with respect to your access to and use of online services and online content (referred to collectively as the &ldquo;<b>Services</b>&rdquo;) we make available through https://icosid.com (referred to collectively as the &ldquo;<b>Site</b>&rdquo;). Please take the time to read the Agreement carefully as it governs your use of the Site and Services.</p>

                    <h3>1. AGREEMENT ACCEPTANCE</h3>

                    <p className="text-decorated"><b>Your access to, and the use of the Site and/or Services is conditioned on your acceptance of and compliance with these Terms. If you do not AGREE, you may not use or access the Sites and Services.</b></p>
                    <p><b className="text-decorated">You must be 13 years of age or older to use Services.</b> If you are at least 13 but not yet 18 years of age, please have your parent or legal guardian review these Terms with you, discuss any questions you might have, and accept these Terms for you.</p>

                    <h3>2. OTHER TERMS THAT MAY APPLY TO YOU</h3>

                    <p>These Terms refer to the following additional terms, which also apply to your use of our Site and/or Services:</p>
                    <p>Our Privacy Policy <a href="https://icosid.com/privacypolicy" target="_blank">https://icosid.com/privacypolicy</a>. See further under clause 6.<br />Our Cookie Policy <a href="https://icosid.com/cookiepolicy" target="_blank">https://icosid.com/cookiepolicy</a>, which sets out information about the cookies on our Site.</p>

                    <h3>3. CHANGES TO THE TERMS</h3>

                    <div className="layoutArea">
                    <div className="column">
                    <p>These Terms may be revised from time to time at ICOBox&rsquo;s sole discretion. We will provide notice of any amendment to these Terms by posting the revised terms to the Site and updating the "Last updated" field above accordingly or by any other means we deem appropriate. We are not obligated to provide notice by any other means beyond these, and it is your sole responsibility to check these Terms every time you use Services. Any change to these Terms will be effective immediately upon such notice and will apply to any ongoing or subsequent use of the Site and Services.</p>
                    </div>
                    </div>

                    <h3>4. ACCOUNT</h3>

                    <p>The use of our Services requires you to have a registered account on the Site (&ldquo;Account&rdquo;). You represent and warrant that all information you provided when creating such an Account is current, complete, and accurate. You agree to promptly notify ICOBox of any changes to any information that would cause the information provided at your Account&rsquo;s creation to no longer be current, complete or accurate. You agree that you will be the only user accessing and using your Account, and you may not transfer the right of its use or disclose any log in credentials to a third party without our written consent.</p>
                    <p>You agree to take full responsibility for any activity that occurs through the use of your account, and you may not assign this obligation to any third party. You agree to notify ICOBox if you discover or suspect any security breaches or vulnerabilities related to the Site and/or Services. You shall be responsible for implementing reasonable measures for securing your Account, including any requisite private key(s) or other credentials necessary to access such Account. If your private key(s) or other access credentials are lost, you may lose access to your Account. ICOBox shall not be responsible for any such losses.</p>

                    <h3>5. SERVICES</h3>
                    <p>We provide you the following Services:</p>
                    <p>1) identity verification services including KYC/AML check by:</p>
                    <ul>
                        <li>
                            <p>verification that the likelihood the document provided is genuine and cross-references the information written on the document with the validated identity (<b>Document Image Check</b>); and</p>
                        </li>
                    <li>
                    <p>checking your identity on the international PEPs and Sanctions lists (<b>Watchlist Check</b>), and</p>
                    </li>
                    </ul>
                    <p>2) confirmation upon your request to our partners of your status as &ldquo;verified,&rdquo; user.</p>
                    <p>For proper provision of Services, you agree to provide us with full and accurate data either via an online application form or through ICOBox proprietary application programming interface (the &ldquo;API&rdquo;) at our partner websites or appications. You are solely and fully responsible for ensuring that all your data is accurate, valid complete and captured in a form we can process to maximise the quality of our Service.</p>
                    </div>
                    </div>

                    </div>
                    <div className="terms__content__page" title="Page 2">
                    <div className="layoutArea">
                    <div className="column">
                    <p>In order to offer the qualitative Services we are collaborating with Sumsub (acting as Sum And Substance Ltd.), one of the leading identity verification providers on the market. All information, data and documents submitted by you via our Site for KYC/AML check, are transferred directly to Sumsub. Please check our Privacy Policy for more information on Sumsub and its role in data processing. We may at your sole discretion change an identity verification service provider or terminate its services at any moment without additional notification to you.</p>

                    <h3>6. YOUR PRIVACY</h3>

                    <p>We only use any personal data we collect through your use of the Site and the Services in the ways set out in our privacy policy <a href="https://icosid.com/privacypolicy" target="_blank">https://icosid.com/privacypolicy</a></p>
                    <p>Please be aware that internet transmissions are never completely private or secure and that any message or information you send using the Site or any Service may be read or intercepted by others, even if there is a special notice that a particular transmission is encrypted.</p>

                    <h3>7. CHANGES TO OUR SITE</h3>

                    <p>We may update and change our Site from time to time to reflect changes to our Services, our users&rsquo; needs and our business priorities.</p>
                    <p>Our Site and Services are made available free of charge.</p>
                    <p>We do not guarantee that our Site, or any content on it, will always be available or be uninterrupted. We may suspend or withdraw or restrict the availability of all or any part of our site for business and operational reasons. We will try to give you reasonable notice of any suspension or withdrawal.</p>

                    <h3>8. HOW YOU MAY USE MATERIAL ON OUR SITE</h3>

                    <p>We are the owner of all intellectual property rights in our site, and in the material published on it. Those works are protected by copyright laws and treaties around the world. All such rights are reserved.</p>
                    <p>You may print off one copy, and may download extracts, of any page(s) from our site for your personal use and you may draw the attention of others within your organisation to content posted on our site.</p>
                    <p>You must not modify the paper or digital copies of any materials you have printed off or downloaded in any way, and you must not use any illustrations, photographs, or any graphics separately from any accompanying text.</p>
                    <p>Our status as the authors of content on our Site must always be acknowledged.</p>
                    <p>You must not use any part of the content on our site for commercial purposes without obtaining a licence to do so from us.</p>
                    <p>If you print off, copy or download any part of our site in breach of these Terms, your right to use our site will cease immediately and you must, at our option, return or destroy any copies of the materials you have made.</p>

                    <h3>9. WE ARE NOT RESPONSIBLE FOR WEBSITES WE LINK TO</h3>

                    <p>Where our site contains links to other sites and resources provided by third parties, these links are provided for your information only. Such links should not be interpreted as approval by us of those linked websites or information you may obtain from them.</p>
                    <p>We have no control over the contents of those sites or resources.</p>

                    <h3>10. OUR RESPONSIBILITY FOR LOSS OR DAMAGE SUFFERED BY YOU</h3>

                    <p>We exclude all implied conditions, warranties, representations or other terms that may apply to our Site and/or Services.</p>
                    <p>We will not be liable to you for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with:</p>
                    <ul>
                        <li>
                            <p>use of, or inability to use, our site; or</p>
                        </li>
                        <li>
                            <p>use of or reliance on any content displayed on our site.</p>
                        </li>
                    </ul>
                    </div>
                    </div>
                    <div className="layoutArea">
                    <div className="column">
                    <p>In particular, we will not be liable for:</p>
                    </div>
                    </div>
                    </div>
                    <div className="terms__content__page" title="Page 3">
                    <div className="layoutArea">
                    <div className="column">
                        <ul>
                            <li>
                                <p>loss of profits, sales, business, or revenue;</p>
                            </li>
                            <li>
                                <p>business interruption;</p>
                            </li>
                            <li>
                                <p>loss of anticipated savings;</p>
                            </li>
                            <li>
                                <p>loss of business opportunity, goodwill or reputation; or</p>
                            </li>
                            <li>
                                <p>any indirect or consequential loss or damage.</p>
                            </li>
                        </ul>
                    <p>However we do not exclude or limit in any way our liability to you where it would be unlawful to do so. This includes liability for death or personal injury caused by our negligence or the negligence of our employees, agents or subcontractors and for fraud or fraudulent misrepresentation.</p>

                    <h3>11. WE ARE NOT RESPONSIBLE FOR VIRUSES AND YOU MUST NOT INTRODUCE THEM</h3>

                    <p>We do not guarantee that our site will be secure or free from bugs or viruses.</p>
                    <p>You are responsible for configuring your information technology, computer programmes and platform to access our site. You should use your own virus protection software.</p>
                    <p>You must not misuse our site by knowingly introducing viruses, trojans, worms, logic bombs or other material that is malicious or technologically harmful. You must not attempt to gain unauthorised access to our site, the server on which our site is stored or any server, computer or database connected to our site. You must not attack our site via a denial-of-service attack or a distributed denial-of service attack. By breaching this provision, you would commit a criminal offence under the Computer Misuse Act 1990. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use our site will cease immediately.</p>

                    <h3>12. WE MAY END YOUR RIGHTS TO USE THE SITE AND THE SERVICES IF YOU BREAK THESE TERMS</h3>

                    <p>We may end your rights to use Services at any time by contacting you if you have broken these terms in a serious way. If what you have done can be put right we will give you a reasonable opportunity to do so.</p>
                    <p>If we end your rights to use Services you must stop all activities authorised by these Terms, including your use of any Services.</p>

                    <h3>13. INTELLECTUAL PROPERTY RIGHTS</h3>

                    <p>All intellectual property rights in the Site throughout the world belong to us (or our licensors) and the rights in the and the Site are licensed (not sold) to you. You have no intellectual property rights in, or to, the Site other than the right to use them in accordance with these terms.</p>

                    <h3>14. WE MAY TRANSFER THIS AGREEMENT TO SOMEONE ELSE</h3>

                    <p>We may transfer our rights and obligations under these terms to another organisation. We will always tell you in writing if this happens and we will ensure that the transfer will not affect your rights under the contract.</p>

                    <h3>15. YOU NEED OUR CONSENT TO TRANSFER YOUR RIGHTS TO SOMEONE ELSE</h3>

                    <p>You may only transfer your rights or your obligations under these terms to another person if we agree in writing.</p>

                    <h3>16. IF A COURT FINDS PART OF THIS CONTRACT ILLEGAL, THE REST WILL CONTINUE IN FORCE</h3>

                    <p>Each of the paragraphs of these terms operates separately. If any court or relevant authority decides that any of them are unlawful, the remaining paragraphs will remain in full force and effect.</p>

                    <h3>17. EVEN IF WE DELAY IN ENFORCING THIS CONTRACT, WE CAN STILL ENFORCE IT LATER</h3>
                    <p>Even if we delay in enforcing this contract, we can still enforce it later. If we do not insist immediately that you do anything you are required to do under these terms, or if we delay in taking steps against you in respect of your</p>
                    </div>
                    </div>
                    </div>
                    <div className="terms__content__page" title="Page 4">
                    <div className="layoutArea">
                    <div className="column">
                    <p>breaking this contract, that will not mean that you do not have to do those things and it will not prevent us taking steps against you at a later date.</p>

                    <h3>18. SUPPORT FOR THE SITE AND HOW TO TELL US ABOUT PROBLEMS</h3>

                    <p><b>Contacting us (including with complaints).</b> If you think the Services are faulty or misdescribed or wish to contact us for any other reason please email our customer service team at <a href="mailto:support@icosid.com">support@icosid.com</a>.</p>
                    <p><b>How we will communicate with you.</b> If we have to contact you we will do so by email, using the contact details you have provided to us.</p>
                    </div>
                    </div>
                    <h3>19. DISCLAIMER OF WARRANTIES</h3>

                    <div className="layoutArea">
                    <div className="column">
                    <p>THE MATERIALS, CONTENT ON THIS SITE AND SERVICES ARE PROVIDED TO YOU ON AN “AS IS” BASIS, WITHOUT ANY WARRANTIES AS TO MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE OR USE NOR WITH RESPECT TO THE RESULTS WHICH MAY BE OBTAINED FROM THE USE OF SERVICES. ICOBOX MAKES NO WARRANTY THAT i) THE SERVICES WILL MEET YOUR REQUIREMENTS: ii) THE SERVICES WILL BE ERROR-FREE, SECURE, OR UNINTERRUPTED; iii) ANY ERRORS WILL BE CORRECTED; AND iv) THE QUALITY OF THE SERVICES WILL MEET YOUR EXPECTATIONS. ANY SERVICES ACCESSED THROUGH THE USE OF THE SITE IS AT YOUR OWN DISCRETION AND RISK AND ICOBox SHALL HAVE NO RESPONSIBILITY OR LIABILITY FOR ANY ERRORS OR OMISSIONS NOR SHALL IT BE LIABLE FOR ANY DAMAGES, WHETHER DIRECT OR INDIRECT, SPECIAL OR CONSEQUENTIAL, EVEN IF THEY HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM ICOBOX OR ITS SERVICES SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THE TERMS. IN NO EVENT SHALL THE LIABILITY OF ICOBOX OR ANY OF THEIR AFFILIATES PURSUANT TO ANY CAUSE OF ACTION, WHETHER IN CONTRACT, TORT, OR OTHERWISE, EXCEED 100$. FURTHERMORE, ICOBox SHALL HAVE NO RESPONSIBILITY OR LIABILITY FOR DELAYS OR FAILURES DUE TO CIRCUMSTANCES BEYOND THEIR CONTROL.</p>
                    </div>
                    </div>

                    <h3>20. GOVERNING LAW AND DISPUTE RESOLUTION</h3>

                    <div className="layoutArea">
                    <div className="column">
                    <p>If a dispute arises between you and ICOBox, our goal is to provide you with a neutral and cost effective means<br />of resolving the dispute quickly. Accordingly, you and ICOBox agree that we will resolve any dispute in accordance with one of the subsections below or as ICOBox and you otherwise agree in writing.</p>
                    <p>You and ICOBox agree to first attempt to negotiate any dispute informally for at least 30 days before initiating arbitration. ICOBox will send its notice of dispute to residence address (if you provided it to us) or to the email address you provided to us. You will send your notice of dispute to: ICOBox Ltd, Fifth Floor, Zephyr House, 122 Mary Street, George Town, Grand Cayman, Cayman Islands.</p>
                    <p>Arbitration Option. For any claim (excluding claims for injunctive or other equitable relief) where the total amount of the award sought is less than $10,000, the party requesting relief may elect to resolve the dispute in a cost effective manner through binding non-appearance-based arbitration. In the event a party elects arbitration, they shall initiate such arbitration through an established alternative dispute resolution (ADR) provider mutually agreed upon by the parties. The ADR provider and the parties must comply with the following rules:</p>
                    <p>(a) the arbitration shall be conducted by telephone, online and/or be based on written submissions, and the specific manner shall be chosen by the party initiating the arbitration;</p>
                    <p>(b) the arbitration shall not involve any personal appearance by the parties or witnesses unless otherwise mutually agreed by the parties; and (c) any judgment on the award rendered by the arbitrator shall be final and may be entered in any court of competent jurisdiction.</p>
                    <p>In case such dispute cannot be settled amicably through negotiations within a thirty 30-day period, and the Demand is in excess of $10,000 USD, it or they shall be settled by arbitration in accordance with the UNCITRAL Arbitration Rules.</p>
                    </div>
                    </div>
                    <div className="layoutArea">
                    <div className="column">
                    <p>The appointing authority shall be the Chairman of Chartered Institute of Arbitrators, Ireland.</p>
                    </div>
                    </div>
                    </div>
                    <div className="terms__content__page" title="Page 5">
                    <div className="layoutArea">
                    <div className="column">
                    <ul>
                    <li>
                    <p>The number of arbitrators shall be one.</p>
                    </li>
                    <li>
                    <p>The place of arbitration shall be Dublin, Ireland.</p>
                    </li>
                    <li>
                    <p>The arbitration shall be held, and the award rendered, in English.</p>
                    </li>
                    </ul>

                    <p>Each Party shall bear its own expenses, but Parties shall share equally in the expenses of the arbitration tribunal.</p>
                    <p>The Parties agree that all arbitration proceedings conducted pursuant to this Section shall be kept strictly confidential, and all information disclosed in the course of such arbitration proceedings shall be used solely for the purpose of those proceedings. Any election to arbitrate by one party shall be final and binding on the other.</p>
                    <p>All Disputes shall be governed by and these Terms shall be construed in accordance with English law.</p>
                    </div>
                    </div>
                    </div>

                </div>

                <div>
                    <a href="/static/images/documents/tos.pdf"><i className="ico-download"></i> Download pdf</a>
                </div>


            </div>
        );
    }
}

TosPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    TosPage: makeSelectTosPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TosPage);
