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
      password: this.state.password
    }
    console.log(formData);
    axios.post('http://localhost:3000/users', formData)
      .then((response) => {
        localStorage.setItem('currentUser', response.data);
        this.setState({
          userId: response.data,
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
        return(       //// changed className to 'registration' from 'user'
                 <div className="registration">  
                 {this.renderRedirect()}
                    <div className="user-box"> 
                        <div className="user-details">
                            <form onSubmit={this.handleSubmit}>
                            <div className="form">
                            <h1>Register...</h1>
                            <label>
                              Username: 
                              <br></br>
                              <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                            </label>
                            </div>
                            <div className="form">
                            <label>
                              Email: 
                              <br></br>
                              <input name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
                            </label>
                            </div>
                            <div className="form">
                            <label>
                              Play-style: 
                              <br></br>
                              <select name="play_style" value={this.state.play_style} onChange={this.handleChange}>
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
                              <br></br>
                              <select name="exp" value={this.state.exp} onChange={this.handleChange}>
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
                              <br></br>
                              <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
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
export default UserRegistration;