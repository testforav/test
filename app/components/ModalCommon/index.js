/**
*
* ModalCommon
*
*/

import React from 'react';
import { Modal } from 'react-bootstrap';


class ModalCommon extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <Modal
                show={this.props.showModal}
                onHide={this.props.onHide}
                onEntered={this.props.onEntered ? this.props.onEntered : () => {}}
                backdrop={(this.props.backdrop ? this.props.backdrop : true)}
                className={
                    'modal-common '
                    + (this.props.className ? this.props.className : '')
                }
            >
                <div
                    className={
                        ''
                        + (this.props.isLoading ? ' block-loading' : '')
                    }
                >
                    {
                        this.props.hideHeader
                        ? null
                        : (
                            <Modal.Header closeButton={!this.props.hideClose}>
                                {this.props.headerText}
                            </Modal.Header>
                        )
                    }
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>

                    {(this.props.Footer) ? (
                        <Modal.Footer>
                            {this.props.Footer}
                        </Modal.Footer>
                    ) : <i />}
                </div>
            </Modal>
        );
    }
}

ModalCommon.propTypes = {

};

export default ModalCommon;
