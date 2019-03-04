import React, { Component } from "react";
import './User.css';

class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }
    render() {  
        return(
                 <div className="user">
                    <div className="user-box"> 
                        <div className="user-details">
                            <form onSubmit={this.handleSubmit}>
                            <label>
                              Username:
                              <input type="text" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <label>
                              Email:
                              <input type="email" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <label>
                              Play-style:
                              <select value={this.state.value} onChange={this.handleChange}>
                              <option value="aggressive">Aggressive</option>
                              <option value="rpg">RPG</option>
                              <option value="easy-going">Easy-going</option>
                              </select>
                            </label>
                            <label>
                              <select value={this.state.value} onChange={this.handleChange}>
                              <option value="newbie">Newbie</option>
                              <option value="moderate">Moderate</option>
                              <option value="advanced">Advanced</option>
                              <option value="wizard">Wizard</option>
                              </select>
                            </label>
                            <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>       
            </div>
        );
    }
}
export default UserRegistration;