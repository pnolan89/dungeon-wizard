import React, { Component } from "react";
import './join-request.css';
import DMButton from './dm_button.jsx';

class JoinRequestDM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: this.props.requests
    };
    this.handleDMForm = this.handleDMForm.bind(this);
    this.getPendingRequests = this.getPendingRequests.bind(this);
  }

  getPendingRequests() {
    let requests = this.state.requests;
    let pendingRequests = requests.map((request) => {
      if (request.request.dm_confirm === "pending") {
        return request;
      }
    });
    return pendingRequests;
  }

  checkStatus() {
    let existenceCheck = function(element) {
      return element !== undefined;
    };
    let pendingRequests = this.getPendingRequests()
    if (!pendingRequests.some(existenceCheck)) {
      return (
        <React.Fragment>
          <h4>No pending requests.</h4>
        </React.Fragment>
      )
    } else {
      const result = pendingRequests.filter(request => request !== undefined);
      const join_requests = result.map((request) => {
        return (
          <div className="join-request-box" key={request.request.id}>
            <div className="user-info">
              <p className="username">{request.user.name}</p>
              <p className="message">{request.request.message}</p>
            </div>
            <div className="operations">
              <DMButton handleDMForm={this.handleDMForm} requests={this.state.requests} dm_confirm={request.request.dm_confirm} id={request.request.id} />
            </div>
          </div>
        )
      })
      return join_requests
    }
  }

  handleDMForm(newStatus, id) {
    let updateRequests = this.state.requests.map((request) => {
      if (request.request.id === id) {
        request.request.dm_confirm = newStatus;
      }
      return request;
    })
    this.setState({
      requests: updateRequests
    })
  }

  componentDidMount() {
    this.getPendingRequests()
  }

  render() {
    return(
      <React.Fragment>
       {this.checkStatus()}
      </React.Fragment>
    );
  }
}
export default JoinRequestDM;