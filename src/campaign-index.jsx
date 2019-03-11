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
            open_for_requests: ""
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
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

filterCampaigns(campaigns) {
    let openCampaigns = campaigns.filter((campaign) => campaign.players.length < campaign.campaign.player_limit);
    let closedCampaigns = campaigns.filter((campaign) => campaign.players.length === campaign.campaign.player_limit);
    if (this.state.filters.open_for_requests === "yes") {
        if (this.state.filters.exp_level) {
            openCampaigns = openCampaigns.filter((campaign) => campaign.campaign.exp_level === this.state.filters.exp_level);
        }
        if (this.state.filters.playing_style) {
            openCampaigns = openCampaigns.filter((campaign) => campaign.campaign.playing_style === this.state.filters.playing_style);
        }
        return openCampaigns;
    } else if (this.state.filters.open_for_requests === "no") {
        if (this.state.filters.exp_level) {
            closedCampaigns = closedCampaigns.filter((campaign) => campaign.campaign.exp_level === this.state.filters.exp_level);
        }
        if (this.state.filters.playing_style) {
            closedCampaigns = closedCampaigns.filter((campaign) => campaign.campaign.playing_style === this.state.filters.playing_style);
        }
        return closedCampaigns;
    } else {
        if (this.state.filters.exp_level) {
            campaigns = campaigns.filter((campaign) => campaign.campaign.exp_level === this.state.filters.exp_level);
        }
        if (this.state.filters.playing_style) {
            campaigns = campaigns.filter((campaign) => campaign.campaign.playing_style === this.state.filters.playing_style);
        }
        return campaigns;
    }
}

openForRequests(campaign) {
  let players = campaign.players
  if (players.length < campaign.campaign.player_limit) {
    return (
      <p className="campaign-detail">Looking for players!</p>
    )
  } else {
    return (
      <p></p>
    )
  }
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
                        <p className="campaign-detail">Playing Style: {this.capitalize(campaign.campaign.playing_style)}</p>
                        <p className="campaign-detail">Experience Level: {this.capitalize(campaign.campaign.exp_level)}</p>
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
    if (event.target.name === 'exp_level') {
        this.setState({
            filters: {
                exp_level: event.target.value,
                playing_style: this.state.filters.playing_style,
                open_for_requests: this.state.filters.open_for_requests
            }
        })
    } else if (event.target.name === 'playing_style') {
        this.setState({
            filters: {
                exp_level: this.state.filters.exp_level,
                playing_style: event.target.value,
                open_for_requests: this.state.filters.open_for_requests
            }
        })
    } else if (event.target.name === 'open_for_requests') {
      this.setState({
        filters: {
            exp_level: this.state.filters.exp_level,
            playing_style: this.state.filters.playing_style,
            open_for_requests: event.target.value
        }
      })

    }
}

getFilters() {
    return(
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
                    <td><label for="playing_style">Playing Style: </label></td>
                    <td>
                       <select name="playing_style" onChange={this.filterChange}>
                          <option value=""></option>
                          <option value="story-focused">Story-focused</option>
                          <option value="combat-focused">Combat-focused</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label for="open_for_requests">Looking for Players </label></td>
                    <td>
                        <select name="open_for_requests" onChange={this.filterChange}>
                            <option value=""></option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </td>
                </tr>
            </table>
            <div className="filter-list">
                <div className="filter-item">
                    <div className="filter-label">

                    </div>
                    <div className="filter-select">

                    </div>
                </div>
                <div className="filter-item">
                    <div className="filter-label">

                    </div>
                    <div className="filter-select">

                    </div>
                </div>
            </div>
        </div>

    )
}

    render() {

        return(
            <React.Fragment>
            {this.getFilters()}
            {this.getCampaignData()}
            </React.Fragment>
        );
    }
}
export default CampaignIndex;