import React, { Component } from 'react';
import './Chart.css';
const ReactHighcharts = require('react-highcharts/ReactHighstock.src');

class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = { config: {} };
        this.setConfig(this.props.data);
    }

    convertDataForGraph(data) {
        return data.map(dataItem => [dataItem.date, dataItem.open, dataItem.high, dataItem.low, dataItem.close]);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setConfig(nextProps.data);
        }
    }

    setConfig(data) {
        const graphData = this.convertDataForGraph(data);

        const config = {
            rangeSelector: {
                selected: 2
            },

            title: {
                text: 'EUR/USD'
            },

            series: [{
                type: 'ohlc',
                name: 'EUR/USD',
                data: graphData
            }]
        };

        this.setState({ config: config });
    }


    render() {
        return <ReactHighcharts config = {this.state.config}></ReactHighcharts>;    
    }
}

export default Chart;
