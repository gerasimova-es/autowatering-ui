import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
    Form,
    Button,
    Label,
    Segment
} from 'semantic-ui-react'
import {fetchStatistic} from "../../actions/pots"
import {LineChart,AreaChart, Area, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';


class DateTimeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dateFrom: new Date(),
            dateTo: new Date()
        };

    }

    handleDateFrom = (date) => {
        console.log(date.toISOString());
        this.setState({dateFrom: date})
    };

    handleDateTo = (date) => {
        console.log(date);
        this.setState({dateTo: date})
    };

    fetchStatistics = () => {
        this.props.fetchStatistic({
            code: 'AUTHORIUM',
            dateFrom: this.state.dateFrom.toISOString(),
            dateTo: this.state.dateTo.toISOString()
        });
    };

    render() {
        const {dateTo, dateFrom} = this.state;

        // const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 300, pv: 2400, amt: 2400}];
        // const date = [];
        //
        //
        // if(this.props.statistics.lenght > 0){
        //     date = this.state.statistics.map((item) => item = {name: item.date, uv: item.humidity});
        // }

        console.log(this.props.statistics);

        return (
            <Segment>
                <Form>
                    <DatePicker
                        selected={dateFrom}
                        name='dateFrom'
                        onChange={this.handleDateFrom}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="time"
                    />
                    <br/>
                    <br/>
                    <DatePicker
                        selected={dateTo}
                        name='dateTo'
                        onChange={this.handleDateTo}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="time"
                    />
                    <br/>
                    <br/>
                    <Button onClick={this.fetchStatistics}>Получить статистику</Button>
                </Form>
                <Segment>
                    <LineChart width={800} height={300} data={this.props.statistics} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                        <Line type="monotone" dataKey="humidity" stroke="#8884d8"/>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                        {/*<XAxis dataKey="date"/>*/}
                        <XAxis/>
                        <YAxis/>
                        <Tooltip/>
                    </LineChart>

                    <AreaChart width={730} height={250} data={this.props.statistics}
                               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            {/*<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">*/}
                                {/*<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>*/}
                                {/*<stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>*/}
                            {/*</linearGradient>*/}
                        </defs>
                        {/*<XAxis dataKey="name" />*/}
                        <XAxis />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="humidity" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        {/*<Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />*/}
                    </AreaChart>

                </Segment>


            </Segment>
        );
    }
}

DateTimeForm.propTypes = {
    fetchStatistic: PropTypes.func.isRequired,
    statistics: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        statistics: state.pots.statistics
    };
}

export default connect(mapStateToProps, {fetchStatistic})(DateTimeForm);
