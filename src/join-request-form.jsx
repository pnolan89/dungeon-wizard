import React, { Component } from "react";
import './join-request.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom'


class JoinRequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          redirect: false,
          message: ""
        };
        console.log("Getting to join request")
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
        dm_confirm: false,
        player_confirm: true,
        user_id: localStorage.user_id,
        campaign_id: this.props.campaign.id
      }
      console.log(formData);
      axios.post('http://localhost:3000/join_requests', formData)
        .then((response) => {
          console.log(response)
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

    componentDidMount() {
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        let route = `/users/${this.state.userId}`
        return <Redirect to={route} />
      }
    }
    render() {
        return(
          <div className="join-box">
          <div className="top">
          <h3>Request to join this campaign!</h3>
          </div>
          <div className="bottom">
            <div>Username:</div>
            <div>Campaign Name: {this.props.campaign.name}</div>
            <div className="form">
            <form onSubmit={this.handleSubmit}>
            <div>
              <label for="message">Why should the DM let you join?</label></div>
                <textarea id="message" name="message"  value={this.state.message} onChange={this.handleChange}/>
              <div>
                <input type="submit" value="Submit" /></div>
            </form>
            </div>
          </div>
          </div>
                 
        );
    }
}
export default JoinRequestForm;