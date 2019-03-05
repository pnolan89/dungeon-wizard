import React, { Component } from "react";
import './Campaign.css';

class Campaign extends Component {
    render() {
        return(
            //      <div className="Campaign">
            //         <div className="Campaign-Box">
            //             <div className="Campaign-Details">
            //                 <h1>{this.props.campaign.name}</h1>
            //                 <p>JOIN CAMPAIGN</p>
            //                 <p>4/6 Spots Filled</p>
            //                 <p>Dungeon Master: {this.props.dm.name}</p>
            //                 <p>Location: {this.props.campaign.location}</p>
            //                 <p>Description: {this.props.campaign.description}</p>
            //                 <p>Playing Style: super tough </p>
            //             </div>
            //             <div className="Campaign-Image">
            //                 <img src="https://bit.ly/2C3tnvb" />
            //             </div>

            //         </div>
            //         <div className="Campaign-Description">
            //             <h2>Our Noble Quest... </h2>
            //             <p>The object is a pillar of resin, 10 feet in height, four feet in diameter. It is glossy enough that if the light is at your back, you can see your reflection, but also translucent enough that if someone’s standing on the opposite side, their shape may blur into sight. It has three ridges, which do not twist for long across its surface before fading back down into the curve. It is Feretory (1969), by Conroy Glasser, and it is on permanent display on the fourth floor of the Museum of Modern Art in New York, just across from some drawings from earlier in that decade by Agnes Martin. Shortly after midnight on Christmas morning, a night watchman discovered me standing by Feretory with a fire axe held over my head. I am, or was, a senior member of MoMA’s curatorial staff, with a special interest in the Light and Space movement of the 1960s, and so naturally I’ve been called upon to give an account of why I should wish to destroy such an important work. My only reply is that in fact I wanted nothing less than to destroy it. Even after all that’s happened, I still recognise Feretory as a masterpiece. Destroying it would have been no more than an unavoidable consequence of what I really hoped to achieve with the axe that night.
            //             </p>
            //         </div>
            // </div>

            <div className="Campaign-Create">
              <form action="/action_page.php">
                <h1>Make a Campaign!</h1>
                <div className="Name">
                <label for="fname">Campaign Name...</label>
                <br>
                </br>
                <input type="text" id="nname" name="firstname" placeholder="Make it a good one..."/>
                <br>
                </br>
                <br>
                </br>
                </div>

                <div className="Master">
                <label for="lname">Dungeon Master...</label>
                <br>
                </br>
                <input type="text" id="mname" name="lastname" placeholder="Your leader..."/>
                <br>
                </br>
                <br>
                </br>
                </div>

                <div className="Description">
                <label for="lname">Description...</label>
                <br>
                </br>
                <input type="text" id="dname" name="lastname" placeholder="What is your quest?"/>
                <br>
                </br>
                <br>
                </br>
                </div>

                <div className="Location">
                <label for="lname">Location...</label>
                <br>
                </br>
                <input type="text" id="lname" name="lastname" placeholder="Where is your dungeon?"/>
                <br>
                </br>
                <br>
                </br>
                </div>

                <div className="Avatar">
                <label for="avatar">Choose a campaign crest...</label>
                <br>
                </br>
                <input type="file"
                id="avatar" name="avatar"
                accept="image/png, image/jpeg">
                </input>
                <br>
                </br>
                <br>
                </br>
                </div>

                <div className="Style">
                <label for="country">Playing Style...</label>
                <br>
                </br>
                <select id="country" name="country">
                <option value="australia">Easy Peasy</option>
                <option value="canada">We're sereous.</option>
                <option value="usa">Dungeon Wizard level play</option>
                </select>
                </div>
                <br>
                </br>
                <br>
                </br>

                <input type="submit" value="Submit"/>
            </form>
            
        </div>
        );
    }
}
export default Campaign;