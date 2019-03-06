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
        <div className="Campaign-Index">
        <div className="Campaign-Card">
        <div className="Campaign-Card-Details">
            <h1><Link to={`/campaigns/${campaign.campaign.id}`}>{campaign.campaign.name}</Link></h1>
            <p>Dungeon Master: {campaign.dm.name}</p>
            <p>Description: {campaign.campaign.description}</p>
            <p>Location: {campaign.campaign.location}</p>
        </div>
        <div className="Campaign-Index-Image">
            <img src="https://bit.ly/2XE42RH" />
        </div>
        </div>
        </div>
        )
      })
      return campaigns;
  } else {
      return (<p>Loading...</p>);
  }
}
    render() {

        return(
            <React.Fragment>
            {this.getCampaignData()}
            </React.Fragment>
        );
    }
}
export default CampaignIndex;