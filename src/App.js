import React, { Component } from 'react';
import './App.css';
import Nav from './Nav.jsx';
import User from './User.jsx';
import Campaign from './campaign.jsx';
import CampaignIndex from './campaign-index.jsx';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      campaignData: {
        campaign: {},
        dm: {}
      },
      messages: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/campaigns/4')
      .then((response) => {
        this.setState({
          campaignData: {
            campaign: response.data.campaign,
            dm: response.data.dm
          }
        });
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <Nav />
        {/* <Campaign campaign={this.state.campaignData.campaign} dm={this.state.campaignData.dm}/> */}
        <CampaignIndex campaign={this.state.campaignData.campaign} dm={this.state.campaignData.dm}/>
      </div>
    );
  }
}

export default App;