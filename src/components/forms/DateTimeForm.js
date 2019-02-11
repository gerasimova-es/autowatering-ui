import React, {Component} from 'react'
import {DateTimeInput} from 'semantic-ui-calendar-react'
import {
    Form,
    Button
} from 'semantic-ui-react'

class DateTimeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

    handle = event => {
        event.persist();
        console.log(event);
    };

    render() {
        const {dateTo, dateFrom} = this.state;

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
            </Form>
        );
    }
}

export default DateTimeForm;
