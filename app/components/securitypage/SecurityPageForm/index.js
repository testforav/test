/**
*
* SecurityPageForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import QRCode from 'qrcode.react';


import { rules, Form, Input, Select, Textarea } from 'react-validation/lib/build/validation.rc';

import Button from 'components/basic/Button';

import { showApiValidateError } from 'utils/helpers';
import { errorsShown } from 'core/containers/SecurityPage/actions';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import messages from './messages';

class SecurityPageForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
    removeApiError = (evt) => {
        this.form && evt.target.value && this.form.validate(evt.target.name);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.SecurityPage.formErrors.length) {
            nextProps.SecurityPage.formErrors.forEach((error) => {
                _debug('SecurityPage: ', error);
                this.form && this.form.showError(error.Key, showApiValidateError(error.Message));
            });

            this.props.dispatch(errorsShown());
        }
    }

    render() {
        const secretData = 'otpauth://totp/IcosId:' + this.props.userData.get('Email') + '?secret=' + this.props.SecurityPage.qrSecret + '&issuer=ICOS%20ID';
        return (
            <Form
            	className={
                    'modal-security__form'
                    + (this.props.SecurityPage.isFormLoading ? ' block-loading light' : '')
                }
                onSubmit={this.props.onSubmit}
                action="/"
                ref={(form) => {
                    this.form = form;
                }}
            >
                <div className="row">
                    <div className="col-xs-15 col-md-6 col-lg-6 col-xl-6 mobile-center">
                        <QRCode value={secretData} size={140} />
                    </div>
                    <div className="col-xs-15 col-md-9 col-lg-9 col-xl-9">
                        <div className="modal-security__form__content">
                            <div className="mobile-center">
                                <span><FormattedMessage {...messages.secret} /></span>
                                <h4 className="modal-security__secret">{ this.props.SecurityPage.qrSecret }</h4>
                            </div>

                            <div className="form-group form-control-wrap form-group_section">
                                <div className="">
                                    <Input
                                        className="form-control"
                                        id="code"
                                        type="text"
                                        name="G2fatkn"
                                        placeholder="Code"
                                        autoFocus={true}
                                        autoComplete="false"
                                        value=""
                                        validations={['required']}
                                        errorContainerClassName="error"
                                        errorClassName="control-error"
                                        onChange={ this.props.onChangeCode }
                                        onFocus={this.removeApiError}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <Button
                        uppercase
                        blue
                        formSubmit
                        className="modal-security__form__submit"
                    >
                        <FormattedMessage {...messages.confirm} />
                    </Button>
                </div>
            </Form>
        );
    }
}

SecurityPageForm.propTypes = {

};

export default SecurityPageForm;
