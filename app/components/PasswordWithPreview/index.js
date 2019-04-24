/**
*
* PasswordWithPreview
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Input } from 'react-validation/lib/build/validation.rc';
import SvgIcon from 'components/SvgIcon';

class PasswordWithPreview extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            type: 'password',
        };
    }
    toggleType() {
        this.setState({
            type: (this.state.type === 'password') ? 'text' : 'password',
        });
    }
    render() {
        return (
            <div className="password-with-preview">
                <Input
                    type={this.state.type}
                    {... this.props}
                />
                <span 
                    className="password-with-preview-ico"
                    onClick={()=> this.toggleType()}
                >
                    <SvgIcon 
                        name={(this.state.type === 'password') ? 'eye' : 'eye-blocked'}
                    />
                </span>
            </div>
        );
    }
}

PasswordWithPreview.propTypes = {

};

export default PasswordWithPreview;
