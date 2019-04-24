/**
*
* SecurityPage
*
*/

import React from 'react';
// import styled from 'styled-components';

import { rules, Form, Input, Select, Textarea, Button } from 'react-validation/lib/build/validation.rc';
import { showApiValidateError } from 'utils/helpers';
import { errorsShown } from 'core/containers/SecurityPage/actions';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import messages from './messages';

class SecurityPageDisableGoogleForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
    removeApiError = (evt) => {
        this.form && evt.target.value && this.form.validate(evt.target.name);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.SecurityPage.formErrors.length) {
            nextProps.SecurityPage.formErrors.forEach((error) => {
                this.form && this.form.showError(error.Key, showApiValidateError(error.Message));
            });

            this.props.dispatch(errorsShown());
        }
    }

    render() {
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
                <div className="form-group">
                    <div className="text-center">
                        <FormattedMessage {...messages.enter} />
                    </div>
                </div>
                <div className="form-group form-control-wrap form-group_section">
                    <div className="">
                        <Input
                            className="form-control"
                            id="G2fatkn"
                            type="text"
                            name="G2fatkn"
                            placeholder="G2fatkn"
                            autoFocus={true}
                            autoComplete="false"
                            value=""
                            validations={['required']}
                            errorContainerClassName="error"
                            errorClassName="control-error"
                            onChange={this.props.onChangeCode}
                            onFocus={this.removeApiError}
                        />
                    </div>
                </div>
                <div className="form-group text-center">
                    <Button className="btn btn_uppercase btn_blue btn_block form__submit">
                        <FormattedMessage {...messages.send} />
                    </Button>
                </div>
            </Form>
        );
    }
}

SecurityPageDisableGoogleForm.propTypes = {

};

export default SecurityPageDisableGoogleForm;
