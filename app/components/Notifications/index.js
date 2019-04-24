/**
*
* Notifications
*
*/

import React from 'react';
import { AlertList } from 'react-bs-notifier';
import {
    hideNotification
} from 'core/containers/App/actions';

import { injectIntl, intlShape } from 'react-intl';

import _ from 'lodash';

class Notifications extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        const filteredNotifications = _.filter(this.props.notifications, (o) => !!o.message && !!o.message.id);
        const notifications = filteredNotifications.map((notification, i) => {
            _debug(notification);
            notification.message = this.props.intl.formatMessage(notification.message);
            if (notification.headline) {
                notification.headline = this.props.intl.formatMessage(notification.headline)
            }
            return notification;
        });
        return (
            <AlertList
                alerts={notifications}
                onDismiss={(notification) => {
                    _debug('onDismiss!!: ', notification);

                    this.props.dispatch(hideNotification(notification));
                }}
            />
        );
    }
}

Notifications.propTypes = {

};

export default injectIntl(Notifications);