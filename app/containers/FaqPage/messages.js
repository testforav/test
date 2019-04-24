/*
 * FaqPage Messages
 *
 * This contains all the text for the FaqPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    header: {
        id: 'app.containers.FaqPage.header',
        defaultMessage: 'FAQ',
    },
    notificationHeader: {
        id: 'app.components.FaqPage.notificationHeader',
        defaultMessage: 'Captcha',
    },
    notificationMessage: {
        id: 'app.components.FaqPage.notificationMessage',
        defaultMessage: 'Please fill captcha first',
    },
    headerSecurity: {
        id: 'app.containers.FaqPage.headerSecurity',
        defaultMessage: 'Data, Security and Privacy',
    },
    headerAccount: {
        id: 'app.containers.FaqPage.headerAccount',
        defaultMessage: 'Accounts and Billing',
    },
    headerChecks: {
        id: 'app.containers.FaqPage.headerChecks',
        defaultMessage: 'Our Checks',
    },
    kycAml: {
        id: 'app.containers.FaqPage.kycAml',
        defaultMessage: 'KYC/AML verification',
    },
    q1_1: {
        id: 'app.containers.FaqPage.q1_1',
        defaultMessage: 'Where do you get your data?',
    },
    a1_1: {
        id: 'app.containers.FaqPage.a1_1',
        defaultMessage: 'ICOSID and our partners are plugged into hundreds of registered databases and data sources, extracting up-to-date information every time an identity check is requested. We aggregate multiple suppliers to maximize match rates for a variety of checks.',
    },
    q1_2: {
        id: 'app.containers.FaqPage.q1_2',
        defaultMessage: 'How do you access these databases?',
    },
    a1_2: {
        id: 'app.containers.FaqPage.a1_2',
        defaultMessage: 'All actual data processing is conducted by ICOSID\'s partner sumsub.com, which is registered with the UK Information Commissioner\'s Office under the terms of the Data Protection Act 1998 (registration number Z2709206) and carries out its operations in compliance with EU, UK, US and other applicable laws and regulations.',
    },
    q1_3: {
        id: 'app.containers.FaqPage.q1_3',
        defaultMessage: 'Do you sell my information or my applicants data?',
    },
    a1_3: {
        id: 'app.containers.FaqPage.a1_3',
        defaultMessage: 'No, we do not sell any information about you or your applicants to anyone.',
    },
    q1_4: {
        id: 'app.containers.FaqPage.q1_4',
        defaultMessage: 'Are your checks international?',
    },
    a1_4: {
        id: 'app.containers.FaqPage.a1_4',
        defaultMessage: 'Yes, we carry out checks on individuals in 132 countries.',
    },
    q1_5: {
        id: 'app.containers.FaqPage.q1_5',
        defaultMessage: 'Can I store the information on my employees for future reference?',
    },
    a1_5: {
        id: 'app.containers.FaqPage.a1_5',
        defaultMessage: 'You may legally keep the information for the length of time they are working for your company. However, you must delete their information within 7 years of the employment ending.',
    },
    q1_6: {
        id: 'app.containers.FaqPage.q1_6',
        defaultMessage: 'How secure is your cloud-based solution?',
    },
    a1_6: {
        id: 'app.containers.FaqPage.a1_6',
        defaultMessage: 'Numerous studies have established that data stored in the cloud is less likely to be lost, deleted or leaked than data stored on a personal computer. All our data is fully encrypted at rest and in transit, and we employ state-of-the-art firewall and back-up technology. All our data is continuously backed up in several high security access-controlled data centers in different locations.',
    },
    q1_7: {
        id: 'app.containers.FaqPage.q1_7',
        defaultMessage: 'What happens if I accidentally delete an applicant’s data? Will I be able to retrieve it?',
    },
    a1_7: {
        id: 'app.containers.FaqPage.a1_7',
        defaultMessage: 'Just in case you accidentally delete a record, we hold a backup on a secure remote server that holds the data for 24 hours.',
    },
    q1_8: {
        id: 'app.containers.FaqPage.q1_8',
        defaultMessage: 'Isn’t this an invasion of privacy?',
    },
    a1_8: {
        id: 'app.containers.FaqPage.a1_8',
        defaultMessage: 'We never carry out any checks without the applicant’s consent.',
    },
    q1_9: {
        id: 'app.containers.FaqPage.q1_9',
        defaultMessage: 'How long is the applicant’s data held?',
    },
    a1_9: {
        id: 'app.containers.FaqPage.a1_9',
        defaultMessage: 'An applicant\'s data is held as long as an applicant gives us their consent and is deleted as soon as the applicant or their employer requests that it be deleted.',
    },
    q1_10: {
        id: 'app.containers.FaqPage.q1_10',
        defaultMessage: 'What about security?',
    },
    a1_10: {
        id: 'app.containers.FaqPage.a1_10',
        defaultMessage: 'Security is the top priority for everyone at ICOSID and our partners. We structure our Security & Compliance Frameworks around what\'s important: your Information.',
    },
    q2_1: {
        id: 'app.containers.FaqPage.q2_1',
        defaultMessage: 'Will you charge me a monthly fee?',
    },
    a2_1: {
        id: 'app.containers.FaqPage.a2_1',
        defaultMessage: 'No. With the service, there are no monthly bills or payments. Our system is completely pay-as-you-go, and you’re free to top up whenever you like.',
    },
    q2_2: {
        id: 'app.containers.FaqPage.q2_2',
        defaultMessage: 'Is there a minimum spend?',
    },
    a2_2: {
        id: 'app.containers.FaqPage.a2_2',
        defaultMessage: 'No. You can buy as many checks as you like through our pay-as-you-go system.',
    },
    q2_3: {
        id: 'app.containers.FaqPage.q2_3',
        defaultMessage: 'What are my payment options?',
    },
    a2_3: {
        id: 'app.containers.FaqPage.a2_3',
        defaultMessage: 'Payment is automatically charged to your card at the end of each calendar month. Only completed checks are billed, there are no additional setup fees or additional charges unless otherwise specified.',
    },
    q2_4: {
        id: 'app.containers.FaqPage.q2_4',
        defaultMessage: 'Can I cancel my account?',
    },
    a2_4: {
        id: 'app.containers.FaqPage.a2_4',
        defaultMessage: 'You can always delete your account and all data in it. We ensure that data is irrevocably deleted once the need for it has ended, in accordance with Data Protection Regulations.',
    },
    q2_5: {
        id: 'app.containers.FaqPage.q2_5',
        defaultMessage: 'Do I need to pay for extra users?',
    },
    a2_5: {
        id: 'app.containers.FaqPage.a2_5',
        defaultMessage: 'No. You can add as many users as you want to your account.',
    },
    q2_6: {
        id: 'app.containers.FaqPage.q2_6',
        defaultMessage: 'Do you offer discounts?',
    },
    a2_6: {
        id: 'app.containers.FaqPage.a2_6',
        defaultMessage: 'Yes: with ICOSID and partners, you receive discounts depending on the amount you top up. Take a look at our Pricing to see exactly how the system works.',
    },
    q3_1: {
        id: 'app.containers.FaqPage.q3_1',
        defaultMessage: 'If I’m employing someone, when should I carry out a background check?',
    },
    a3_1: {
        id: 'app.containers.FaqPage.a3_1',
        defaultMessage: 'You should always carry out a background check on an applicant before they start work, and tell the applicant that the offer of employment is dependent on a completed background check. This way, you can ensure that undesirable applicants (i.e. those who have something to hide) will have an incentive to complete the check before they can start work. You may wish to subsequently withdraw the offer of employment based on the results of the check.',
    },
    q3_2: {
        id: 'app.containers.FaqPage.q3_2',
        defaultMessage: 'Can I carry out a check on someone without them knowing?',
    },
    a3_2: {
        id: 'app.containers.FaqPage.a3_2',
        defaultMessage: 'You cannot legally access personal information about an individual without first obtaining their permission. You must first collect the consent of the individual before running checks on them with the service.',
    },
    notfound: {
        id: 'app.containers.FaqPage.notfound',
        defaultMessage: 'Couldn\'t find what you were looking for? Please {contact}',
    },
    notfoundContact: {
        id: 'app.containers.FaqPage.notfoundContact',
        defaultMessage: 'contact us',
    },
    about_title: {
        id: 'app.containers.FaqPage.about_title',
        defaultMessage: 'About ICOSID',
    },
    about_a1: {
        id: 'app.containers.FaqPage.about_a1',
        defaultMessage: 'Snowfox Technologies offers white label tech solutions for blockchain start-ups. The company is currently working with more than 80+ clients who are bringing new blockchain-based products and services to the market. Our clients include successful projects such as Shivom, Storiqa, Crypterium, INS ecosystem etc., and we are constantly expanding our client based.',
    },
    about_q1: {
        id: 'app.containers.FaqPage.about_q1',
        defaultMessage: 'Who are you?',
    },
    about_a2: {
        id: 'app.containers.FaqPage.about_a2',
        defaultMessage: 'ICOSID is the newest feature introduced to our {bb} platform. ICOSID is a single user ID verification and authorization tool providing safety and security to users. The new service is designed to meet the KYC (Know Your Customer) and Anti Money Laundering (AML) requirements.',
    },
    about_q2: {
        id: 'app.containers.FaqPage.about_q2',
        defaultMessage: 'Our service',
    },
    about_a3: {
        id: 'app.containers.FaqPage.about_a3',
        defaultMessage: 'In order to offer our clients, who are seeking to license our KYC/AML-compliant ICOSID platform, we are collaborating with sumsub.com, one of the leading identity verification providers on the market. All information, data and documents submitted to our clients via ICOSID platform by their customers for KYC/AML check, are transferred directly to sumsub.com. Neither we nor our client do not process the customers\' personal data in any way (such as collection, recording, organization, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, blocking, erasure or destruction). Personal data and other related information, such as photos, documents etc. are provided by customers directly to sumsub.com. The only information our clients come into possession regarding to their customers is strictly the “verified,” “not verified,” or “verification in progress” status of customers accounts.',
    },
    about_q3: {
        id: 'app.containers.FaqPage.about_q3',
        defaultMessage: 'Verification process',
    },
    about_q4: {
        id: 'app.containers.FaqPage.about_q4',
        defaultMessage: 'Details about our partner',
    },
    about_a4: {
        id: 'app.containers.FaqPage.about_a4',
        defaultMessage: 'Onfido is a UK company (Company Registration Number: 07479524) and is registered with the Information Commissioner under the terms of the Data Protection Act 1998 (registration number Z2709206). Onfido processes personal data in compliance with the EU, UK, United States and other applicable laws and regulations. For further information and details on security matters please refer at Onfido’s website {link}',
    },
    about_q6: {
        id: 'app.containers.FaqPage.about_q6',
        defaultMessage: 'Our advantages',
    },
    about_a6: {
        id: 'app.containers.FaqPage.about_a6',
        defaultMessage: 'In detail, our advantages are described here: for {linkBuyers} and for {linkPerspective}',
    },
    buyers: {
        id: 'app.containers.FaqPage.buyers',
        defaultMessage: 'Tokens buyers',
    },
    icos: {
        id: 'app.containers.FaqPage.icos',
        defaultMessage: 'Prospective ICO',
    },
    about_q5: {
        id: 'app.containers.FaqPage.about_q5',
        defaultMessage: 'I want to delete my account. How can I do that?',
    },
    about_a5: {
        id: 'app.containers.FaqPage.about_a5',
        defaultMessage: 'If you want to delete your account, please to go {link} page and click "Delete Account" button. You need to be logged in to perform this action.',
    },
    about_a5_form: {
        id: 'app.containers.FaqPage.about_a5_form',
        defaultMessage: 'Account Privacy',
    },
});
