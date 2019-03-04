import React, { Component } from "react";
import './User.css';
// import querystring from "querystring";
import axios from 'axios';


class UserRegistration extends Component {
  constructor() {
    super();
    this.state = {
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
    const data = new FormData(event.target);
    console.log(data);
    axios({
      method: 'post',
      url: 'http://localhost.com:3000/user',
      data: data,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
      .then(function (response) {
          //handle success
          console.log(response);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
  }
    render() {  
        return(
                 <div className="user">
                    <div className="user-box"> 
                        <div className="user-details">
                            <form onSubmit={this.handleSubmit}>
                            <div className="form">
                            <label>
                              Username:
                              <input name="username" type="text" value="" onChange={this.handleChange}/>
                            </label>
                            </div>
                            <div className="form">
                            <label>
                              Email:
                              <input name="email" type="email" value="@" onChange={this.handleChange}/>
                            </label>
                            </div>
                            <div className="form">
                            <label>
                              Play-style:
                              <select name="play_style" onChange={this.handleChange}>
                              <option value="aggressive">Aggressive</option>
                              <option value="rpg">RPG</option>
                              <option value="easy-going">Easy-going</option>
                              </select>
                            </label>
                            </div>
                            <div className="form">
                            <label>
                              Experience level:
                              <select name="exp" onChange={this.handleChange}>
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
                              <input name="password" type="password" value="" onChange={this.handleChange}/>
                            </label>
                            </div>
                            {/* <div className="form">
                            <label>
                              Confirm password:
                              <input name="password-confirmation" type="password" value={this.state.password_confirmation} onChange={this.handleInputChange} />
                            </label>
                            </div> */}
                            
                            <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>       
            </div>
        );
    }
}
export default UserRegistration;