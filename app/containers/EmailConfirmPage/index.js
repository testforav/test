/*
 *
 * EmailConfirmPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import messages from './messages';

import { createStructuredSelector } from 'reselect';
import makeSelectEmailConfirmPage from 'core/containers/EmailConfirmPage/selectors';
import {
    submitEmailConfirmPage,
} from 'core/containers/EmailConfirmPage/actions';

import {
    makeSelectConsent
} from 'core/containers/App/selectors';

import EmailConfirmPageForm from 'components/EmailConfirmPageForm';

import { onSubmitActions } from 'utils/formSubmit';

import {
    SUBMIT_SUCCESS_ACTION,
    SUBMIT_ERROR_ACTION,
} from 'core/containers/EmailConfirmPage/constants';

export class EmailConfirmPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(submitEmailConfirmPage({
            Pin: this.props.location.query.pin, 
            Token: this.props.location.query.token, 
            Consent: this.props.consent,
        }));
    }
    render() {
        return (
            <div className="content content_slim main__container">
                <Helmet
                    title="Email Confirm"
                    meta={[
                        { name: 'description', content: 'Safe Joint Between Your Cash and Crypto World' },
                    ]}
                />

                <div className="main__column main__column-single">
                    <div className="main__column__text">
                        <h1 className="main__title"><FormattedMessage {...messages.header} /></h1>
                    </div>

                    <EmailConfirmPageForm
                        getFormState={state => state.get('form')} 
                        {... this.props}
                        onSubmit={ onSubmitActions(submitEmailConfirmPage, SUBMIT_SUCCESS_ACTION, SUBMIT_ERROR_ACTION) }
                        initialValues={
                            {
                                Pin: this.props.location.query.pin, 
                                Token: this.props.location.query.token, 
                                Consent: this.props.consent,
                            }
                        }
                    />

                </div>
            </div>
        );
    }
}

EmailConfirmPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    EmailConfirmPage: makeSelectEmailConfirmPage(),
    consent: makeSelectConsent(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmPage);
