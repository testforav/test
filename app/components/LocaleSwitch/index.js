/**
*
* LocaleSwitch
*
*/

import React from 'react';
// import styled from 'styled-components';

import {
    Dropdown,
    MenuItem,
} from 'react-bootstrap';

import { appLocales } from 'i18n';
import { changeLocale } from 'core/containers/LanguageProvider/actions';

import localeToFlagMap from 'translations/localeToFlagMap.json';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import * as Cookies from 'js-cookie';

class LocaleSwitch extends React.Component { // eslint-disable-line react/prefer-stateless-function
    setLocale(locale) {
        Cookies.set('locale', locale);
        this.props.dispatch(changeLocale(locale));
    }

    renderTextForm() {
        return (
            <div>
                {
                    this.props.display
                    ? (
                        <Dropdown
                            id="header-locale"
                            className="header__nav__dropdown header__nav__dropdown_mobile"
                            pullRight={this.props.pullRight}
                            dropup={this.props.dropup}
                            >
                            <Dropdown.Toggle
                                useAnchor={true}
                                className="header__mobile-item-link header__nav__item__link_locale"
                                >
                                <FormattedMessage {...messages[this.props.locale]} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                className="header__nav__dropdown__menu header__nav__dropdown__menu_lang-lite"
                            >
                                <MenuItem
                                    onClick={(evt) => {
                                        evt.preventDefault();

                                        this.setLocale('en');
                                    }}
                                    >
                                    <FormattedMessage {...messages.en} />
                                </MenuItem>
                                <MenuItem
                                    onClick={(evt) => {
                                        evt.preventDefault();

                                        this.setLocale('ja');
                                    }}
                                    >
                                    <FormattedMessage {...messages.ja} />
                                </MenuItem>
                                <MenuItem
                                    onClick={(evt) => {
                                        evt.preventDefault();

                                        this.setLocale('ko');
                                    }}
                                    >
                                    <FormattedMessage {...messages.ko} />
                                </MenuItem>
                                <MenuItem
                                    onClick={(evt) => {
                                        evt.preventDefault();

                                        this.setLocale('zh');
                                    }}
                                    >
                                    <FormattedMessage {...messages.zh} />
                                </MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    )
                    : null
                }
            </div>
        );
    }

    renderFullForm() {
        return (
            <div>
                {
                    this.props.display
                    ? (
                        <Dropdown
                            id="header-locale"
                            className="header__nav__dropdown"
                            pullRight={this.props.pullRight}
                            dropup={this.props.dropup}
                            >
                            <Dropdown.Toggle
                                useAnchor={true}
                                className="header__nav__item__link header__nav__item__link_locale"
                                >
                                <div className="flag-round">
                                    <i className={"flag-icon flag-icon-" + localeToFlagMap[this.props.locale]}></i>
                                </div>
                                <FormattedMessage {...messages[this.props.locale]} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                className="header__nav__dropdown__menu header__nav__dropdown__menu_lang"
                            >
                                <MenuItem
                                    onClick={(evt) => {
                                        evt.preventDefault();

                                        this.setLocale('en');
                                    }}
                                    >
                                    <div className="flag-round">
                                        <i className={"flag-icon flag-icon-" + localeToFlagMap['en']}></i>
                                    </div>
                                    <FormattedMessage {...messages.en} />
                                </MenuItem>
                                <MenuItem
                                    onClick={(evt) => {
                                        evt.preventDefault();

                                        this.setLocale('ja');
                                    }}
                                    >
                                    <div className="flag-round">
                                        <i className={"flag-icon flag-icon-" + localeToFlagMap['ja']}></i>
                                    </div>
                                    <FormattedMessage {...messages.ja} />
                                </MenuItem>
                                <MenuItem
                                    onClick={(evt) => {
                                        evt.preventDefault();

                                        this.setLocale('ko');
                                    }}
                                    >
                                    <div className="flag-round">
                                        <i className={"flag-icon flag-icon-" + localeToFlagMap['ko']}></i>
                                    </div>
                                    <FormattedMessage {...messages.ko} />
                                </MenuItem>
                                <MenuItem
                                    onClick={(evt) => {
                                        evt.preventDefault();

                                        this.setLocale('zh');
                                    }}
                                    >
                                    <div className="flag-round">
                                        <i className={"flag-icon flag-icon-" + localeToFlagMap['zh']}></i>
                                    </div>
                                    <FormattedMessage {...messages.zh} />
                                </MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    )
                    : null
                }
            </div>
        );
    }

    render() {
        if (this.props.theme === 'lite') {
            return this.renderTextForm();
        } else {
            return this.renderFullForm();
        }
    }
}

LocaleSwitch.propTypes = {

};

export default LocaleSwitch;
