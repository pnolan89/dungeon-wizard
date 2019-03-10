import React, { Component } from "react";
import './User.css';
import axios from 'axios';
import CampaignCard from './campaign-card.jsx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userID: this.props.match.params.userID
    };
    this.renderCampaignDMCard = this.renderCampaignDMCard.bind(this);
    this.renderCampaignPlayCard = this.renderCampaignPlayCard.bind(this);
    this.dateToString = this.dateToString.bind(this);
  }

  componentDidMount() {
    let userID = this.state.userID;
    axios.get(`http://localhost:3000/users/${userID}`)
      .then ((response) => {
        this.setState({
          user: response.data,
          playCampaigns: response.data.campaigns,
          dmCampaigns: response.data.owned_campaigns
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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

    return month + " " + day + ", " + year + " ";
  }

  renderCampaignPlayCard() {
    let playCards = this.state.playCampaigns.map((object) => {
      return (
        <CampaignCard key={object.id} campaign={object} />
      )
    })
    return playCards
  }

  renderCampaignDMCard() {
    let playCards = this.state.dmCampaigns.map((object) => {
      return (
        <CampaignCard key={object.id} campaign={object} />
      )
    })
    return playCards
  }

  getEdit() {
    let route = `/users/edit/${this.state.userID}`;
    if (localStorage.user_id === this.state.userID) {
        return(
            <span className='edit'> <Link to={route}>EDIT</Link></span>
        )}
  }

  getUserData() {
    if (this.state.user) {
      let route = `/users/edit/${this.state.userID}`;
      return (
        <React.Fragment>
          <h1>{this.state.user.user.name}</h1>
          <p>Member since: {this.dateToString(this.state.user.user.created_at)}</p>
          <p>Currently playing:</p>
          <p>Playing Style: {this.state.user.user.playing_style} </p>
          <p>Experience level: {this.state.user.user.exp_level}</p>            
          <span>{this.getEdit()}</span> <span>{this.getAvatar()}</span>
        </React.Fragment>
      );
    } else {
      return (<p>Loading...</p>);
    }
  }

  getAvatar() {
    return(           
      <div className="user-image">
        <img src={this.state.user.user.avatar} />
      </div>
    );
  }

  getDmof() {
    if(this.state.dmCampaigns){
      if(this.state.dmCampaigns.length) {
        return(
          <h1>DM of:</h1>
        )
      }
    }   
  }

  getPlaying() {
    if(this.state.playCampaigns) {
      if(this.state.playCampaigns.length) {
        return(
          <h1>Playing:</h1>
        )
      }
    }
  }
  

  render() {
    return(
      <div className="user-container">
        <div className="user-top">
          <div className="user-box">
            <div className="user-details">
              {this.getUserData()}
            </div>
          </div>
          <div className="campaign-box">
              <React.Fragment>
                <div className="dm-list">
                  {this.getDmof()}
                  {this.state.playCampaigns ? (
                    this.renderCampaignDMCard()
                  ): (
                    <p>loading</p>
                  )}
                </div>
                <div className="campaign-list">
                  {this.getPlaying()}
                  { this.state.playCampaigns ? (
                    this.renderCampaignPlayCard()
                  ): (
                    <p>loading</p>
                  )}  
                </div>
              </React.Fragment>
          </div>
        </div>
      </div>
      
    );
  }
}
export default User;