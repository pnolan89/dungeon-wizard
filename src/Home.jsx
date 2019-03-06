import React, { Component } from 'react';
import './App.css';
import Nav from './Nav.jsx';
import User from './User.jsx';
import Campaign from './campaign.jsx';
import UserRegistration from './user_registration.js';
import Login from './login.jsx';
import UserIndex from './user-index.jsx';
import CampaignCreate from './campaign-create.jsx';
import CampaignIndex from './campaign-index.jsx';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Router>

        <div className="App">
        <Nav />
        <Switch>
        <Route exact path="/users/" component={UserIndex} />
        <Route exact path="/campaigns/new/" component={CampaignCreate} />
        <Route path="/campaigns/:campaignId" component={Campaign}/>
        <Route exact path="/campaigns/" component={CampaignIndex} />
        <Route path="/users/new" component={User}/>
        <Route path="/users/:userId" component={User}/>
        <Route path="/register" component={UserRegistration} />
        <Route path="/login" component={Login} />
        </Switch>
      </div>
      </Router>

    );
  }
}

export default Home;
