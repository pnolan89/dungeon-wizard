import React, { Component } from "react";
import './campaign-index.css';
import axios from 'axios';
import { Link } from "react-router-dom";


class CampaignIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        exp_level: "",
        playing_style: "",
        open_for_requests: "",
        commitment: "",
        deep_immersion: "",
        sandbox: "",
        battle_focused: "",
        kick_in_the_door: "",
        exploration: "",
        random: "",
        open: false
      }
    };
    this.filterChange = this.filterChange.bind(this);
    this.openForRequests = this.openForRequests.bind(this);
  }


  componentDidMount() {
    axios.get('http://localhost:3000/campaigns/')
    .then ((response) => {
      this.setState({
          campaigns: response.data
      });
    })
    .catch(function (error) {
        console.log(error);
    });
  }

capitalize(string) {
  let stringArray = string.split('_');
  let outputArray = [];
  stringArray.forEach((word) => {
    outputArray.push(word.charAt(0).toUpperCase() + word.slice(1));
  });
  return outputArray.join(' ');
  }

filterCampaigns(campaigns) {
  if (this.state.filters.open_for_requests === "yes") {
    campaigns = campaigns.filter((campaign) => campaign.players.length <= campaign.campaign.player_limit);
  }
  if (this.state.filters.open_for_requests === "no") {
    campaigns = campaigns.filter((campaign) => campaign.players.length > campaign.campaign.player_limit);
  }
  if (this.state.filters.exp_level !== "") {
    campaigns = campaigns.filter((campaign) => campaign.campaign.exp_level === this.state.filters.exp_level);
  }
  if (this.state.filters.commitment !== "") {
    campaigns = campaigns.filter((campaign) => campaign.campaign.commitment === this.state.filters.commitment);
  }
  if (this.state.filters.deep_immersion !== "") {
    campaigns = campaigns.filter((campaign) => campaign.campaign.deep_immersion === this.state.filters.deep_immersion);
  }
  if (this.state.filters.sandbox !== "") {
    campaigns = campaigns.filter((campaign) => campaign.campaign.sandbox === this.state.filters.sandbox);
  }
  if (this.state.filters.battle_focused !== "") {
    campaigns = campaigns.filter((campaign) => campaign.campaign.battle_focused === this.state.filters.battle_focused);
  }
  if (this.state.filters.kick_in_the_door !== "") {
    campaigns = campaigns.filter((campaign) => campaign.campaign.kick_in_the_door === this.state.filters.kick_in_the_door);
  }
  if (this.state.filters.exploration !== "") {
    campaigns = campaigns.filter((campaign) => campaign.campaign.exploration === this.state.filters.exploration);
  }
  if (this.state.filters.random !== "") {
    campaigns = campaigns.filter((campaign) => campaign.campaign.random === this.state.filters.random);
  }


  return campaigns;
}

openForRequests(campaign) {
  let players = campaign.players
  if (players.length <= campaign.campaign.player_limit) {
    return (
      <p className="campaign-detail looking-for-players">Looking for players!</p>
    )
  } else {
    return (
      <p></p>
    )
  }
}

toggle() {
  this.setState({
    open: !this.state.open
  })
}

getPlaystyles(playing_styles) {
  let playstyles = playing_styles.map((style) => {
    return this.capitalize(style)
  })
  let output = playstyles.join(', ')
  return output;
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

  let hours = date.getUTCHours() ;
  let minutes = addZero(date.getMinutes());
  let time = (hours > 12 ? (hours - 12) : (hours + 0)) + ":" + minutes + (hours < 12 || hours === 24 ? "AM" : "PM");

  return month + " " + day + ", " + year + " - " + time + " ";
}

getCampaignData() {
  if (this.state.campaigns) {
    let filteredList = this.filterCampaigns(this.state.campaigns);
    const campaigns = filteredList.map((campaign) => {
      return(
        <div className="Campaign-Index" key={campaign.campaign.id} >
          <Link to={`/campaigns/${campaign.campaign.id}`}>
            <div className="Campaign-Card">
              <div className="Campaign-Card-Details">
                <h1>{campaign.campaign.name}</h1>
                <p className="campaign-description">{campaign.campaign.description}</p>
                {this.openForRequests(campaign)}
                <p className="campaign-detail">Dungeon Master: {campaign.dm.name}</p>
                <p className="campaign-detail">Playing Styles: {this.getPlaystyles(campaign.playing_styles)}</p>
                <p className="campaign-detail">Experience Level: {this.capitalize(campaign.campaign.exp_level)}</p>
                <p className="campaign-detail">Commitment Level: {this.capitalize(campaign.campaign.commitment)}</p>
                <p className="campaign-detail">Next Session: {this.dateToString(campaign.campaign.next_session)}</p>
              </div>
              <div className="Campaign-Index-Image">
                <img src={campaign.campaign.image} />
              </div>
            </div>
          </Link>
        </div>
        )
      })
      return campaigns;
  } else {
      return (<p>Loading...</p>);
  }
}

