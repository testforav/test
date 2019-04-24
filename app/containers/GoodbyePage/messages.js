/*
 * GoodbyePage Messages
 *
 * This contains all the text for the GoodbyePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
    header: {
        id: 'app.containers.GoodbyePage.header',
        defaultMessage: 'Account deleting',
    },
    success: {
        id: 'app.containers.GoodbyePage.success',
        defaultMessage: 'Your account has been successfully deleted.',
    },
    successAgain: {
        id: 'app.containers.GoodbyePage.successAgain',
        defaultMessage: 'You can sign up again at {url}.',
    },
    redirectTimer: {
        id: 'app.containers.GoodbyePage.redirectTimer',
        defaultMessage: 'Redirect to main page in {time} sec.',
    },
});
