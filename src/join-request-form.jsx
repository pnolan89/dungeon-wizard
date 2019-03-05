import React, { Component } from "react";
import './join-request.css';
import axios from 'axios';

class JoinRequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user_id: this.props.user_id,
          campaign_id: this.props.campaign_id
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
        user_id: this.state.user_id,
        campaign_id: this.state.campaign_id
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
            <form onSubmit={this.handleSubmit}>
              <div className="form">
              <label>
                Message:
                <textarea name="message" rows="10" cols="30" value={this.state.message} onChange={this.handleChange}/>
              </label>
              </div>
              <input type="submit" value="Submit" />
              </form>
    
          </div>
                 
        );
    }
}
export default JoinRequestForm;