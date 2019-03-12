import React, { Component } from 'react';
import './app.css';
import Nav from '../nav/nav.jsx';
import User from '../user/user.jsx';
import UserIndex from '../user-index/user-index.jsx';
import UserRegistration from '../user-registration/user_registration.js';
import UserEdit from '../user-edit/user-edit.jsx';
import Campaign from '../campaign/campaign.jsx';
import CampaignIndex from '../campaign-index/campaign-index.jsx';
import CampaignRegistration from '../campaign-create/campaign-create.jsx';
import CampaignEdit from '../campaign-edit/campaign-edit.jsx'
import Splash from '../splash/splash.jsx'
import Login from '../login/login.jsx';
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
