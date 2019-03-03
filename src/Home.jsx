import React, { Component } from 'react';
import './App.css';
import Nav from './Nav.jsx';
import User from './User.jsx';
import Campaign from './campaign.jsx';
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
    console.log("first:", this.state);
    console.log("second", this.state);
    axios.get('http://localhost:3000/campaigns')
      .then((response) => {
        this.setState({
          currentCampaign: response.data[0]
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
        <Route path="/campaign/" render={(props) => <Campaign {...props} campaign={this.state.currentCampaign} />} />
        {/* <Campaign campaign={this.state.currentCampaign}/> */}
      </div>
      </Router>
      
    );
  }
}

export default Home;
