/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    licenseMessage: {
        id: 'boilerplate.components.Footer.license.message',
        defaultMessage: '© 2017 Icosid',
    },
    help: {
        id: 'boilerplate.components.Footer.license.help',
        defaultMessage: 'FAQ',
    },
    contactUs: {
        id: 'boilerplate.components.Footer.contactUs',
        defaultMessage: 'Contact Us',
    },
    authorMessage: {
        id: 'boilerplate.components.Footer.author.message',
        defaultMessage: `
      Made with love by {author}.
    `,
    },
});
