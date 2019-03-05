import React, { Component } from "react";
import './campaign-create.css';

class CampaignCreate extends Component {
    render() {
        return(
            <div className="Campaign-Create">
            <form>
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
export default CampaignCreate;

