/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import GlobalLink from 'components/GlobalLink';

import { changeLocale } from 'core/containers/LanguageProvider/actions';

import messages from './messages';

export default class NotFoundPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            width: '0',
            height: '0'
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return (
            <div className="notfound__page" style={this.state}>
                <div className="notfound__page__image"></div>
                <br />
                <p className="notfound__page__text"
                    onClick={
                        () => {
                            this.props.dispatch(changeLocale('en'));
                        }
                    }
                    >
                    <FormattedMessage
                        {...messages.header}
                        values={{
                            br: <br />
                        }}
                        />
                </p>
                <br />
                <GlobalLink to="/" dispatch={this.props.dispatch} className="btn btn_success"><FormattedMessage {...messages.gohome} /></GlobalLink>
            </div>
        );
    }
}
