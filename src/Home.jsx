import React, { Component } from 'react';
import './App.css';
import Nav from './Nav.jsx';
import User from './User.jsx';
import UserIndex from './user-index.jsx';
import UserRegistration from './user_registration.js';
import UserEdit from './user-edit.jsx';
import Campaign from './campaign.jsx';
import CampaignIndex from './campaign-index.jsx';
import CampaignRegistration from './campaign-create.jsx';
import CampaignEdit from './campaign-edit.jsx'
import Splash from './splash.jsx'
import Login from './login.jsx';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Home extends Component {

  render() {
    return (
      <Router>
        <div className="App">
        <Nav />
        <Switch>
        <Route exact path="/users/" component={UserIndex} />
        <Route exact path="/users/new" component={UserRegistration}/>
        <Route exact path="/users/edit/:userID" component={UserEdit}/>
        <Route exact path="/users/:userID" component={User}/>     
        <Route exact path="/campaigns/" component={CampaignIndex} />
        <Route exact path="/campaigns/new" component={CampaignRegistration} />
        <Route exact path="/campaigns/edit/:campaignID" component={CampaignEdit} />
        <Route exact path="/campaigns/:campaignID" component={Campaign} />    
        <Route exact path="/" component={Splash} />
        <Route exact path="/login" component={Login} />
        </Switch>
      </div>
      </Router>

    );
  }
}

export default Home;
