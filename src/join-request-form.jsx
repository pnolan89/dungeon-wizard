import React, { Component } from "react";
import './join-request.css';
import axios from 'axios';

class JoinRequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          // user_id: this.props.user_id,
          // campaign_id: this.props.campaign_id
        };
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
        message: this.state.message,
        dm_confirm: false,
        player_confirm: true,
        // user_id: this.state.user_id,
        // campaign_id: this.state.campaign_id
      }
      console.log(formData);
      axios.post('http://localhost:3000/join_request', formData)
        .then((response) => {
          this.setState({
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

    render() {
        return(
          <div className="join-box">
          <div className="title">
          <h3>Request to join this campaign!</h3>
          </div>
          <div className="form">
            <form onSubmit={this.handleSubmit}>
              <label for="message">Why should the DM let you join?</label>
                <textarea id="message" name="message" rows="10" cols="30" value={this.state.message} onChange={this.handleChange}/>
              <input type="submit" value="Submit" />
              </form>
              </div>
          </div>
                 
        );
    }
}
export default JoinRequestForm;