import React, { Component } from "react";
import './campaign-index.css';

class CampaignIndex extends Component {
    render() {
        return(
            <div className="Campaign-Index">
                <div className="Campaign-Card">
                    <div className="Campaign-Card-Details">
                        <h1>The Great Campaign</h1>
                        <p>Dungeon Master: ME</p>
                        <p>Description: It's so good omg.</p>
                        <p>Playing Style: Easy Peasy</p>
                        <h3>JOIN!</h3>
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