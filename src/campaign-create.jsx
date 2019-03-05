import React, { Component } from "react";
import './campaign-create.css';
import axios from 'axios';

class CampaignCreate extends Component {
    render() {
        return(
            <div className="Campaign-Create">
            <form id="NewCampaign">

              <h1>Make a Campaign!</h1>

              <div className="Name">
                <label for="fname">Campaign Name...</label>
                <br>
                </br>
                <input type="text" id="name" name="name" placeholder="Make it a good one..."/>
                <br>
                </br>
                <br>
                </br>
              </div>

              <div className="Master">
                <label for="lname">Dungeon Master...</label>
                <br>
                </br>
                <input type="text" id="master" name="master" placeholder="Your leader..."/>
                <br>
                </br>
                <br>
                </br>
              </div>

              <div className="Description">
                <label for="lname">Description...</label>
                <br>
                </br>
                <input type="text" id="description" name="description" placeholder="What is your quest?"/>
                <br>
                </br>
                <br>
                </br>
              </div>

              <div className="Location">
                <label for="lname">Location...</label>
                <br>
                </br>
                <input type="text" id="location" name="location" placeholder="Where is your dungeon?"/>
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
                <select id="style" name="country">
                    <option value="Easy Peasy">Easy Peasy</option>
                    <option value="We're sereous.">We're sereous.</option>
                    <option value="Dungeon Wizard level play">Dungeon Wizard level play</option>
                </select>
                </div>
                <br>
                </br>
                <br>
                </br>

              <input className="Input" type="submit" value="Submit"/>
          </form>      
      </div>

           
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = {
          name: this.state.name,
          dm: this.state.master,
          description: this.state.description,
          location: this.state.location,
          avatar: this.state.avatar,
          style: this.state.style
        }
        console.log(formData);
        axios.post('http://localhost:3000/campaigns', formData)
          .then(function (response) {
              //handle success
              console.log(response);
          })
          .catch(function (response) {
              //handle error
              console.log(response);
          });
      }
}
export default CampaignCreate;

