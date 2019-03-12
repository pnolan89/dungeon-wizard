import React, { Component } from "react";
import '../user/user.css';
import '../join-request/join-request.css';
import { Link } from "react-router-dom";

class CampaignCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  capitalize(string) {
    let stringArray = string.split('_');
    let outputArray = [];
    stringArray.forEach((word) => {
      outputArray.push(word.charAt(0).toUpperCase() + word.slice(1));
    });
    return outputArray.join(' ');
  }


  getPlaystyles(playing_styles) {
    let playstyles = playing_styles.map((style) => {
      return this.capitalize(style);
    });
    let output = playstyles.join(', ');
    return output;
  }

  render() {

    return(
      <Link to={`/campaigns/${this.props.campaign.campaign.id}`}>
      <div className="campaign-card">
      <div className="campaign-info">
      <h3>{this.props.campaign.campaign.name}</h3>
      <h4>Experience level: <span class="card-value">{this.capitalize(this.props.campaign.campaign.exp_level)}</span></h4>
      <h4 className="campaign-info-playstyles">Play styles: <span class="card-value">{this.getPlaystyles(this.props.campaign.active_playstyles)}</span></h4>
      </div>
      <div className="campaign-img">
      <img src={this.props.campaign.campaign.image} />
      </div>
      </div>
      </Link>
    )
  }
}
export default CampaignCard;