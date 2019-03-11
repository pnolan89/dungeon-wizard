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
      next_session: this.state.next_session,
      synopsis: this.state.synopsis,
      playing_style: this.state.playing_style,
      exp_level: this.state.exp,
      player_limit: this.state.player_limit,
      image: this.state.image,
    }
    axios.post('http://localhost:3000/campaigns', formData)
      .then((response) => {
        this.setState({
            campaignID: response.data,
            redirect: true
        });
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


<div className="campaign-create">
    {this.renderRedirect()}

    <div className="Campaign-Box">

        <div className="Campaign-Details">

            <form onSubmit={this.handleSubmit}>

                <h1>Create Campaign...</h1>

                        <div className="form name">
                        <label>
                        Campaign Name:
                        <br></br>
                        <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
                        </label>
                        </div>

                        <div className="form description">
                        <label>
                        Description:
                        <br></br>
                        <input name="description" type="text"  value={this.state.description} onChange={this.handleChange}/>
                        </label>
                        </div>

                        <div className="form synopsis">
                        <label>
                        Synopsis:
                        <br></br>
                        <textarea name='synopsis' type="text"  value={this.state.synopsis} onChange={this.handleChange}/>
                        </label>
                        </div>

                        <div className="form">
                        <label>
                        Player limit:
                        <br></br>
                        <select name="player_limit" value={this.state.player_limit} onChange={this.handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        </select>
                        </label>
                        </div>

                        <div className="form">
                        <label>
                        Playing style:
                        <br></br>
                        <select name="playing_style" value={this.state.playing_style} onChange={this.handleChange}>
                        <option value=":">Choose...</option>
                        <option value="combat-focused">Combat-focused</option>
                        <option value="story-focused">Story-focused</option>
                        </select>
                        </label>
                        </div>

                        <div className="form">
                        <label>
                        Experience level:
                        <br></br>
                        <select placeholder="Choose..." name="exp" value={this.state.exp} onChange={this.handleChange}>
                        <option value=":">Choose...</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                        </select>
                        </label>
                        </div>

                        <div className="form">
                        <label>
                        Campaign Image:
                        <br></br>
                        <select name="image" value={this.state.image} onChange={this.handleChange}>
                        <option value=":">Choose...</option>
                        <option value="https://bit.ly/2VOZZ3s">Mountain Meadow</option>
                        <option value="https://bit.ly/2NP1X0V">Cloudy</option>
                        <option value="https://bit.ly/2SSo6w7">Castle</option>
                        <option value="https://bit.ly/2IZdgVj">Sunset</option>
                        <option value="https://bit.ly/2EWHQtJ">Coastline</option>
                        <option value="https://bit.ly/2H9qb5u">Misty</option>
                        <option value="https://bit.ly/2VLXpee">Aurora</option>
                        <option value="https://bit.ly/2TsVApR">Obelisks</option>
                        <option value="https://bit.ly/2H9B7Qw">Great Lighthouse</option>
                        <option value="https://bit.ly/2EMtUCs">Gear City</option>
                        <option value="https://bit.ly/2UsFbOJ">Forest Village</option>
                        <option value="https://bit.ly/2EM9KZc">Tree of Life</option>
                        <option value="https://bit.ly/2TIzBdO">Ancient City</option>
                        <option value="https://bit.ly/2Hlac3w">Monestary</option>
                        </select>
                        </label>
                        </div>

                        <div className="form-tiny">
                        <tiny>Location and session time will be visible only to approved players.</tiny>
                        </div>
                        <div className="form location">
                        <label>
                        Location:
                        <br></br>
                        <input name="location" type="text"  value={this.state.location} onChange={this.handleChange}/>
                        </label>
                        </div>

                        <div className="form">
                        <label>
                        First session:
                        <br></br>

                        <input name="next_session" type="datetime-local" value={this.state.next_session} onChange={this.handleChange} />
                        </label>
                        </div>

                <input className="submit" type="submit" value="Submit"/>

            </form>

        </div>

    </div>

</div>
        );
    }
}
export default CampaignRegistration;