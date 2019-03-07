import React, { Component } from "react";
import './campaign-edit.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom'


class CampaignEdit extends Component {
  constructor() {
    super();
    this.state = {
        // campaignID: 80,

        // campaignID: this.props.match.params.campaignID,
        // ID: this.props.match.params.campaignID,
        redirect: false,
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    
    console.log(localStorage.currentUser);
    // console.log(this.props.match.params.campaignID);
   

    let campaignID = this.props.match.params.campaignID;
    console.log(campaignID);
    axios.get(`http://localhost:3000/campaigns/${campaignID}`)
  .then((response) => {
    console.log('RESPONSE DATA: ', response.data.campaign.name);
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

        // name: "Matt",
        // description: "Matt",
        // location: "Matt",
        // user_id: 55,
        exp_level: "intermediate",
        playing_style: "story-focused",

      name: this.state.name,
      description: this.state.description,
      location: this.state.location, 
    //   avatar: this.state.avatar,
    //   style: this.state.style
    //   dm: this.state.master,
    }

    console.log(formData);
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
                        <br></br>
                        <input name="name" type="text"  defaultValue={this.state.campaignName}  onChange={this.handleChange}  />
                        </label>
                        </div>

                        {/* <div className="form">
                        <label>
                        Dungeon Master...
                        <input name="dm" type="text" placeholder="Your leader..." value={this.state.dm} onChange={this.handleChange}/>
                        </label>
                        </div> */}

                        <div className="form">
                        <label>
                        Description:
                        <br></br>
                        <input name="description" type="text"  /* value={this.state.description} */ onChange={this.handleChange} defaultValue={this.state.campaignDescription} />
                        </label>
                        </div>

                        <div className="form">
                        <label>
                        Location:
                        <br></br>
                        <input name="location" type="text"  /* value={this.state.location} */ onChange={this.handleChange} defaultValue={this.state.campaignLocation}/>
                        </label>
                        </div>

                        {/*
                        <div className="form">
                        <label>
                        Choose a campaign crest...
                        <input name="crest" type="file" value={this.state.location} onChange={this.handleChange}/>
                        <input type="file"
                        id="avatar" name="avatar"
                        accept="image/png, image/jpeg">
                        </input>
                        </label>
                        </div> */}

                        <div className="form">
                        <label>
                        Playing Style:
                        <br></br>
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