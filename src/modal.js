import axios from 'axios';
import React, { Component } from "react";


import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
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
      next_session: this.state.next_session
    }

    console.log(formData);
    let campaignID = this.props.campaignID;
    axios.put(`http://localhost:3000/campaigns/${campaignID}`, formData)
      .then((response) => {
        this.setState({
        });
        this.props.close()
          //handle success
          console.log(response);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
  }
  render() {
    return (
      <div className="modal-container">
          <div className="modal-wrapper"
              style={{
                  transform: this.props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                  opacity: this.props.show ? '1' : '0'
              }}>
             
              <div className="modal-body">
                  <p>
          <form onSubmit={this.props.handleSubmit} id="modal" >

                  <div className="form">
                      <label>
                      Next session:
                      <br></br>

                      <input name="next_session" id="next_session" type="datetime-local"  />
                      </label>
                      </div>
              <input className="Input" type="submit" value="Submit"/>

                      </form>

                  </p>
              </div>
              
          </div>
      </div>
  )
  }
    
}

export default Modal;