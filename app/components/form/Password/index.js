/**
*
* PasswordWithPreview
*
*/

import React from 'react';
// import styled from 'styled-components';
import Input from 'components/form/Input';
import InputRound from 'components/form/InputRound';
import SvgIcon from 'components/SvgIcon';

class Password extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
        _debug('password meta: ', !!this.props.input.value, this.props.input);

        return (
            <div className={"password-with-preview" + (this.props.view === 'round' ? ' round' : '')}>
                {
                    this.props.view === 'round'
                    ? (
                        <InputRound
                            type={this.state.type}
                            {... this.props}
                        />
                    ) : (
                        <Input
                            type={this.state.type}
                            {... this.props}
                        />
                    )
                }
                <span
                    className={"password-with-preview-ico" + (!!this.props.input.value ? '' : ' hidden')}
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

Password.propTypes = {

};

export default Password;
