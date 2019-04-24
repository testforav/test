/**
*
* CopyToClipboard
*
*/

import React from 'react';
import { showNotification } from 'core/containers/App/actions';
// import styled from 'styled-components';


class CopyToClipboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
    copyToClipboard() {
        const text = this.props.text;

        const textArea = document.createElement('textarea');

        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';

        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();

        _debug('text: ', text);

        try {
            document.execCommand('copy');

            if (this.props.onCopy) {
                this.props.onCopy(text);
            }
            if (this.props.message && this.props.dispatch) {
                this.props.dispatch(showNotification(this.props.message));
            }
        } catch (err) {
            _debug('Oops, unable to copy');
        }

        document.body.removeChild(textArea);
    }
    render() {
        return (
            <span
                className={this.props.className}
                onClick={() => this.copyToClipboard()}
            >
                {this.props.children ? this.props.children : <i />}
            </span>
        );
    }
}

CopyToClipboard.propTypes = {
    text: React.PropTypes.string,
};

export default CopyToClipboard;
