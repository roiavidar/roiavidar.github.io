import React, { Component } from 'react';
import './Tabs.css';

class Tabs extends Component {

    constructor(props) {
        super(props);
        
        this.onClickTab = this.onClickTab.bind(this);
    }

    onClickTab(event) {
        console.log(event.target.id);
        this.props.handleTabClick(event.target.id);
    }

    render() {

        const buttons = this.props.tabs.map((tab) => {
            return <li key={tab.id}><button id={tab.id} className={tab.active ? 'active-tab': ''} onClick={this.onClickTab} > {tab.value} </button></li>;
        });

        return <ul className="Tabs"> {buttons} </ul>;
    }
}

export default Tabs;
