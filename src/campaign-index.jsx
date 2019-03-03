import React, { Component } from "react";
import './campaign-index.css';

class Campaign extends Component {
    render() {
        return(
            <div className="Campaign-Index">
                <div className="Campaign-Card">
                    <h1>{this.props.campaign.name}</h1>
                    <p>Dungeon Master: {this.props.dm.name}</p>

                </div>
                
            </div>
        );
    }
}
export default Campaign;