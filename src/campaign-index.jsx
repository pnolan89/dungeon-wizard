import React, { Component } from "react";
import './campaign-index.css';

class CampaignIndex extends Component {
    render() {
        return(
            <div className="Campaign-Index">
                <div className="Campaign-Card">
                    <div className="Campaign-Card-Details">
                        <h1>{this.props.campaign.name}</h1>
                        <p>Dungeon Master: {this.props.dm.name}</p>
                    </div>
                    <div className="Campaign-Index-Image">
                        <img src="https://bit.ly/2C3tnvb" />
                    </div>


                </div>
            
                
            </div>

           
        );
    }
}
export default CampaignIndex;