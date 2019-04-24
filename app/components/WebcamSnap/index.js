/**
*
* WebcamSnap
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Webcam from 'webcamjs';
import Button from 'components/basic/Button';
import SvgIcon from 'components/SvgIcon';

class WebcamSnap extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isFreeze: false,
            errorText: undefined,
        };
    }
    componentDidMount() {
        Webcam.set({
            width: 420,
            height: 315,
        });

        Webcam.attach('#my_camera');

        Webcam.on('error', (err) => {
            _debug('error in webcam');
            this.setState({
                isLoading: false,
                errorText: 'You need to provide access to the camera of your laptop/phone if you want to take pictures.',
            });
        });
        Webcam.on('live', (err) => {
            _debug('webcam is enabled: ');
            this.setState({
                isLoading: false,
            });
        });
    }
    componentWillUnmount() {
        _debug('webcam unmount: ');
        Webcam.reset();
        Webcam.off('error');
        Webcam.off('live');
    }
    takeSnap() {
        Webcam.freeze();
        this.setState({
            isFreeze: true,
        });
    }
    abortSnap() {
        Webcam.unfreeze();
        this.setState({
            isFreeze: false,
        });
    }
    confirmSnap() {
        Webcam.snap(this.props.onSuccess);
    }
    render() {
        return (
            <div className={(this.state.isLoading ? 'block-loading' : '')}>

                {
                    this.state.errorText ? (
                        <h1>{this.state.errorText}</h1>
                    ) : (
                        <div>
                            <div className={
                                "verification__modal__body"
                            }>
                                <div className="verification__modal__body-column">
                                    <div 
                                        className="webcam__canvas"
                                    >
                                        <div id="my_camera" />
                                    </div>
                                </div>
                                <div className="verification__modal__body-column">
                                    <div className="verification__modal__body-preview" />
                                </div>       
                            </div>
                            <div className="text-center webcam__buttons">
                                <Button
                                    noForm
                                    aqua
                                    onClick={this.takeSnap.bind(this)}
                                    className={
                                        this.state.isFreeze ? 'verification__photo__btn hidden' : 'verification__photo__btn'
                                    }
                                >
                                    Take image
                                    <SvgIcon name="camera" />
                                </Button>
                                <Button
                                    noForm
                                    white
                                    wide
                                    onClick={this.abortSnap.bind(this)}
                                    className={
                                        this.state.isFreeze ? '' : 'hidden'
                                    }
                                >
                                    Abort
                                </Button>
                                <Button
                                    noForm
                                    aqua
                                    wide
                                    onClick={this.confirmSnap.bind(this)}
                                    className={
                                        this.state.isFreeze ? '' : 'hidden'
                                    }
                                >
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    )
                }


            </div>
        );
    }
}

WebcamSnap.propTypes = {
    onError: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
};

export default WebcamSnap;
