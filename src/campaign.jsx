import React, { Component } from "react";
import './Campaign.css';

class Campaign extends Component {
    render() {
        return(
                 <div className="Campaign">
                    <div className="Campaign-Box">
                        <div className="Campaign-Details">
                            <h1>{this.props.campaign.name}</h1>
                            <p>JOIN CAMPAIGN</p>
                            <p> 4/6 Spots Filled</p>
                            <p>Dungeon Master: ME</p>
                            <p>Location: MY PLACE</p>
                            <p>Description: it's a good one...</p>
                            <p>Playing Style: super tough </p>
                        </div>
                        <div className="Campaign-Image">
                            <img src="https://bit.ly/2C3tnvb" />
                        </div>

                    </div>
                    <div classname="Campaign-Description">
                        <h2>Our Noble Quest... </h2>
                        <p>The object is a pillar of resin, 10 feet in height, four feet in diameter. It is glossy enough that if the light is at your back, you can see your reflection, but also translucent enough that if someone’s standing on the opposite side, their shape may blur into sight. It has three ridges, which do not twist for long across its surface before fading back down into the curve. It is Feretory (1969), by Conroy Glasser, and it is on permanent display on the fourth floor of the Museum of Modern Art in New York, just across from some drawings from earlier in that decade by Agnes Martin. Shortly after midnight on Christmas morning, a night watchman discovered me standing by Feretory with a fire axe held over my head. I am, or was, a senior member of MoMA’s curatorial staff, with a special interest in the Light and Space movement of the 1960s, and so naturally I’ve been called upon to give an account of why I should wish to destroy such an important work. My only reply is that in fact I wanted nothing less than to destroy it. Even after all that’s happened, I still recognise Feretory as a masterpiece. Destroying it would have been no more than an unavoidable consequence of what I really hoped to achieve with the axe that night.
                        </p>
                    </div>
            </div>
        );
    }
}
export default Campaign;