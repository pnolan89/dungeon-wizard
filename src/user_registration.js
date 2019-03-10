import React, { Component } from "react";
import './user_registration.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom'


class UserRegistration extends Component {
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
      name: this.state.username,
      email: this.state.email,
      playing_style: this.state.play_style,
      exp_level: this.state.exp,
      password: this.state.password,
      avatar: this.state.avatar
    }
    axios.post('http://localhost:3000/users', formData)
      .then((response) => {
        localStorage.setItem('user_id', response.data.id);
        localStorage.setItem('username', response.data.username);
        this.setState({
          userId: response.data.id,
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
      let route = `/users/${this.state.userId}`
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
                <h1>Register</h1>
                <label>
                  Username:
                  <br />
                  <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                </label>
              </div>

              <div className="form">
                <label>
                  Email:
                  <br />
                  <input name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
                </label>
              </div>

              <div className="form">
                <label>
                  Password:
                  <br />
                  <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                </label>
              </div>

              <div className="form">
                <label>
                  Play-style:
                  <br />
                  <select name="play_style" value={this.state.play_style} onChange={this.handleChange}>
                    <option value=":">Choose...</option>
                    <option value="story-focused">Story-focused</option>
                    <option value="combat-focused">Combat-focused</option>
                  </select>
                </label>
              </div>

              <div className="form">
                <label>
                  Experience level:
                  <br />
                  <select name="exp" value={this.state.exp} onChange={this.handleChange}>
                    <option value=":">Choose...</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
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
            <input className="Input" type="submit" value="Submit"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default UserRegistration;