filterChange(event) {
  let filters = this.state.filters;
  if (event.target.name === 'exp_level') {
    filters.exp_level = event.target.value;
    this.setState({
      filters: filters
    })
  } else if (event.target.name === 'commitment') {
    filters.commitment = event.target.value;
    this.setState({
      filters: filters
    })
  } else if (event.target.name === 'open_for_requests') {
    filters.open_for_requests = event.target.value;
    this.setState({
      filters: filters
    })
  } else if (event.target.name === 'deep_immersion') {
    let value = event.target.value;
    if (value === 'yes') {
      value = true;
    } else if (value === 'no') {
      value = false;
    }
    filters.deep_immersion = value;
    this.setState({
      filters: filters
    })
  } else if (event.target.name === 'sandbox') {
    let value = event.target.value;
    if (value === 'yes') {
      value = true;
    } else if (value === 'no') {
      value = false;
    }
    filters.sandbox = value;
    this.setState({
      filters: filters
    })
  }
  else if (event.target.name === 'battle_focused') {
    let value = event.target.value;
    if (value === 'yes') {
      value = true;
    } else if (value === 'no') {
      value = false;
    }
    filters.battle_focused = value;
    this.setState({
      filters: filters
    })
  }
  else if (event.target.name === 'kick_in_the_door') {
    let value = event.target.value;
    if (value === 'yes') {
      value = true;
    } else if (value === 'no') {
      value = false;
    }
    filters.kick_in_the_door = value;
    this.setState({
      filters: filters
    })
  }
  else if (event.target.name === 'exploration') {
    let value = event.target.value;
    if (value === 'yes') {
      value = true;
    } else if (value === 'no') {
      value = false;
    }
    filters.exploration = value;
    this.setState({
      filters: filters
    })
  }
  else if (event.target.name === 'random') {
    let value = event.target.value;
    if (value === 'yes') {
      value = true;
    } else if (value === 'no') {
      value = false;
    }
    filters.random = value;
    this.setState({
      filters: filters
    })
  }
}

getFilters() {
  return(
    <React.Fragment>
    <div className="filter-container">
      <h2>Filters</h2>
      <table>
        <tr>
          <td><label for="exp_level">Experience Level: </label></td>
          <td>
            <select name="exp_level" onChange={this.filterChange}>
              <option value=""></option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><label for="commitment">Commitment: </label></td>
          <td>
            <select name="commitment" onChange={this.filterChange}>
              <option value=""></option>
              <option value="long-term">Long-term</option>
              <option value="single-session">Single session</option>
              <option value="casual">Casual</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><label for="open_for_requests">Looking for Players: </label></td>
          <td>
            <select name="open_for_requests" onChange={this.filterChange}>
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </td>
        </tr>
        </table>
        <button className="button button-block" onClick={this.toggle.bind(this)}>Advanced Options ▼</button>
        <table className={"collapse" + (this.state.open ? ' in ' : '')}>
        <tr>
          <td><label for="deep_immersion">Deep Immersion: </label></td>
          <td>
            <select name="deep_immersion" onChange={this.filterChange}>
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><label for="sandbox">Sandbox: </label></td>
          <td>
            <select name="sandbox" onChange={this.filterChange}>
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><label for="battle_focused">Battle-focused: </label></td>
          <td>
            <select name="battle_focused" onChange={this.filterChange}>
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><label for="kick_in_the_door">Kick-in-the-door: </label></td>
          <td>
            <select name="kick_in_the_door" onChange={this.filterChange}>
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><label for="exploration">Exploration: </label></td>
          <td>
            <select name="exploration" onChange={this.filterChange}>
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><label for="random">Random: </label></td>
          <td>
            <select name="random" onChange={this.filterChange}>
              <option value=""></option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </td>
        </tr>
      </table>
      </div>
      </React.Fragment>
    )
  }

    render() {

        return(
            <div className="campaigns-index-container">
                <div className="filter-spacer">
                    {this.getFilters()}
                </div>
                <div className="campaigns-container">
                    {this.getCampaignData()}
                </div>
            </div>
        );
    }
}
export default CampaignIndex;