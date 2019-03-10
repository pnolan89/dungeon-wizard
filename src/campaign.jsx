import React, { Component } from "react";
import './Campaign.css';
import axios from 'axios';
import JoinRequestForm from "./join-request-form";
import JoinStatusCampaign from "./join-status-campaign";
import JoinRequestDM from "./join-request-dm";
import PlayerCard from "./player-card";
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
    this.getPlayerList = this.getPlayerList.bind(this);
    this.checkUserIsPlayer = this.checkUserIsPlayer.bind(this);
    this.checkUserIsDM = this.checkUserIsDM.bind(this);
    this.getSynopsis = this.getSynopsis.bind(this);
    this.getPlayingStyle = this.getPlayingStyle.bind(this);
    this.dateToString = this.dateToString.bind(this);
    this.showLocation = this.showLocation.bind(this);
    this.getPlayerSpots = this.getPlayerSpots.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  componentDidMount() {
    let campaignID = this.state.campaignID;
    axios.get(`http://localhost:3000/campaigns/${campaignID}`)
    .then((response) => {
      this.setState({
        campaign: response.data.campaign,
        dm: response.data.dm,
        join_requests: response.data.join_requests,
        players: response.data.players,
        image: response.data.campaign.image,
      });
      console.log('Campaign: ', this.state.campaign)
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
    this.setState({
      join_requests: joinRequests
    })
  }


    getEdit() {
        let route = `/campaigns/edit/${this.state.campaignID}`;
        if (this.state.campaign.user_id === parseInt(localStorage.user_id)) {
            return(
                <Link to={route} id="campaign-edit-btn">Edit This Campaign</Link>
            )}
        }

    checkUserIsPlayer() {
      let result = false;
      this.state.players.forEach((player) => {
        if (player.id === parseInt(localStorage.user_id)) {
          result = true;
        }
      })
      return result;
    }

    checkUserIsDM() {
      let result = false;
      if (parseInt(localStorage.user_id) === this.state.campaign.user_id) {
        result = true;
      }
      return result;
    }

    dateToString(dateString) {
      let date = new Date(dateString)

      function addZero(min) {
        if (min < 10) {
          min = "0" + min;
        }
        return min;
      }

      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

      let month = months[date.getMonth()];
      let day = date.getDate();
      let year = date.getFullYear();

      let hours = (date.getHours()) + 6;
      let minutes = addZero(date.getMinutes());
      let time = (hours > 11 ? (hours - 11) : (hours + 1)) + ":" + minutes + (hours > 11 ? "PM" : "AM");

      return month + " " + day + ", " + year + " - " + time + " ";
    }

    showLocation() {
      console.log("LOCALSTORAGE: ", this.state.campaign.user_id)
      if (this.checkUserIsPlayer() === true || this.state.campaign.user_id === parseInt(localStorage.user_id)) {
        return (
          <p>Location: {this.state.campaign.location}</p>
        )
      }
    }

    showSession() {
      let date = this.state.campaign.next_session
      if (this.checkUserIsPlayer() === true || this.state.campaign.user_id === parseInt(localStorage.user_id)) {
        return (
          <p>Next session: {this.dateToString(date)}</p>
        )
      }
    }

    getPlayerSpots() {
      if (this.state.campaign) {
        return (
          <p className="subtext">({this.state.players.length}/{this.state.campaign.player_limit} Spots Filled)</p>
        )
      } else {
        return (<p>Loading...</p>)
      }
    }

    getCampaignData() {
      if (this.state.campaign) {
        return (
          <React.Fragment>
          <h1>{this.state.campaign.name}</h1>
          <p>Dungeon Master: {this.state.dm.name}</p>
          {this.showLocation()}
          {this.showSession()}
          <p>Description: {this.state.campaign.description}</p>
          <p>Playing Style: {this.getPlayingStyle()}</p>
          <div id="campaign-edit-container">{this.getEdit()}</div>
          </React.Fragment>
       );
      } else {
        return (<p>Loading...</p>);
      }
    }

  getSynopsis() {
    if (this.state.campaign) {
      return (
        <p>{this.state.campaign.synopsis}</p>
      )
    } else {
      return (
        <p>Loading...</p>
      )
    }
  }


  getRequestData() {
    if (!localStorage.user_id) {
      return <p>You must log in or register to join a campaign!</p>
    } else if (this.state.campaign.user_id === parseInt(localStorage.user_id)) {
      return (
        <React.Fragment>
          <h3>Requests</h3>
          <JoinRequestDM requests={this.state.join_requests} />
        </React.Fragment>
      )

    } else {
      return this.checkUserRequest()
  }
  }

  checkUserRequest() {
    let existenceCheck = function(element) {
      return element !== undefined
    }
    let array = this.state.join_requests.map((object) => {
      if (object.request.user_id === parseInt(localStorage.user_id)) {
        return this.getUserRequest();
      }
    });
    if (!array.some(existenceCheck)) {
      return this.getJoinRequestObject();
    } else {
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

  getPlayerList() {
    let player = this.state.players.map((object) => {
      return (<PlayerCard key={object.id} playerInfo={object} isPlayer={this.checkUserIsPlayer()} isDM={this.checkUserIsDM()} />
        )
    })

    return player
  }

  getJoinRequestObject() {
    if (this.state.campaign) {
      let campaign = {
        name: this.state.campaign.name,
        id: this.state.campaign.id
      }
      return <JoinRequestForm handleRequestForm={this.handleRequestForm} campaign={campaign} />
    } else {
      return (<p>Loading...</p>);
    }
  }

  getPlayingStyle() {
    let string = this.state.campaign.playing_style
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getImage() {
    let campaignImage = this.state.image
    return campaignImage
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
        </div>
        <div className="Campaign-Description">
          <h2>Synopsis</h2>
          <p>{this.getSynopsis()}</p>
        </div>
      </div>

      <div className="player-box">
      <div className="Campaign-Image">
            <img src={this.getImage()} />
          </div>
        <div id="campaign-join-requests">
          { this.state.campaign ? (
            this.getRequestData()
          ) : (
            <p>Loading...</p>
          ) }
        </div>
        <div className="player-list">
          <h2>Players</h2>
          {this.getPlayerSpots()}
          { this.state.campaign ? (
            this.getPlayerList()
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

    </div>
    );
  }
}
export default Campaign;