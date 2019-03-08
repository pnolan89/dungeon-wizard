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
            playing_style: ""
        }
    };
    this.filterChange = this.filterChange.bind(this);
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

filterCampaigns(campaigns) {
    let filteredList = campaigns;
    if (this.state.filters.exp_level) {
        filteredList = filteredList.filter((campaign) => campaign.campaign.exp_level === this.state.filters.exp_level);
    }
    if (this.state.filters.playing_style) {
        filteredList = filteredList.filter((campaign) => campaign.campaign.playing_style === this.state.filters.playing_style);
    }
    return filteredList;
}


getCampaignData() {
  if (this.state.campaigns) {
    let filteredList = this.filterCampaigns(this.state.campaigns);
    const campaigns = filteredList.map((campaign) => {
      return(
        <div className="Campaign-Index" >
            <Link to={`/campaigns/${campaign.campaign.id}`}>
                <div className="Campaign-Card">
                    <div className="Campaign-Card-Details">
                        <h1>{campaign.campaign.name}</h1>
                        <p className="campaign-description">{campaign.campaign.description}</p>
                        <p className="campaign-detail">Dungeon Master: {campaign.dm.name}</p>
                        <p className="campaign-detail">Location: {campaign.campaign.location}</p>
                    </div>
                    <div className="Campaign-Index-Image">
                        <img src="https://bit.ly/2XE42RH" />
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
                exp_level: event.target.value
            }
        })
    } else {
        this.setState({
            filters: {
                playing_style: event.target.value
            }
        })
    console.log(this.state)
    }
    // console.log("EVENT: ", event.target.name)
    // console.log("EVENT: ", event.target.value)
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