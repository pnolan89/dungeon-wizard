import React, { Component } from "react";
import './User.css';
import './join-request.css';
import { Link } from "react-router-dom";

class CampaignCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

  render() {

    return(
      <Link to={`/campaigns/${this.props.campaign.id}`}>
      <div className="campaign-card">
      <div className="campaign-info">
      <h3>{this.props.campaign.name}</h3>
      <h4>Experience level: <span class="card-value">{this.capitalize(this.props.campaign.exp_level)}</span></h4>
      <h4>Play style: <span class="card-value">{this.capitalize(this.props.campaign.playing_style)}</span></h4>
      </div>
      <div className="campaign-img">
      <img src={this.props.campaign.image} />
      </div>
      </div>
      </Link>
    )
  }
}
export default CampaignCard;