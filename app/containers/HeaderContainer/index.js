/*
 *
 * HeaderContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import Header from 'components/Header';
import RenderInComponent from 'components/RenderInComponent';
import { makeSelectUserData, makeSelectLoadings } from 'core/containers/App/selectors';
import { makeSelectLocale } from 'core/containers/LanguageProvider/selectors';

import makeSelectHeaderContainer from 'core/containers/HeaderContainer/selectors';
import messages from './messages';

export class HeaderContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {

    }
    componentDidUpdate(prevProps) {

    }
    render() {
        if (this.props.route.name === 'notfound') {
            return null;
        } else {
            return (
                <div>
                    <RenderInComponent
                        locale={this.props.locale}
                        target="header"
                        >
                        <Header
                            currency={this.props.HeaderContainer.header.currency}
                            userData={this.props.userData}
                            dispatch={this.props.dispatch}
                            globalLoadings={this.props.globalLoadings}
                            location={this.props.location}
                            route={this.props.route}
                            locale={this.props.locale}
                            router={this.props.router}
                        />
                    </RenderInComponent>
                </div>
            );
        }
    }
}

HeaderContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    HeaderContainer: makeSelectHeaderContainer(),
    userData: makeSelectUserData(),
    globalLoadings: makeSelectLoadings(),
    locale: makeSelectLocale()
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
