import React, { Component } from 'react';
import './TabsChart.css';
import Tabs from './Tabs';
import Chart from './Chart';

class TabsChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabs: [{ value: "1 min", "id": "MIN_1", active: true }, { value: "5 min", "id": "MIN_5", active: false },
        { value: "1 hour", "id": "HOUR_1", active: false }, { value: "1 week", "id": "WEEK_1", active: false }
      ],
      chartData: []
    };

    this.handleTabClick = this.handleTabClick.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.state.tabs[0].id);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
      return this.state.chartData !== nextState.chartData;
  }

  fetchData(tabId) {
    return fetch(`http://www.fxempire.com/api/v1/en/markets/eur-usd/chart?time=${tabId}`)
      .then((response) => response.json())
      .then(data => this.setState({chartData: data}))
  }

  handleTabClick(selectedTabId) {
    this.setState((prevState) => {
      prevState.tabs.forEach((tab) => {
        if (tab.id !== selectedTabId) {
          tab.active = false;
        }
        else {
          tab.active = true;
        }
      });
      return prevState;
    });
    this.fetchData(selectedTabId);
  }

  render() {
    return (
      <div>
        <Tabs tabs={this.state.tabs} handleTabClick={this.handleTabClick} />
        <Chart data={this.state.chartData} />
      </div>
    );
  }
}

export default TabsChart;
