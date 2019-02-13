import React, {Component} from 'react'
import {DateTimeInput} from 'semantic-ui-calendar-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import {
    Form,
    Button
} from 'semantic-ui-react'

class DateTimeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
            dateFrom: '',
            dateTo: '',
        };

        this.handle = this.handle.bind(this);
    }

    handleChange = (event, {name, value}) => {
        console.log(event);
        event.persist();
        if (this.state.hasOwnProperty(name)) {
            console.log(event);
            this.setState({[name]: value});
        }
    };

    handleChangee = (event) => {
        console.log(event);
        // event.persist();
        // if (this.state.hasOwnProperty(name)) {
        //     console.log(event);
        //     this.setState({[name]: value});
        // }
    };

    handle = event => {
        event.persist();
        console.log(event);
    };

    render() {
        const {dateTo, dateFrom, startDate} = this.state;

        return (
            <Form>
                <DateTimeInput
                    name="dateFrom"
                    placeholder="Начальное время"
                    value={dateFrom}
                    iconPosition="left"
                    onChange={this.handle}
                />
                <DateTimeInput
                    name="dateTo"
                    placeholder="Конечное время"
                    value={dateTo}
                    iconPosition="left"
                    onChange={this.handleChange}
                />
                <Button onClick={this.handle}>Получить статистику</Button>
                <div className='date-picker'>
                <DatePicker
                    selected={startDate}
                    onChange={this.handleChangee}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                />
                </div>
            </Form>
        );
    }
}

export default DateTimeForm;
