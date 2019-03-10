import React, { Component } from "react";
import './join-request.css';
import axios from 'axios';

class JoinRequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      message: this.state.message,
      dm_confirm: "pending",
      player_confirm: true,
      user_id: localStorage.user_id,
      campaign_id: this.props.campaign.id
    }
    axios.post('http://localhost:3000/join_requests', formData)
      .then((response) => {
        this.props.handleRequestForm(response.data)
        this.setState({
          dm_confirm: response.data,
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

    render() {
        return(
          <div className="join-box">
            <h4 className="join-form-heading">Request to join this campaign!</h4>
            <div className="join-form-message">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label for="message" className="message">Message</label>
                </div>
                <p className="message-subtext"></p>
                <textarea id="message" name="message"  placeholder="Tell the DM why you'd like to join!" value={this.state.message} onChange={this.handleChange}/>
                <div>
                  <input type="submit" value="Submit" />
                </div>
              </form>
           </div>
          </div>
        );
    }
}
export default JoinRequestForm;