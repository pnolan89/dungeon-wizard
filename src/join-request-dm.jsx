import React, { Component } from "react";
import './join-request.css';
import DMButton from './dm_button.jsx';
import { Redirect } from 'react-router-dom'
import axios from 'axios';


class JoinRequestDM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: false
    };
    this.checkStatus = this.checkStatus.bind(this);
    this.handler = this.handler.bind(this);
  }


 handler() {
  return this.forceUpdate();
 }

  checkStatus() {
    let existenceCheck = function(element) {
      return element !== undefined
    }
    let array = this.props.requests
    if (!array.some(existenceCheck)) {
      return (
        <React.Fragment>
          <h3>No pending requests.</h3>
        </React.Fragment>
      )
    } else {
      const join_requests = array.map((request) => {
        return (
          <div className="join-requests" key={request.request.id}>
          { request.request.dm_confirm === "approved" ? (
            <p>Approved</p>
          ) : request.request.dm_confirm === "rejected" ? (
            <p>Rejected...</p>
          ) : (
            <p>Pending...</p>
          )}
          <div className="user-info">
          <p>{request.user.name}</p>
            <p>{request.request.message}</p>
          </div>
          <div className="operations">
          <DMButton dm_confirm={request.request.dm_confirm} id={request.request.id} />
          </div>
          </div>
        )
      })
      return join_requests
    }
  }

  
 

  renderRedirect = () => {
      if (this.state.redirect) {
        let route = `/campaigns/${this.props.requests.request.campaign_id}`
        return <Redirect to={route} />
      }
  }

  componentDidUpdate(prevProps, prevStates) {
    console.log("props", prevProps)
    console.log("props", prevStates)
    console.log("inside CDU", this.state)
  }

  componentDidMount() {
    console.log("Parent CDM")
  }

  render() {
    return(
      <div className="join-box">
      <h3>Requests:</h3>
       {this.checkStatus()}
      </div>
               
    );
  }
}
export default JoinRequestDM;