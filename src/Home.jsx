import React, { Component } from 'react';
import './App.css';
import Nav from './Nav.jsx';
import User from './User.jsx';
import Campaign from './campaign.jsx';
import CampaignCreate from './campaign-create.jsx';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        id: 10,
        name: "Gandalf Grey",
        email: "mithran@dir.com",
        password: "youshallnotpass",
        playing_style: "casual",
        exp_level: "beginner",
        created_at: "2019-03-02T18:47:29.686Z",
        updated_at: "2019-03-02T18:47:29.686Z"
      },
      currentCampaign: {},
      messages: []}
  }
  componentDidMount() {
    let campaignId = this.props.match.params.campaignId;
    console.log('campaignId: ', campaignId);
    axios.get(`http://localhost:3000/campaigns/${campaignId}`)
      .then((response) => {
        this.setState({
          currentCampaign: response.data
        });
        console.log(response.data);
        // this.setState({
        //   messages: response
        // });
      })
    .catch(function (error) {
      // handle error
      console.log(error);
      });
  }



  // getCampaigns () {
  //   axios.get(`http://localhost:3000/campaigns`)
  //     .then((campaigns) => {
  //       if (campaigns.length) {
  //         this.setState({campaigns: campaigns})
  //         this.getCampaign(campaigns[0].id)
  //       } else {
  //         this.setState({drinks: []})
  //       }
  //       // this.setState({
  //       //   currentCampaign: campaigns.data[0]
  //       });
  //       // console.log(campaigns.data)
  //     }



  render() {
    return (
      <Router>
        <div className="App">
        <Nav />
        <Route path="/user/" render={(props) => <User {...props} user={this.state.currentUser} />} />
        <Route path="/campaign/" render={(props) => <Campaign {...props} campaign={this.state.currentCampaign.campaign} dm={this.state.currentCampaign.dm}/>} />
        {/* <Campaign campaign={this.state.currentCampaign}/> */}
        <CampaignCreate />
      </div>
      </Router>

    );
  }
}

export default Home;
