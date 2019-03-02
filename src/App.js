import React, { Component } from 'react';
import './App.css';
import Nav from './Nav.jsx';
import Campaign from './campaign.jsx';
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
    axios.get('http://localhost:3000/campaigns/21')
      .then((response) => {
        this.setState({
          campaignData: {
            campaign: response.data
          }
        });
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    // axios.get(`http://localhost:3000/users/${this.state.campaignData.campaign.user_id}`)
    //   .then((response) => {
    //     this.setState({
    //       campaignData: {
    //         dm: response.data
    //       }
    //     });
    //     console.log(response.data);
    //   });
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <Campaign campaign={this.state.campaignData.campaign} dm={this.state.campaignData.dm}/>
      </div>
    );
  }
}

export default App;
