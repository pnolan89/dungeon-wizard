import React, { Component } from "react";
import './campaign-index.css';
import axios from 'axios';
import { Link } from "react-router-dom";


class CampaignIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
}


componentDidMount() {
  axios.get(`http://localhost:3000/campaigns/`)
  .then ((response) => {
      console.log('CAMPAIGNS: ', response.data);
      this.setState({
          campaigns: response.data
      });
      console.log(this.state);
  })
  .catch(function (error) {
      console.log(error);
  });
}


getCampaignData() {
  if (this.state.campaigns) {
      const campaigns = this.state.campaigns.map((campaign) => {
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
                <img src="https://bit.ly/2C3tnvb" />
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