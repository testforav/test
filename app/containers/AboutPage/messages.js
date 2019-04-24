/*
 * AboutPage Messages
 *
 * This contains all the text for the AboutPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    header_who: {
        id: 'app.containers.AboutPage.header_who',
        defaultMessage: 'Who Are You?',
    },
    text_who: {
        id: 'app.containers.AboutPage.text_who',
        defaultMessage: 'Snowfox Technologies offers white label tech solutions for blockchain start-ups. The company is currently working with more than 80+ clients who are bringing new blockchain-based products and services to the market. Our clients include successful projects such as Shivom, Storiqa, Crypterium, INS ecosystem etc., and we are constantly expanding our client based.',
    },
    header_service: {
        id: 'app.containers.AboutPage.header_service',
        defaultMessage: 'Our Service',
    },
    text_service: {
        id: 'app.containers.AboutPage.text_service',
        defaultMessage: 'ICOSID is the newest feature introduced to our book building platform. ICOSID is a single user ID verification and authorization tool providing safety and security to users. The new service is designed to meet the KYC (Know Your Customer) and Anti Money Laundering (AML) requirements.',
    },
    header_verification: {
        id: 'app.containers.AboutPage.header_verification',
        defaultMessage: 'Verifiction Process',
    },
    text_verification: {
        id: 'app.containers.AboutPage.text_verification',
        defaultMessage: 'In order to offer our clients, who are seeking to license our KYC/AML-compliant ICOSID platform, we are collaborating with sumsub.com, one of the leading identity verification providers on the market. All information, data and documents submitted to our clients via ICOSID platform by their customers for KYC/AML check, are transferred directly to sumsub.com. Neither we nor our client do not process the customers\' personal data in any way (such as collection, recording, organization, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, blocking, erasure or destruction). Personal data and other related information, such as photos, documents etc. are provided by customers directly to sumsub.com. The only information our clients come into possession regarding to their customers is strictly the “verified,” “not verified,” or “verification in progress” status of customers accounts.',
    },
    text_onfido: {
        id: 'app.containers.AboutPage.text_onfido',
        defaultMessage: 'Onfido is a UK company (Company Registration Number: 07479524) and is registered with the Information Commissioner under the terms of the Data Protection Act 1998 (registration number Z2709206). Onfido processes personal data in compliance with the EU, UK, United States and other applicable laws and regulations. For further information and details on security matters please refer at sumsub.com website {link}',
    },
});
