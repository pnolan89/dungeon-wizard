import React, { Component } from "react";
import './campaign-edit.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class CampaignEdit extends Component {
  constructor() {
    super();
    this.state = {
        redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let campaignID = this.props.match.params.campaignID;

    axios.get(`http://localhost:3000/campaigns/${campaignID}`)
      .then((response) => {
        this.setState({
          campaignName: response.data.campaign.name,
          campaignDescription: response.data.campaign.description,
          campaignLocation: response.data.campaign.location, 
          dm: response.data.dm
        });
      })
      .catch(function (error) {
      // handle error
      console.log(error);
      });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      exp_level: "intermediate",
      playing_style: "story-focused",
      name: this.state.name,
      description: this.state.description,
      location: this.state.location, 
    }

    let campaignID = this.props.match.params.campaignID;
    axios.put(`http://localhost:3000/campaigns/${campaignID}`, formData)
      .then((response) => {
        this.setState({
            campaignID: response.data,
            redirect: true
        });
          //handle success
          console.log(response);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      let route = `/campaigns/${this.props.match.params.campaignID}`
      return <Redirect to={route} />
    }
  }
    render() {
      return(

        <div className="Campaign-Edit">
          {this.renderRedirect()}
          <div className="Campaign-Box">
            <div className="Campaign-Details">
              <form onSubmit={this.handleSubmit}>
                <h1>Edit Campaign...</h1>
                    <div className="form">
                      <label>
                        Campaign Name:
                        <br />
                        <input name="name" type="text"  defaultValue={this.state.campaignName}  onChange={this.handleChange}  />
                      </label>
                    </div>
                    <div className="form">
                      <label>
                        Description:
                        <br />
                        <input name="description" type="text"  /* value={this.state.description} */ onChange={this.handleChange} defaultValue={this.state.campaignDescription} />
                      </label>
                    </div>
                    <div className="form">
                      <label>
                        Location:
                        <br />
                        <input name="location" type="text"  /* value={this.state.location} */ onChange={this.handleChange} defaultValue={this.state.campaignLocation}/>
                      </label>
                    </div>
                    <div className="form">
                      <label>
                        Playing Style:
                        <br />
                        <select name="style" value={this.state.exp} onChange={this.handleChange}>
                          <option value=":">Choose...</option>
                          <option value="Easy Peasy">Easy Peasy</option>
                          <option value="We're serious.">We're serious.</option>
                          <option value="Dungeon Wizard level play">Dungeon Wizard level play</option>
                        </select>
                      </label>
                    </div>
                    <input className="Input" type="submit" value="Submit"/>

              </form>
            </div>
          </div>
        </div>
        );
    }
}
export default CampaignEdit;