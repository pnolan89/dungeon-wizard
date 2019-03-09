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
      description: this.state.description,
      location: this.state.location,
      user_id: localStorage.user_id,
      image: this.state.image,
      synopsis: this.state.synopsis,
      playing_style: this.state.playing_style
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

                <h1>Create Campaign...</h1>

                        <div className="form">
                        <label>
                        Campaign Name:
                        <br></br>
                        <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
                        </label>
                        </div>

                        <div className="form">
                        <label>
                        Description:
                        <br></br>
                        <input name="description" type="text"  value={this.state.description} onChange={this.handleChange}/>
                        </label>
                        </div>

                        <div className="form">
                        <label>
                        Location:
                        <br></br>
                        <input name="location" type="text"  value={this.state.location} onChange={this.handleChange}/>
                        </label>
                        </div>

                        <div className="form">
                        <label>
                        Synopsis:
                        <br></br>
                        <textarea name='synopsis' type="text"  value={this.state.synopsis} onChange={this.handleChange}/>
                        </label>
                        </div> 

                        <div className="form">
                        <label>
                        Playing Style:
                        <br></br>
                        <select name="playing_style" value={this.state.playing_style} onChange={this.handleChange}>
                        <option value=":">Choose...</option>
                        <option value="Easy Peasy">Easy Peasy</option>
                        <option value="We're serious.">We're serious.</option>
                        <option value="Dungeon Wizard level play">Dungeon Wizard level play</option>
                        </select>
                        </label>
                        </div>

                        <div className="form">
                        <label>
                        Campaign Image:
                        <br></br>
                        <select name="image" value={this.state.image} onChange={this.handleChange}>
                        <option value=":">Choose...</option>
                        <option value="https://bit.ly/2SSsawu">Snowy</option>
                        <option value="https://bit.ly/2VOZZ3s">Mountain Meadow</option>
                        <option value="https://bit.ly/2NP1X0V">Cloudy</option>
                        <option value="https://bit.ly/2SSo6w7">Castle</option>
                        <option value="https://bit.ly/2IZdgVj">Magick Sunset</option>
                        <option value="https://bit.ly/2EWHQtJ">Apua'a</option>
                        <option value="https://bit.ly/2EZ35fx">Icy</option>
                        <option value="https://bit.ly/2H9qb5u">Misty</option>
                        <option value="https://bit.ly/2VLXpee">Pretty</option>
                        <option value="https://bit.ly/2UtBpEG">Spooky</option>
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