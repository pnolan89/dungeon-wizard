import React, { Component } from "react";
import './campaign-create.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom'


class CampaignRegistration extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(localStorage.currentUser)
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


      name: this.state.name,
    //  dm: this.state.master,
      description: this.state.description,
      location: this.state.location,
      user_id: localStorage.currentUser,
    //   avatar: this.state.avatar,
    // style: this.state.style
    }
    console.log(formData);
    axios.post('http://localhost:3000/campaigns', formData)
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
      let route = `/campaigns/${this.state.campaignID}`
      return <Redirect to={route} />
    }
  }
    render() {
        return(


<div className="Campaign-Create">
    {this.renderRedirect()}

    <div className="Campaign-Box">

        <div className="Campaign-Details">

            <form onSubmit={this.handleSubmit}>

                <h1>Make a Campaign!</h1>

                        <div className="form">
                        <label>
                        Campaign Name...
                        <input name="name" type="text" placeholder="Make it a good one..." value={this.state.name} onChange={this.handleChange}/>
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
                        Description...
                        <input name="description" type="text" placeholder="What is your quest?" value={this.state.description} onChange={this.handleChange}/>
                        </label>
                        </div>

                        <div className="form">
                        <label>
                        Location...
                        <input name="location" type="text" placeholder="Where is your dungeon?" value={this.state.location} onChange={this.handleChange}/>
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
                        Playing Style...
                        <select name="style" value={this.state.exp} onChange={this.handleChange}>
                        <option value=":">Choose...</option>
                        <option value="Easy Peasy">Easy Peasy</option>
                        <option value="We're sereous.">We're sereous.</option>
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
export default CampaignRegistration;