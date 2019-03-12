import React, { Component } from "react";
import './campaign-edit.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom'


class CampaignEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignID: this.props.match.params.campaignID
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  componentDidMount() {
    let campaignID = this.state.campaignID;
    axios.get(`http://localhost:3000/campaigns/${campaignID}`)
    .then((response) => {
      this.setState({
        campaign: response.data.campaign,
        dm: response.data.dm,
        join_requests: response.data.join_requests,
        players: response.data.players,
        image: response.data.campaign.image,
        playing_styles: response.data.playing_styles,
        redirect: false,
        deep_immersion: response.data.campaign.deep_immersion,
        sandbox: response.data.campaign.sandbox,
        battle_focused: response.data.campaign.battle_focused,
        kick_in_the_door: response.data.campaign.kick_in_the_door,
        exploration: response.data.campaign.exploration,
        random: response.data.campaign.random
      });
      console.log('Campaign: ', this.state.campaign)
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

  handleCheck(event) {
    let name = event.target.name;
    let checked = event.target.checked;

    this.setState({
      [name]: checked
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let text = "";
    if (this.state.synopsis) {
      text = (this.state.synopsis).replace(/\n\r?/g, '"<br />"');
    } else {
      text = this.state.campaign.synopsis;
    }
    const formData = {
      name: this.state.name,
      description: this.state.description,
      location: this.state.location,
      user_id: localStorage.user_id,
      next_session: this.state.next_session,
      synopsis: text,
      playing_style: this.state.playing_style,
      exp_level: this.state.exp,
      player_limit: this.state.player_limit,
      image: this.state.image,
      commitment: this.state.commitment,
      kick_in_the_door: this.state.kick_in_the_door,
      deep_immersion: this.state.deep_immersion,
      sandbox: this.state.sandbox,
      battle_focused: this.state.battle_focused,
      exploration: this.state.exploration,
      random: this.state.random
    };

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
      let route = `/campaigns/${this.state.campaignID}`;
      return (<Redirect to={route} />)
    }
  }

  renderForm() {
    if (this.state.campaign) {
      return (
        <form onSubmit={this.handleSubmit}>
          <h1>Edit Campaign</h1>
          <div className="form name">
            <label>
              Campaign Name:
              <br></br>
              <input name="name" type="text" defaultValue={this.state.campaign.name} value={this.state.name} onChange={this.handleChange}/>
            </label>
          </div>

          <div className="form description">
            <label>
              Description:
              <br></br>
              <input name="description" type="text" defaultValue={this.state.campaign.description} value={this.state.description} onChange={this.handleChange}/>
            </label>
          </div>

          <div className="form synopsis">
            <label>
              Synopsis:
              <br></br>
              <textarea name='synopsis' type="text" defaultValue={this.state.campaign.synopsis} value={this.state.synopsis} onChange={this.handleChange}/>
            </label>
          </div>

          <div className="form">
            <label>
              Player limit:
              <br></br>
              <select name="player_limit" defaultValue={this.state.campaign.player_limit} value={this.state.player_limit} onChange={this.handleChange}>
                <option value="">Choose...</option>
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
              Experience level:
              <br></br>
              <select placeholder="Choose..." name="exp" defaultValue={this.state.campaign.exp_level} value={this.state.exp} onChange={this.handleChange}>
                <option value=":">Choose...</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </label>
          </div>

          <div className="form">
            <label>
              Commitment:
              <br></br>
              <select placeholder="Choose..." name="commitment" defaultValue={this.state.campaign.commitment} value={this.state.commitment} onChange={this.handleChange}>
                <option value=":">Choose...</option>
                <option value="single-session">Single session</option>
                <option value="casual">Casual</option>
                <option value="long-term">Long-term</option>
              </select>
            </label>
          </div>

          <div className="form">
            <label>
              <h3>Playing styles:</h3>
              <table>
                <tr>
                  <td>
                    <h4>Kick In the Door</h4>
                    <input className="checkbox" type="checkbox" name="kick_in_the_door" checked={this.state.kick_in_the_door} onChange={this.handleCheck}/>
                  </td>
                </tr>
                <tr>
                  <p>The simplest way to play. The story just serves as an introduction to adventure, and the campaign gets right into the action early.</p>
                </tr>
              </table>
              <table>
                <tr>
                  <td>
                    <h4>Deep Immersion</h4>
                    <input className="checkbox" type="checkbox" name="deep_immersion" checked={this.state.deep_immersion} onChange={this.handleCheck}/>
                  </td>
                </tr>
                <tr>
                  <td><p>For those who want their setting to feel like a real place. Worlds are thoroughly detailed, stories are complex and characters are fully fleshed out.</p></td>
                </tr>
              </table>
              <table>
                <tr>
                  <td>
                    <h4>Sandbox</h4>
                    <input className="checkbox" type="checkbox" name="sandbox" checked={this.state.sandbox} onChange={this.handleCheck}/>
                  </td>
                </tr>
                <tr>
                  <p>This kind of game gives players complete freedom to do as they please. There is often an overarching plot that players can engage with, but otherwise they are free to do whatever they want.</p>
                </tr>
              </table>
              <table>
                <tr>
                  <td>
                    <h4>Battle-Focused</h4>
                    <input className="checkbox" type="checkbox" name="battle_focused" checked={this.state.battle_focused} onChange={this.handleCheck}/>
                  </td>
                </tr>
                <tr>
                  <p>For those that love action in their campaigns. Less emphasis is put on story and worldbuilding, with more of a focus on the game's battle mechanics.</p>
                </tr>
              </table>
              <table>
                <tr>
                  <td>
                    <h4>Exploration</h4>
                    <input className="checkbox" type="checkbox" name="exploration" checked={this.state.exploration} onChange={this.handleCheck}/>
                  </td>
                </tr>
                <tr>
                  <p>This style is all about exploring the world. Players are encouraged to travel vast distances, visit many locales, and survive against the elements.</p>
                </tr>
              </table>
              <table>
                <tr>
                  <td>
                    <h4>Random</h4>
                    <input className="checkbox" type="checkbox" name="random" checked={this.state.random} onChange={this.handleCheck}/>
                  </td>
                </tr>
                <tr>
                  <p>Everything is left to chance. Even the DM doesn't know what comes next. Everything from villains, plots, treasure, significant world events, and dungeons can all be generated on the fly with dice rolls.</p>
                </tr>
              </table>
            </label>
          </div>

          <div className="form">
            <label>
              Campaign Image:
              <br></br>
              <select name="image" defaultValue={this.state.campaign.image} value={this.state.image} onChange={this.handleChange}>
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
              <input name="location" type="text" defaultValue={this.state.campaign.location} value={this.state.location} onChange={this.handleChange}/>
            </label>
          </div>

          <div className="form">
            <label>
              Next session:
              <br></br>
              <input name="next_session" type="datetime-local" defaultValue={this.state.campaign.next_session} value={this.state.next_session} onChange={this.handleChange} />
            </label>
          </div>
          <input className="submit" type="submit" value="Submit"/>
        </form>
      )
    } else {
      return (<p>Loading...</p>)
    }
  }

  render() {
    return(
      <div className="campaign-create">
        {this.renderRedirect()}
        <div className="Campaign-Box">
          <div className="Campaign-Details">
          {this.renderForm()}
          </div>
        </div>
      </div>
    );
  }
}

export default CampaignEdit;