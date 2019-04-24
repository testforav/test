/**
*
* Error
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Error extends React.Component {
    renderSimple() {
        return (
            <span className="">
                { this.props.error.id ?
                    <FormattedMessage
                        {...this.props.error}
                        values={
                            {
                                value: this.props.value,
                            }
                        }
                    />
                : this.props.error }
            </span>
        );
    }

    renderDefault() {
        return (
            <label className="error-hint is-visible">
                { this.props.error.id ?
                    <FormattedMessage
                        {...this.props.error}
                        values={
                            {
                                value: this.props.value,
                            }
                        }
                    />
                : this.props.error }
            </label>
        );
    }

    render() {
        if (this.props.view === 'simple') {
            return this.renderSimple();
        } else {
            return this.renderDefault();
        }
    }
}

Error.propTypes = {

};

export default Error;
