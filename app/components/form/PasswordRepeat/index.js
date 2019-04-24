/**
*
* PasswordRepeat
*
*/

import React from 'react';
// import styled from 'styled-components';
import Password from 'components/form/Password';
import Error from 'components/form/Error';
import { required } from 'utils/validators';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';

import { Field, reduxForm } from 'redux-form';

import zxcvbn from 'zxcvbn';

class PasswordRepeat extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            passValue: '',
            passRepeatValue: '',
            passStrScore: 'none',
        };
    }
    setValue(obj) {
        this.setState(obj);

        if (obj.passValue !== undefined) {
            const strState = obj.passValue ? zxcvbn(obj.passValue).score : 'none'
            this.setState({
                passStrScore: strState
            });
        }

        const state = {
            ...this.state,
            ...obj,
        }
        
        if (state.passValue === state.passRepeatValue) {
        	this.props.input.onChange(state.passValue);
        }
    }
    render() {
        return (
            <div>
            	<div className="row account__content__row form-group">
                    <div className="col-lg-4 col-sm-15 col-xs-15">
                        <div className="account__content__label text-secondary">
                            <label htmlFor="SomePassword"><FormattedMessage {...messages.newpass} /></label>
                        </div>
                    </div>
                    <div className="col-lg-7 col-sm-15 col-xs-15">
                        <div className="password-sneaker">
                            <Field
                                component={Password}
                                className="form-control form-control_transparent"
                                name="SomePassword"
                                placeholder={this.props.intl.formatMessage(messages.newpass)}
                                autoComplete="off"
                                tabIndex={1}
                                validate={ [ required ] }
                                value={ this.state.passValue }
                                onChange={(evt) => this.setValue({ passValue: evt.target.value })}
                            />

                            {
                                this.props.meta.touched && this.props.meta.error ? <Error error={this.props.meta.error} value={this.props.input.value} /> : null
                            }

                            <div
                                className={
                                    'password-strength-wrap score-'
                                    + this.state.passStrScore
                                }
                            >
                                <div className="password-strength__bar"></div>
                                <div className="password-strength__bar"></div>
                                <div className="password-strength__bar"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row account__content__row form-group">
                    <div className="col-lg-4 col-sm-15 col-xs-15">&nbsp;</div>
                    <div className="col-lg-7 col-sm-15 col-xs-15">
                        <div className="content-padding-vertical text-secondary text-hint">
                            <FormattedMessage {...messages.advice} />
                        </div>
                    </div>
                </div>

                <div className="row account__content__row form-group">
                    <div className="col-lg-4 col-sm-15 col-xs-15">
                        <div className="account__content__label text-secondary">
                            <label htmlFor="SomePasswordRepeat"><FormattedMessage {...messages.confirm} /></label>
                        </div>
                    </div>
                    <div className="col-lg-7 col-sm-15 col-xs-15">
                        <div className=" password-sneaker">
                            <Field
                                component={Password}
                                className="form-control form-control_transparent"
                                name="SomePasswordRepeat"
                                placeholder={this.props.intl.formatMessage(messages.confirm)}
                                autoComplete="off"
                                tabIndex={2}
                                value={ this.state.passRepeatValue }
                                validate={ [ required ] }
                                onChange={(evt) => this.setValue({ passRepeatValue: evt.target.value })}
                            />

                            {
                                this.props.meta.touched && this.props.meta.error ? <Error error={this.props.meta.error} value={this.props.input.value} /> : null
                            }

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PasswordRepeat.propTypes = {

};

export default injectIntl(PasswordRepeat);
