/**
*
* Calendar
*
*/

import React from 'react';
import moment from 'moment';
// import styled from 'styled-components';
import CustomSelect from 'components/CustomSelect';

class CalendarAbstract extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
    }
    onChange(data) {
        this.setState({
            value: data.value,
        });
        if (this.props.onChange) {
            this.props.onChange(data);
        }
    }
    getOptions() {
        if (this.props.options) {
            return this.props.options;
        } else {
            return this._getOptions();
        }
    }
    render() {
        return (
            <CustomSelect
                {...this.props}
                options={this.getOptions()}
                onChange={(evt) => this.onChange(evt)}
                disabled={this.props.disabled}
                value={this.state.value}
            />
        );
    }
}

export class CalendarDate extends CalendarAbstract {
    _getMaxDateByMonth(monthIndex) {
        switch (monthIndex) {
            case '02':
                return 28;
            case '04':
                return 30;
            case '06':
                return 30;
            case '09':
                return 30;
            case '11':
                return 30;
            default:
                return 31;
        }
    }
    _getOptions() {
        const arr = [];
        let minDay = this.props.minDay || 1;
        let maxDay = this.props.maxDay || 31;

        if (minDay === 'now') {
            minDay = moment().date() + 1;
        }
        
        if (maxDay === 'now') {
            maxDay = moment().month() + 1;
        } else {
            if (this.props.month) {
                maxDay = Math.min(maxDay, this._getMaxDateByMonth(this.props.month));
            }
            if (this.props.year && moment([this.props.year]).isLeapYear()) {
                maxDay += 1;
            }
        }

        for (let i = minDay; i < (maxDay + 1); i++) {
            arr.push({ value: (i < 10) ? ('0' + i) : ('' + i), label: i + '' });
        }

        return arr;
    }
}

export class CalendarMonth extends CalendarAbstract {
    getMonthLabel(index) {
        switch (index) {
            case 1:
                return 'January';
            case 2:
                return 'February';
            case 3:
                return 'March';
            case 4:
                return 'April';
            case 5:
                return 'May';
            case 6:
                return 'June';
            case 7:
                return 'July';
            case 8:
                return 'August';
            case 9:
                return 'September';
            case 10:
                return 'October';
            case 11:
                return 'November';
            case 12:
                return 'December';
            default:
                return 'Not a month index';
        }
    }
    _getOptions() {
        const arr = [];
        let minMonth = this.props.minMonth || 1;
        let maxMonth = this.props.maxMonth || 12;

        if (minMonth === 'now') {
            minMonth = moment().month() + 1;
        }
        if (maxMonth === 'now') {
            maxMonth = moment().month() + 1;
        }

        for (let i = minMonth; i < (maxMonth + 1); i++) {
            arr.push({ value: (i < 10) ? ('0' + i) : ('' + i), label: this.getMonthLabel(i) });
        }

        return arr;
    }
}

export class CalendarYear extends CalendarAbstract {
    _getOptions() {
        const arr = [];
        const minYear = this.props.minYear || 1930;
        const maxYear = this.props.maxYear || 2017;
        for (let i = maxYear; i > (minYear - 1); i--) {
            arr.push({ value: i + '', label: i + '' });
        }
        return arr;
    }
}

class Calendar extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
            </div>
        );
    }
}

Calendar.propTypes = {

};

export default Calendar;
