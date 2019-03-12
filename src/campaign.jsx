import React, { Component } from "react";
import './Campaign.css';
import axios from 'axios';
import JoinRequestForm from "./join-request-form";
import JoinStatusCampaign from "./join-status-campaign";
import JoinRequestDM from "./join-request-dm";
import PlayerCard from "./player-card";
import Modal from './modal.js';
import { join } from "path";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignID: this.props.match.params.campaignID,
      isShowing: false
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
    this.showLocation = this.showLocation.bind(this);
    this.getPlayerSpots = this.getPlayerSpots.bind(this);
    this.getImage = this.getImage.bind(this);
    this.setNewSession = this.setNewSession.bind(this);
    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.handleDMForm = this.handleDMForm.bind(this);
    this.handlePlayerRemove = this.handlePlayerRemove.bind(this);
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

  openModalHandler = () => {
    this.setState({
        isShowing: true
    });
}

closeModalHandler = () => {
    this.setState({
        isShowing: false
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

  handlePlayerRemove(id) {
    let update = {
      dm_confirm: "rejected"
    };
    let joinId = "";
    this.state.join_requests.forEach((request) => {
      console.log("ID: ", id);
      console.log("JOINREQ: ", request.request.user_id);
      console.log(id === request.request.user_id);
      if (request.request.user_id === id) {
        joinId = request.request.id;
      }
    });

    axios.put(`http://localhost:3000/join_requests/${joinId}`, update)
      .then((response) => {
        let updatePlayers = [];
        this.state.players.forEach((player) => {
          if (player.id !== id) {
            updatePlayers.push(player);
          }
        });
        this.setState({
          players: updatePlayers
        });
      })
      .catch((response) => {
        console.log("Failure", response);
      });
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

      let hours = (date.getHours()) - 6;
      let minutes = addZero(date.getMinutes());
      let time = (hours > 11 ? (hours - 11) : (hours + 1)) + ":" + minutes + (hours < 11 ? "PM" : "AM");

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

    setNewSession(newDate) {
      let newCampaign = this.state.campaign
      console.log("newDate", newDate)
      newCampaign.next_session = newDate.next_session
      this.setState({
        campaign: newCampaign
      })
    }

    showSession() {
      let date = this.state.campaign.next_session
      if (this.state.campaign.user_id === parseInt(localStorage.user_id)) {
        return (
          <React.Fragment>
          <p>Next session: {this.dateToString(date)}</p>
            <p>{ this.state.isShowing ? <p onClick={this.closeModalHandler} className="back-drop"></p> : null }

            <button className="open-modal-btn" onClick={this.openModalHandler}>Update</button>

            <Modal
                className="modal"
                show={this.state.isShowing}
                close={this.closeModalHandler}
                campaignID={this.state.campaignID}
                setNewSession={this.setNewSession}
                />
            </p>
          </React.Fragment>
        )
      }
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
        let routeDm = `/users/${this.state.campaign.user_id}`;
        return (
          <React.Fragment>
          <h1>{this.state.campaign.name}</h1>
          <span>Dungeon Master:<Link className="link" to={routeDm}>{this.state.dm.name}</Link></span>
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

  handleDMForm(newStatus, id, requests, players) {
    let updatePlayers = players;
    let updateRequests = requests.map((request) => {
      if (request.request.id === id) {
        request.request.dm_confirm = newStatus;
        if (newStatus === "accepted") {
          updatePlayers.push(request.user)
        }
      }
      return request;
    })
    this.setState({
      join_requests: updateRequests,
      players: updatePlayers
    })
  }

  getRequestData() {
    if (!localStorage.user_id) {
      return <p>You must log in or register to join a campaign!</p>
    } else if (this.state.campaign.user_id === parseInt(localStorage.user_id)) {
      return (
        <React.Fragment>
          <h3>Requests</h3>
          <JoinRequestDM requests={this.state.join_requests} players={this.state.players} handleDMForm={this.handleDMForm}/>
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
    let players = this.state.players.map((player) => {
      return (<PlayerCard key={player.id}
                          player={player}
                          isPlayer={this.checkUserIsPlayer()}
                          isDM={this.checkUserIsDM()}
                          handlePlayerRemove={this.handlePlayerRemove}
              />
      )
    })
    return players
  }

  getJoinRequestObject() {
    if (this.state.campaign) {
      let campaign = {
        name: this.state.campaign.name,
        id: this.state.campaign.id,
        player_limit: this.state.campaign.player_limit,
        players: this.state.join_requests.length
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