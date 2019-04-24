/**
*
* BirthdayCalendar
*
*/

import React from 'react';
import moment from 'moment';
// import styled from 'styled-components';
import Error from 'components/form/Error';
import { CalendarYear, CalendarMonth, CalendarDate } from 'components/Calendar';

class BirthdayCalendar extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        _debug({
            birthYear: props.input.value ? props.input.value.split('-')[0] : '',
            birthMonth: props.input.value ? props.input.value.split('-')[1] : '',
            birthDay: props.input.value ? props.input.value.split('-')[2] : '',
        });
        this.state = {
            birthYear: props.input.value ? props.input.value.split('-')[0] : '',
            birthMonth: props.input.value ? props.input.value.split('-')[1] : '',
            birthDay: props.input.value ? props.input.value.split('-')[2] : '',
        };
    }
    componentDidUpdate() {
        this.tryToSave();
    }
    tryToSave() {
        if (this.state.birthMonth && this.state.birthYear && this.state.birthDay) {
            this.props.input.onChange(this.state.birthYear + '-' + this.state.birthMonth + '-' + this.state.birthDay);
        }
    }
    onBirthMonthChange(data) {
        this.setState({
            birthMonth: data.value,
        });
    }
    onBirthYearChange(data) {
        this.setState({
            birthYear: data.value,
        });
    }
    onBirthDayChange(data) {
        this.setState({
            birthDay: data.value,
        });
    }
    render() {
        const currentMoment = moment();
        return (
            <div className="verification__form__row">
                <CalendarDate
                    clearable={false}
                    className="verification__date Select-custom_transparent"
                    placeholder="Day"
                    disabled={this.props.disabled}
                    month={this.state.birthMonth}
                    year={this.state.selectedYear}
                    tabIndex={this.props.tabIndexStart + ""}
                    onChange={(data) => this.onBirthDayChange(data)}
                    value={this.state.birthDay}
                />

                <CalendarMonth
                    clearable={false}
                    className="verification__month Select-custom_transparent"
                    placeholder="Month"
                    tabIndex={this.props.tabIndexStart + 1 + ""}
                    disabled={this.props.disabled}
                    onChange={(data) => this.onBirthMonthChange(data)}
                    value={this.state.birthMonth}
                />

                <CalendarYear
                    clearable={false}
                    className="verification__year Select-custom_transparent"
                    placeholder="Year"
                    tabIndex={this.props.tabIndexStart + 2 + ""}
                    disabled={this.props.disabled}
                    maxYear={currentMoment.year() - 18}
                    onChange={(data) => this.onBirthYearChange(data)}
                    value={this.state.birthYear}
                />

                {
                    this.props.meta.touched && this.props.meta.error ? <Error error={this.props.meta.error} value={this.props.input.value} /> : null
                }

            </div>
        );
    }
}

BirthdayCalendar.propTypes = {

};

export default BirthdayCalendar;
