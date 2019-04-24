/**
*
* ModalConfirm
*
*/

import React from 'react';
// import styled from 'styled-components';
import ModalCommon from 'components/ModalCommon';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import messages from './messages';

class ModalConfirm extends React.Component { // eslint-disable-line react/prefer-stateless-function
    onCancel(e) {
        e.preventDefault();
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }
    onConfirm(e) {
        e.preventDefault();
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }
    renderButtons() {
        return (
            <div className="modal-confirm__buttons">
                <div className="modal-confirm__button">
                    <a href="#" onClick={(e) => this.onCancel(e)}>
                        <span>
                            {this.props.cancelText || this.props.intl.formatMessage(messages.cancel)}
                        </span>
                    </a>
                </div>
                <div className="modal-confirm__button">
                    <a href="#" onClick={(e) => this.onConfirm(e)}>
                        <span>
                            {this.props.confirmText || this.props.intl.formatMessage(messages.confirm)}
                        </span>
                    </a>
                </div>
            </div>
        );
    }
    render() {
        return (
            <ModalCommon
                {... this.props}
                Footer={this.renderButtons()}
            />
        );
    }
}

ModalConfirm.propTypes = {

};

export default injectIntl(ModalConfirm);
