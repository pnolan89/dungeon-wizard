import React, { Component } from 'react';
import './App.css';
import Nav from './Nav.jsx';
import User from './User.jsx';
import Campaign from './campaign.jsx';
import UserRegistration from './user_registration.js';
import UserIndex from './user-index.jsx';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    
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
        <Route exact path="/users/" component={UserIndex} />
        <Route path="/campaigns/:campaignId" component={Campaign}/>
        <Route path="/users/:userId" component={User}/>
        <Route path="/users/new" component={User}/>
        <Route path="/register" component={UserRegistration} />
      </div>
      </Router>

    );
  }
}

export default Home;
