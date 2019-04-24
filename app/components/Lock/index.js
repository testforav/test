/**
*
* VerificationLock
*
*/

import React from 'react';
import { Link } from 'react-router';


class Lock extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        if (!this.props.enabled) {
            return null;
        }
        return (
            <div className="verification-required">
                {this.props.children}
            </div>
        );
    }
}

Lock.propTypes = {

};

export default Lock;
