import React, { Component } from "react";
import './user-edit.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom'


class UserEdit extends Component {
  constructor() {
    super();
    this.state = {
        redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let userID = this.props.match.params.userID;
    console.log(userID);
    axios.get(`http://localhost:3000/users/${userID}`)
      .then((response) => {
        this.setState({
          userName: response.data.user.name,
          userEmail: response.data.user.email,
          userPlaying_style: response.data.user.playing_style,
          userExp_level: response.data.user.exp_level,
          userPassword: response.data.user.password,
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
      name: this.state.name,
      email: this.state.email,
      playing_style: this.state.playing_style,
      exp_level: this.state.exp_level,
      password: this.state.password,
      avatar: this.state.avatar
    }

    let userID = this.props.match.params.userID;
    axios.put(`http://localhost:3000/users/${userID}`, formData)
      .then((response) => {
        this.setState({
          userID: response.data,
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
      let route = `/users/${this.props.match.params.userID}`
      return <Redirect to={route} />
    }
  }
    render() {
      return(
        <div className="registration">  
          {this.renderRedirect()}
            <div className="user-box"> 
              <div className="user-details">
                <form onSubmit={this.handleSubmit}>
                  <div className="form">
                  <h1>Edit User...</h1>
                  <label>
                    Username: 
                    <br />
                    <input name="name" type="text" defaultValue={this.state.userName} onChange={this.handleChange}/>
                  </label>
                  </div>
                  <div className="form">
                    <label>
                      Email: 
                      <br />
                      <input name="email" type="email" defaultValue={this.state.userEmail} onChange={this.handleChange}/>
                    </label>
                  </div>
                  <div className="form">
                    <label>
                      Play-style: 
                      <br />
                      <select name="play_style" defaultValue={this.state.userPlaying_style} onChange={this.handleChange}>
                        <option value=":">Choose...</option>
                        <option value="aggressive">Aggressive</option>
                        <option value="rpg">RPG</option>
                        <option value="easy-going">Easy-going</option>
                      </select>
                    </label>
                  </div>
                  <div className="form">
                    <label>
                      Experience level: 
                      <br />
                      <select name="exp" defaultValue={this.state.exp} onChange={this.handleChange}>
                        <option value=":">Choose...</option>
                        <option value="newbie">Newbie</option>
                        <option value="moderate">Moderate</option>
                        <option value="advanced">Advanced</option>
                        <option value="wizard">Wizard</option>
                      </select>
                    </label>
                  </div>
                  <div className="form">
                    <label>
                      Password: 
                      <br />
                      <input name="password" type="password" defaultValue={this.state.userPassword} onChange={this.handleChange}/>
                    </label>
                  </div>

                  <div className="form">
                    <label>
                      Avatar:
                      <br />
                      <select name="avatar" value={this.state.avatar} onChange={this.handleChange}>
                        <option value=":">Choose...</option>
                        <option value="https://bit.ly/2XGVwkU">Mage </option>
                        <option value="https://bit.ly/2tX8YU2">Wizard</option>
                        <option value="https://bit.ly/2H7saHd">Soldier</option>
                        <option value="https://bit.ly/2CaG1bT">Elf</option>
                        <option value="https://bit.ly/2H4WFxy">Orc Shaman</option>
                        <option value="https://bit.ly/2TIELH6">Hell Knight</option>
                        <option value="https://bit.ly/2VG0jRM">Assassin</option>
                        <option value="https://bit.ly/2EWW1ji">Orc</option>
                        <option value="https://bit.ly/2tUndsO">Skeleton</option>
                      </select>
                    </label>
                  </div>
                      
                  <input className="input" type="submit" value="Submit" />
                </form>
              </div>
            </div>       
        </div>
      );
    }
}
export default UserEdit;