import React, { Component } from "react";
import './Campaign.css';
import axios from 'axios';
import JoinRequestForm from "./join-request-form";
import JoinStatusCampaign from "./join-status-campaign";
import JoinRequestDM from "./join-request-dm";
import { join } from "path";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignID: this.props.match.params.campaignID,

    };
    this.getJoinRequestObject = this.getJoinRequestObject.bind(this);
    this.getUserRequest = this.getUserRequest.bind(this);
    this.checkUserRequest = this.checkUserRequest.bind(this);
    this.getRequestData = this.getRequestData.bind(this);
    this.handleRequestForm = this.handleRequestForm.bind(this);
  }
  componentDidMount() {
    console.log("Storage!", typeof localStorage.user_id)

    let campaignID = this.state.campaignID;
    axios.get(`http://localhost:3000/campaigns/${campaignID}`)
    .then((response) => {
      console.log('RESPONSE DATA: ', response);
      this.setState({
        campaign: response.data.campaign,
        dm: response.data.dm,
        join_requests: response.data.join_requests,
        players: response.data.players
      });
    })
  .catch(function (error) {
    // handle error
    console.log(error);
    });
  }



  handleRequestForm(newPostData) {
    let joinRequests = this.state.join_requests.slice(0)
    let campaignObject = {
      request: newPostData,
      user: {id: newPostData.user_id }
    }
    joinRequests.push(campaignObject)
    console.log("campaignObject", campaignObject)
    this.setState({
      join_requests: joinRequests
    })
  }

    getCampaignData() {
        if (this.state.campaign) {
            let route = `/campaigns/edit/${this.state.campaignID}`;
            return (
                <React.Fragment>
                <h1>{this.state.campaign.name}</h1>
                <p className="Join">JOIN CAMPAIGN</p>
                <p>{this.state.players.length}/{this.state.campaign.player_limit} Spots Filled</p>
                <p>Dungeon Master: {this.state.dm.name}</p>
                <p>Location: {this.state.campaign.location}</p>
                <p>Description: {this.state.campaign.description}</p>
                <p>Playing Style: super tough </p>
                <span className='edit'> <Link to={route}>EDIT</Link></span>
                </React.Fragment>
           );
        } else {
            return (<p>Loading...</p>);
        }
    }


  getRequestData() {
    if (this.state.campaign.user_id === parseInt(localStorage.user_id)) {
      return <JoinRequestDM requests={this.state.join_requests} />

    } else {
      return this.checkUserRequest()
  }
  }
  checkUserRequest() {
    let existenceCheck = function(element) {
      return element !== undefined
    }
    let array = this.state.join_requests.map((object) => {
      console.log("obj.user_id", object.request.user_id)
      if (object.request.user_id === parseInt(localStorage.user_id)) {
        console.log("2 - objec.userid matches 43")
        console.log("check",object)
        return this.getUserRequest();
      }
    });
    console.log(array)
    if (!array.some(existenceCheck)) {
      console.log("2 - nothing matched 43")
      console.log("true")
      return this.getJoinRequestObject();
    } else {
      console.log("false")
    return array;
    }
  }

  getUserRequest() {
    let array = this.state.join_requests.map((object) => {
      if (object.request.user_id === parseInt(localStorage.user_id)) {
        return object
      }
    });
    const result = array.filter(array => array !== undefined);
    const join_request = result.map((request) => {
      return (
        <JoinStatusCampaign key={request.request.id} request={request.request.dm_confirm} />
      )
    })
    return join_request
  }

  getJoinRequestObject() {
    if (this.state.campaign) {
      console.log("3 - State.campaign exists - non 43")
      let campaign = {
        name: this.state.campaign.name,
        id: this.state.campaign.id
      }
      return <JoinRequestForm handleRequestForm={this.handleRequestForm} campaign={campaign} />
    } else {
      console.log("3 - state doesn't exist - non 43")
      return (<p>Loading...</p>);
    }
  }


  render() {
    let dm = this.state.dm;
    return(
    <div className="Campaign">
      <div className="Campaign-Box">
        <div className="campaign-top">
        <div className="Campaign-Details">
          {this.getCampaignData()}
        </div>
          <div className="Campaign-Image">
            <img src="https://bit.ly/2C3tnvb" />
          </div>
        </div>

          <div className="Campaign-Description">
          <h2>Our Noble Quest... </h2>
          <p>The object is a pillar of resin, 10 feet in height, four feet in diameter. It is glossy enough that if the light is at your back, you can see your reflection, but also translucent enough that if someone’s standing on the opposite side, their shape may blur into sight. It has three ridges, which do not twist for long across its surface before fading back down into the curve. It is Feretory (1969), by Conroy Glasser, and it is on permanent display on the fourth floor of the Museum of Modern Art in New York, just across from some drawings from earlier in that decade by Agnes Martin. Shortly after midnight on Christmas morning, a night watchman discovered me standing by Feretory with a fire axe held over my head. I am, or was, a senior member of MoMA’s curatorial staff, with a special interest in the Light and Space movement of the 1960s, and so naturally I’ve been called upon to give an account of why I should wish to destroy such an important work. My only reply is that in fact I wanted nothing less than to destroy it. Even after all that’s happened, I still recognise Feretory as a masterpiece. Destroying it would have been no more than an unavoidable consequence of what I really hoped to achieve with the axe that night.
          </p>
      </div>
      </div>

      <div className="player-box">
        <div className="join-request">
          { this.state.campaign ? (
            this.getRequestData()
          ) : (
            <p>Loading...</p>
          ) }
        </div>
        <div className="player-list">
        </div>
      </div>

    </div>
    );
  }
}
export default Campaign;