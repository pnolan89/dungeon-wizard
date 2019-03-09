import React, { Component } from "react";
import './join-request.css';
import DMButton from './dm_button.jsx';
import { Redirect } from 'react-router-dom'
import axios from 'axios';


class JoinRequestDM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: this.props.request
    };
    this.handleDMForm = this.handleDMForm.bind(this);
    this.checkDMConfirm = this.checkDMConfirm.bind(this);
  }

  checkDMConfirm() {
      let array = this.props.requests
    console.log("array", array)
    let newArray = array.map((request) => {
      if (request.request.dm_confirm === "pending") {
        return request
      }
    })
    return newArray
  }

  checkStatus() {
    let existenceCheck = function(element) {
      return element !== undefined
    }
    let array = this.checkDMConfirm()
    if (!array.some(existenceCheck)) {
      return (
        <React.Fragment>
          <h3>No pending requests.</h3>
        </React.Fragment>
      )
    } else {
      const result = array.filter(array => array !== undefined);
      const join_requests = result.map((request) => {
        return (
          <div className="join-request-box" key={request.request.id}>
            <div className="user-info">
              <p>{request.user.name}</p>
              <p>{request.request.message}</p>
            </div>
            <div className="operations">
              <DMButton handleDMForm={this.handleDMForm} dm_confirm={request.request.dm_confirm} id={request.request.id} />
            </div>
          </div>
        )
      })
      return join_requests
    }
  }

  handleDMForm(newDMResponse) {
    console.log("parent response", newDMResponse)
    this.setState({
      request: newDMResponse
    })
  }

  componentDidMount() {
    this.checkDMConfirm()

  }

  render() {

    return(
      <div className="join-request-box">
        <h3>Requests:</h3>
        {this.checkStatus()}
      </div>

    );
  }
}
export default JoinRequestDM;