/**
*
* RenderInComponent
*
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
// import styled from 'styled-components';

import { translationMessages } from 'i18n';


class RenderInComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return null;
    }
    componentDidMount() {
        const target = document.getElementById(this.props.target);
        this.newElement = document.createElement('div');

        if (this.props.className) {
            this.newElement.className = this.props.className;
        }
        if (this.props.style) {
            Object.keys(this.props.style).forEach((key) => {
                this.newElement.style[key] = this.props.style[key];
            });
        }

        target.appendChild(this.newElement);

        this._renderLayer();
    }
    componentDidUpdate() {
        this._renderLayer();
    }
    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.newElement);
        document.getElementById(this.props.target).removeChild(this.newElement);
    }
    _renderLayer() {
        const locale = this.props.locale || 'en';

        render(
            <IntlProvider
                locale={locale || 'en'}
                key={locale}
                messages={translationMessages[locale]}
                >{this.props.children}</IntlProvider>
            , this.newElement);
    }
}

export default RenderInComponent;
