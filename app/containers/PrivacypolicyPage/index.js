/*
 *
 * PrivacypolicyPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectPrivacypolicyPage from 'core/containers/PrivacypolicyPage/selectors';
import messages from './messages';

export class PrivacypolicyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <Helmet
                    title="Privacy Policy"
                    meta={[
                        { name: 'description', content: 'IcosID Privacy Policy' },
                    ]}
                />

                <h2 className="profile__section__header">PRIVACY POLICY</h2>

                <div className="privacy__content">
                    <div className="privacy__content-page" title="Page 1">
                    <div className="layoutArea">
                    <div className="column">

                        <h3>INTRODUCTION</h3>

                        <p>Welcome to the ICOBox&rsquo;s privacy notice.</p>
                        <p>ICOBox respects your privacy and is committed to protecting your personal data. This privacy notice will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
                        <p>This privacy notice is provided in a layered format so you can click through to the specific areas set out below. Please also use the Glossary to understand the meaning of some of the terms used in this privacy notice.</p>

                        <p>
                            <a href="#privacy_1">1. IMPORTANT INFORMATION AND WHO WE ARE</a>
                        </p><p>
                            <a href="#privacy_2">2. THE DATA WE COLLECT ABOUT YOU</a>
                        </p><p>
                            <a href="#privacy_3">3. HOW IS YOUR PERSONAL DATA COLLECTED</a>
                        </p><p>
                            <a href="#privacy_4">4. HOW WE USE YOUR PERSONAL DATA</a>
                        </p><p>
                            <a href="#privacy_5">5. DISCLOSURES OF YOUR PERSONAL DATA</a>
                        </p><p>
                            <a href="#privacy_6">6. INTERNATIONAL TRANSFERS</a>
                        </p><p>
                            <a href="#privacy_7">7. DATA SECURITY</a>
                        </p><p>
                            <a href="#privacy_8">8. DATA RETENTION</a>
                        </p><p>
                            <a href="#privacy_9">9. YOUR LEGAL RIGHTS</a>
                        </p><p>
                            <a href="#privacy_10">10. GLOSSARY</a>
                        </p>

                        <h3 id="privacy_1">1. IMPORTANT INFORMATION AND WHO WE ARE</h3>
                        <h4>PURPOSE OF THIS PRIVACY NOTICE</h4>

                        <p>This privacy notice aims to give you information on how ICOBox collects and processes your personal data through your use of this website, including any data you may provide through this website when you undergo through identity verification process (hereinafter - <b>Service</b>).</p>
                        <p>This website is not intended for children and we do not knowingly collect data relating to children.</p>
                        <p>It is important that you read this privacy notice together with any other privacy notice or fair processing notice we may provide on specific occasions when we are collecting or processing personal data about</p>

                    <div className="privacy__content-page" title="Page 2">
                    <div className="layoutArea">
                    <div className="column">
                    <p>you so that you are fully aware of how and why we are using your data. This privacy notice supplements the other notices and is not intended to override them.</p>

                    <h4>CONTROLLER</h4>

                    <p>ICOBox is the controller and responsible for your personal data (collectively referred to as &rdquo;ICOBox&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo; in this privacy notice).</p>
                    <p>We have appointed a data protection officer (<b>DPO</b>) who is responsible for overseeing questions in relation to this privacy notice. If you have any questions about this privacy notice, including any requests to exercise your legal rights, please contact the DPO using the details set out below.</p>

                    <h4 id="contact">CONTACT DETAILS</h4>

                    <p><b>Our full details are</b>: ICOBox Ltd., a Cayman Island company, located at the Fifth Floor, Zephyr House, 122 Mary Street, George Town, Grand Cayman, KY1-1206, Cayman Islands.</p>
                    <p>Support: <a href="mailto:support@icosid.com">support@icosid.com</a></p>
                    <h4>Data Protection Officer (DPO):</h4>
                    <p><span className="text-secondary">Name or title of DPO:</span> ITLawConsult LLC</p>
                    <p><span className="text-secondary">Email address: </span><a href="mailto:dpo@itlawconsult.com">dpo@itlawconsult.com</a></p>
                    <p><span className="text-secondary">Postal address: </span>ITLawConsult LLC, Attn. Data Protection Officer, 30 N Gould St Ste R, Sheridan, WY 82801, USA</p>
                    <p><span className="text-secondary">Telephone number: </span>+447937418844</p>

                    <p>You have the right to make a complaint at any time to applicable to you Data Protection Authority. You can find contact details of your National Data Protection Authority online at: <a href="http://ec.europa.eu/justice/article-29/structure/data-protection-authorities/index_en.htm" target="_blank">http://ec.europa.eu/justice/article-29/structure/data-protection-authorities/index_en.htm</a></p>
                    <p>We would, however, appreciate the chance to deal with your concerns before you approach the ICO so please contact us or our DPO in the first instance.</p>

                    <h4>CHANGES TO THE PRIVACY NOTICE AND OUR DUTY TO INFORM US OF CHANGES</h4>

                    <p>This version was last updated on May 15, 2018 and historic versions can be obtained by contacting us.</p>
                    <p>The data protection law in the EU will change on 25 May 2018. Although this privacy notice sets out most of your rights under the new laws, we may not yet be able to respond to some of your requests (for example, a request for the transfer of your personal data) until May 25, 2018 as we are still working towards getting our systems ready for some of these changes.</p>
                    <p>It is important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes during your relationship with us.</p>
                    </div>
                    </div>

                    <h4>THIRD-PARTY LINKS</h4>

                    </div>

                    <p>This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy notice of every website you visit.</p>

                    <h3 id="privacy_2">2. THE DATA WE COLLECT ABOUT YOU</h3>

                    <p>Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).</p>
                    <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>

                    <ul>
                        <li>
                            <p><b>Identity Data</b> includes first name, maiden name, last name, username or similar identifier, marital status, title, nationality, date of birth, place of birth, gender, passport or ID document number, photo, issue date, expiry date and other information provided in passport or ID document scan copy.</p>
                        </li>
                        <li>
                            <p><b>Contact Data</b> includes residence address, email address and telephone numbers.</p>
                        </li>
                        <li>
                            <p><b>Technical Data</b> includes internet protocol (IP) address, your login data, browser type and version, browser plug-in types and versions, device type, operating system and platform and other technology on the devices you use to access this website.</p>
                        </li>
                        <li>
                            <p><b>Usage Data</b> includes information about how you use our website, products and services.</p>
                        </li>
                    </ul>

                    <p>We also collect, use and share <b>Aggregated Data</b> such as statistical or demographic data for any purpose. Aggregated Data may be derived from your personal data but is not considered personal data in law as this data does not directly or indirectly reveal your identity. For example, we may aggregate your Usage Data to calculate the percentage of users accessing a specific website feature. However, if we combine or connect Aggregated Data with your personal data so that it can directly or indirectly identify you, we treat the combined data as personal data which will be used in accordance with this privacy notice.</p>
                    <p>We do not collect any <b>Special Categories of Personal Data</b> about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health and genetic and biometric data). Nor do we collect any information about criminal convictions and offences.</p>

                    <h4>IF YOU FAIL TO PROVIDE PERSONAL DATA</h4>

                    <p>We need to collect personal data under the terms of a contract we have with you and if you fail to provide that data when requested, we may not be able to perform the contract we have or are trying to enter into with you (in particular, to provide you identity verification services). In this case, we may have to cancel a service you have with us but we will notify you if this is the case at the time.</p>

                    <h3 id="privacy_3">3. HOW IS YOUR PERSONAL DATA COLLECTED?</h3>

                    <p>We use different methods to collect data from and about you including through:</p>

                    <ul>
                        <li>
                            <p><b>Direct interactions</b>. You may give us your Identity and Contact Data by filling in online forms provided on our website. This includes personal data you provide when you:</p>

                            <ul>
                                <li>
                                    <p>create an account on our website;</p>
                                </li>
                                <li>
                                    <p>submit your information for identity verification</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p><b>Automated technologies or interactions</b>. As you interact with our website, we may automatically collect Technical and Usage Data about your equipment, browsing actions and patterns. We collect this personal data by using cookies, and other similar technologies. Please see our cookie policy <a href="https://icosid.com/cookiepolicy" target="_blank">https://icosid.com/cookiepolicy</a> for further details.</p>
                        </li>
                        <li>
                            <p><b>Third parties or publicly available sources</b>. We may receive personal data about you from various third parties as set out below:</p>

                            <ul>
                                <li>
                                    <p>Identity and Contact Data from identity verification providers such as Sumsub based inside the EU (please see Section 5 of this Privacy Policy for more information on Sumsub).</p>
                                </li>
                                <li>
                                    <p>Technical Data from analytics providers such as Google Analytics. This allows us to record and analyse how you use our Apps and Services. You can learn more about how Google Analytics works and the information it allows us to collect and analyse here: <a href="https://support.google.com/analytics/answer/1012034?hl=lten&amp;ref_topic=6157800" target="_blank">https://support.google.com/analytics/answer/1012034?hl=lten&amp;ref_topic=6157800</a></p>
                                    <p>We use this data on the basis of our legitimate interest as a business in improving our understanding of client needs and preferences in order to constantly enhance our services and improve our Apps and Services.</p>
                                    <p>You may at any time disable collection of your data by Google Analytics, as described here - <a href="https://tools.google.com/dlpage/gaoptout/" target="_blank">https://tools.google.com/dlpage/gaoptout/</a>.</p>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <h3 id="privacy_4">4. HOW WE USE YOUR PERSONAL DATA</h3>

                    <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>

                    <ul>
                        <li>
                            <p>Where we need to perform the contract we have entered into with you.</p>
                        </li>
                        <li>
                            <p>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</p>
                        </li>
                        <li>
                            <p>Where we need to comply with a legal or regulatory obligation.</p>
                        </li>
                    </ul>

                    <p>Please see information below to find out more about the types of lawful basis that we will rely on to process your personal data.</p>
                    <p>Generally we do not rely on consent as a legal basis for processing your personal data.</p>

                    <h4>PURPOSES FOR WHICH WE WILL USE YOUR PERSONAL DATA</h4>

                    <p>We have set out below, in a table format, a description of all the ways we plan to use your personal data, and which of the legal bases we rely on to do so. We have also identified what our legitimate interests are where appropriate.</p>
                    <p>Note that we may process your personal data for more than one lawful ground depending on the specific purpose for which we are using your data. Please <a href="#contact">Contact us</a> if you need details about the specific legal ground we are relying on to process your personal data where more than one ground has been set out in the table below.</p>

                    <div className="privacy__content-page" title="Page 5">

                    <div className="privacy__content__table-wrap">
                        <table className="table table-striped privacy__content__table article">
                            <thead>
                                <tr>
                                    <th>
                                        Purpose/Activity
                                    </th>
                                    <th>
                                        Type of data
                                    </th>
                                    <th>
                                        Lawful basis for processing including basis of legitimate interest
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                            <tr>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>To register you as a new user</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>(a)&nbsp;Identity<br />(b)&nbsp;Contact</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>Performance of a contract with you</p>
                            </div>
                            </div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>To provide you services including:</p>
                            <p>(a)&nbsp;provide identity verification</p>
                            <p>(b)&nbsp;confirm to External Third Parties your status as &ldquo;verified,&rdquo; &ldquo;not verified,&rdquo; or &ldquo;verification in progress&rdquo;</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>(a)&nbsp;Identity<br />(b)&nbsp;Contact</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>(a)&nbsp;Performance of a contract with you</p>
                            <p>(b)&nbsp;Necessary to comply with a legal obligation in particular to satisfy KYC/AML legislation</p>
                            </div>
                            </div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>To manage our relationship with you which will include:</p>
                            <p>(a)&nbsp;Notifying you about changes to our terms or privacy policy</p>
                            <p>(b)&nbsp;Asking you to leave a review or take a survey</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>(a)&nbsp;Identity<br />(b)&nbsp;Contact</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>(a)&nbsp;Performance of a contract with you</p>
                            <p>(b)&nbsp;Necessary to comply with a legal obligation</p>
                            <p>(c)&nbsp;Necessary for our legitimate interests (to keep our records updated and to study how customers use our products/services)</p>
                            </div>
                            </div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance, support, reporting and hosting of data)</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>(a)&nbsp;Identity<br />(b)&nbsp;Contact<br />(c)&nbsp;Technical<br />(d)&nbsp;Usage</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>(a)&nbsp;Necessary for our legitimate interests (for running our business, provision of administration and IT services, network security, to prevent fraud and in the context of a business reorganisation or group restructuring exercise)</p>
                            <p>(b)&nbsp;Necessary to comply with a legal obligation</p>
                            </div>
                            </div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>To use data analytics to improve our website and services, customer relationships and experiences</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>(a)&nbsp;Technical<br />(b)&nbsp;Usage</p>
                            </div>
                            </div>
                            </td>
                            <td>
                            <div className="layoutArea">
                            <div className="column">
                            <p>Necessary for our legitimate interests (to define types of customers for our services, to keep our website updated and relevant, to develop our business and to inform our marketing strategy)</p>
                            </div>
                            </div>
                            </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>

                    <div className="privacy__content-page" title="Page 6">
                    <div className="layoutArea">
                    <div className="column">
                    <h4>THIRD-PARTY MARKETING</h4>
                    <p>We will get your express opt-in consent before and if we share your personal data with any company outside the ICOBox group of companies for marketing purposes.</p>
                    <h4>COOKIES</h4>
                    <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly. For more information about the cookies we use, please see <a href="https://icosid.com/cookiepolicy" target="_blank">https://icosid.com/cookiepolicy</a></p>
                    <h4>CHANGE OF PURPOSE</h4>
                    <p>We will only use your personal data for the purposes for which we collected it, unless we reasonably consider that we need to use it for another reason and that reason is compatible with the original purpose. If you wish to get an explanation as to how the processing for the new purpose is compatible with the original purpose, please <a href="#contact">Contact us</a>.</p>
                    <p>If we need to use your personal data for an unrelated purpose, we will notify you and we will explain the legal basis which allows us to do so.</p>
                    <p>Please note that we may process your personal data without your knowledge or consent, in compliance with the above rules, where this is required or permitted by law.</p>
                    <h4>WHERE WE STORE YOUR INFORMATION</h4>
                    <p>We store your personal data on servers located within the European Union. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this privacy policy.</p>

                    <h2 id="privacy_5">5. DISCLOSURES OF YOUR PERSONAL DATA</h2>

                    <p>We may have to share your personal data with the parties set out below for the purposes set out in the table in paragraph 4 above.</p>

                    <ul>
                        <li>
                            <p>Internal Third Parties as set out in the <a href="#privacy_10">Glossary</a>.</p>
                        </li>
                        <li>
                            <p>External Third Parties as set out in the <a href="#privacy_10">Glossary</a> only after your explicit consent to such disclosure.</p>
                        </li>
                        <li>
                            <p>Specific third parties such as service providers acting as processors based in the EU who provide identity verification services. In particular in order to offer our clients, who are seeking to license our KYC/AML-compliant ICOSID platform, we are collaborating with Sum And Substance Ltd. (<b>Sumsub</b>), one of the leading identity verification providers on the market. All information, data and documents submitted to our clients via ICOSID platform by their customers for KYC/AML check, are transferred directly to Sumsub. Sumsub Privacy Policy is available at: <a href="https://sumsub.com/privacy-and-cookie-policy" target="_blank">https://sumsub.com/privacy-and-cookie-policy</a>. Sumsub is registered with the UK Information Commissioner's Office under the terms of the Data Protection Act 1998 (registration number ZA222205) and carries out its operations in compliance with EU, UK, US and other applicable laws and regulations.</p>
                        </li>
                        <li>
                            <p>Third parties to whom we may choose to sell, transfer, or merge parts of our business or our assets. Alternatively, we may seek to acquire other businesses or merge with them. If a change happens to our business, then the new owners may use your personal data in the same way as set out in this privacy notice.</p>
                        </li>
                    </ul>

                    </div>
                    </div>
                    </div>
                    <div className="privacy__content-page" title="Page 7">
                    <div className="layoutArea">
                    <div className="column">

                    <p>We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.</p>

                    <h3 id="privacy_6">6. INTERNATIONAL TRANSFERS</h3>

                    <p>We share your personal data within the ICOBox Group. This will involve transferring your data outside the European Economic Area (<a href="EEA"></a>).</p>
                    <p>We ensure your personal data is protected by requiring all our group companies to follow the same rules when processing your personal data. These rules are called &ldquo;binding corporate rules&rdquo;. For further details, see <a href="https://ec.europa.eu/info/law/law-topic/data-protection/data-transfers-outside-eu/binding-corporate-rules_en" target="_blank">European Commission: Binding corporate rules</a>.</p>

                    <p>Whenever we transfer your personal data out of the EEA, we ensure a similar degree of protection is afforded to it by ensuring the following safeguards is implemented:</p>

                    <ul>
                        <li>
                            <p>Where we use certain service providers outside the European Economic Area, we may use specific contracts approved by the European Commission which give personal data the same protection it has in Europe. For further details, see <a href="https://ec.europa.eu/info/law/law-topic/data-protection/data-transfers-outside-eu/model-contracts-transfer-personal-data-third-countries_en" target="_blank">European Commission: Model contracts for the transfer of personal data to third countries</a>.</p>
                        </li>
                    </ul>

                    <p>Please <a href="#contact">Contact us</a> if you want further information on the specific mechanism used by us when transferring your personal data out of the EEA.</p>

                    <h3 id="privacy_7">7. DATA SECURITY</h3>

                    <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.</p>
                    <p>We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.</p>
                    <p>Numerous studies have established that data stored in the cloud is less likely to be lost, deleted or leaked than data stored on a personal computer. All our data is fully encrypted at rest and in transit, and we employ state-of-the-art firewall and back-up technology. All our data is continuously backed up in several high security access-controlled data centers in different locations.</p>
                    </div>
                    </div>
                    </div>
                    <div className="privacy__content-page" title="Page 8">
                    <div className="layoutArea">
                    <div className="column">

                    <h3 id="privacy_8">8. DATA RETENTION</h3>
                    <h4>HOW LONG WILL YOU USE MY PERSONAL DATA FOR?</h4>

                    <p>We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal or reporting requirements.</p>
                    <p>To determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorised use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal requirements.</p>
                    <p>Details of retention periods for different aspects of your personal data are available in our retention policy which you can request from us by <a href="#contact">Contacting us</a>.</p>
                    <p>In some circumstances you can ask us to delete your data: see <a href="#request_erasure">Request erasure</a> below for further information.</p>
                    <p>Please note that if personal data is erased at your request, we will only retain such copies of the information as are necessary to protect our or third party legitimate interests, comply with governmental orders, resolve disputes, troubleshoot problems, or enforce any agreement you have entered into with us.</p>
                    <p>In some circumstances we may anonymise your personal data (so that it can no longer be associated with you) for research or statistical purposes in which case we may use this information indefinitely without further notice to you.</p>

                    <h3 id="privacy_9">9. YOUR LEGAL RIGHTS</h3>

                    <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data. Please click on the links below to find out more about these rights:</p>

                    <ul>
                        <li>
                            <p>
                                <a href="#request_access">Request access to your personal data</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="#request_correction">Request correction of your personal data</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="#request_erasure">Request erasure of your personal data</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="#object_processing">Object to processing of your personal data</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="#request_restriction">Request restriction of processing your personal data</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="#request_transfer">Request transfer of your personal data</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                <a href="#rights_consent">Right to withdraw consent</a>
                            </p>
                        </li>
                    </ul>

                    <p>If you wish to exercise any of the rights set out above, please <a href="#contact">Contact us</a>.</p>

                    <h4>NO FEE USUALLY REQUIRED</h4>
                    </div>
                    </div>
                    </div>
                    <div className="privacy__content-page" title="Page 9">
                    <div className="layoutArea">
                    <div className="column">
                    <p>You will not have to pay a fee to access your personal data (or to exercise any of the other rights). However, we may charge a reasonable fee if your request is clearly unfounded, repetitive or excessive. Alternatively, we may refuse to comply with your request in these circumstances.</p>

                    <h4>WHAT WE MAY NEED FROM YOU</h4>

                    <p>We may need to request specific information from you to help us confirm your identity and ensure your right to access your personal data (or to exercise any of your other rights). This is a security measure to ensure that personal data is not disclosed to any person who has no right to receive it. We may also contact you to ask you for further information in relation to your request to speed up our response.</p>

                    <h4>TIME LIMIT TO RESPOND</h4>

                    <p>We try to respond to all legitimate requests within one month. Occasionally it may take us longer than a month if your request is particularly complex or you have made a number of requests. In this case, we will notify you and keep you updated.</p>

                    <h3 id="privacy_10">10. GLOSSARY</h3>

                    <h4>LAWFUL BASIS</h4>

                    <p><b>Legitimate Interest</b> means the interest of our business in conducting and managing our business to enable us to give you the best service/product and the best and most secure experience. We make sure we consider and balance any potential impact on you (both positive and negative) and your rights before we process your personal data for our legitimate interests. We do not use your personal data for activities where our interests are overridden by the impact on you (unless we have your consent or are otherwise required or permitted to by law). You can obtain further information about how we assess our legitimate interests against any potential impact on you in respect of specific activities by <a href="#contact">Contacting us</a></p>
                    <p><b>Performance of Contract</b> means processing your data where it is necessary for the performance of a contract to which you are a party or to take steps at your request before entering into such a contract.</p>
                    <p><b>Comply with a legal or regulatory obligation</b> means processing your personal data where it is necessary for compliance with a legal or regulatory obligation that we are subject to.</p>

                    <h4>THIRD PARTIES</h4>
                    <h4>INTERNAL THIRD PARTIES</h4>
                    <p>Other companies in the ICOBox Group acting as processors and who are based in Russian Federation and provide IT and system administration services.</p>
                    <h4>EXTERNAL THIRD PARTIES</h4>
                    <p>Other companies acting as processors based in the EU or outside EU who rely on our identity verification services and to whom after your explicit consent we may share as &ldquo;verified,&rdquo; &ldquo;not verified,&rdquo; or &ldquo;verification in progress&rdquo;.</p>
                    <h4>YOUR LEGAL RIGHTS</h4>
                    </div>
                    </div>
                    </div>
                    <div className="privacy__content-page" title="Page 10">
                    <div className="layoutArea">
                    <div className="column">
                    <p>You have the right to:</p>
                    </div>
                    </div>
                    <div className="layoutArea">
                    <div className="column">

                    <p id="request_access"><b>Request access</b> to your personal data (commonly known as a &ldquo;data subject access request&rdquo;). This enables you to receive a copy of the personal data we hold about you and to check that we are lawfully processing it.</p>
                    <p id="request_correction"><b>Request correction</b> of the personal data that we hold about you. This enables you to have any incomplete or inaccurate data we hold about you corrected, though we may need to verify the accuracy of the new data you provide to us.</p>
                    <p id="request_erasure"><b>Request erasure</b> of your personal data. This enables you to ask us to delete or remove personal data where there is no good reason for us continuing to process it. You also have the right to ask us to delete or remove your personal data where you have successfully exercised your right to object to processing (see below), where we may have processed your information unlawfully or where we are required to erase your personal data to comply with local law. Note, however, that we may not always be able to comply with your request of erasure for specific legal reasons which will be notified to you, if applicable, at the time of your request.</p>
                    <p id="object_processing"><b>Object to processing</b> of your personal data where we are relying on a legitimate interest (or those of a third party) and there is something about your particular situation which makes you want to object to processing on this ground as you feel it impacts on your fundamental rights and freedoms. You also have the right to object where we are processing your personal data for direct marketing purposes. In some cases, we may demonstrate that we have compelling legitimate grounds to process your information which override your rights and freedoms.</p>
                    <p id="request_restriction"><b>Request restriction of processing</b> of your personal data. This enables you to ask us to suspend the processing of your personal data in the following scenarios: (a) if you want us to establish the data&rsquo;s accuracy; (b) where our use of the data is unlawful but you do not want us to erase it; (c) where you need us to hold the data even if we no longer require it as you need it to establish, exercise or defend legal claims; or (d) you have objected to our use of your data but we need to verify whether we have overriding legitimate grounds to use it.</p>
                    <p id="request_transfer"><b>Request the transfer</b> of your personal data to you or to a third party. We will provide to you, or a third party you have chosen, your personal data in a structured, commonly used, machine-readable format. Note that this right only applies to automated information which you initially provided consent for us to use or where we used the information to perform a contract with you.</p>
                    <p id="rights_consent"><b>Withdraw consent at any time</b> where we are relying on consent to process your personal data. However, this will not affect the lawfulness of any processing carried out before you withdraw your consent. If you withdraw your consent, we may not be able to provide certain products or services to you. We will advise you if this is the case at the time you withdraw your consent.</p>

                    </div>
                    </div>

                    </div>
                    </div>
                    </div>
                    </div>
                </div>

                <div>
                    <a href="/static/images/documents/privacypolicy.pdf"><i className="ico-download"></i> Download pdf</a>
                </div>

            </div>
        );
    }
}

PrivacypolicyPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    PrivacypolicyPage: makeSelectPrivacypolicyPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacypolicyPage);
