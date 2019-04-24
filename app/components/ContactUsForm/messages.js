/*
 * ContactUsForm Messages
 *
 * This contains all the text for the ContactUsForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    header: {
        id: 'app.components.ContactUsForm.header',
        defaultMessage: 'Contact Us',
    },
    subheader: {
        id: 'app.components.ContactUsForm.subheader',
        defaultMessage: 'How can we help you?',
    },
    name: {
        id: 'app.components.ContactUsForm.name',
        defaultMessage: 'Your Name (required)',
    },
    email: {
        id: 'app.components.ContactUsForm.email',
        defaultMessage: 'Your Email (required)',
    },
    phone: {
        id: 'app.components.ContactUsForm.phone',
        defaultMessage: 'Your Phone Number',
    },
    company: {
        id: 'app.components.ContactUsForm.company',
        defaultMessage: 'Your Company',
    },
    subject: {
        id: 'app.components.ContactUsForm.subject',
        defaultMessage: 'Your Subject',
    },
    message: {
        id: 'app.components.ContactUsForm.message',
        defaultMessage: 'Your Message (required)',
    },
    notificationHeader: {
        id: 'app.components.ContactUsForm.notificationHeader',
        defaultMessage: 'Captcha',
    },
    notificationMessage: {
        id: 'app.components.ContactUsForm.notificationMessage',
        defaultMessage: 'Please fill captcha first',
    },
});
