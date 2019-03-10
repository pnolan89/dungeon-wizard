import React, { Component } from "react";
import './join-request.css';


class JoinStatusCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log("Getting to join status")
    console.log("props", this.props)
  }

  checkStatus() {
    if (this.props.request === "pending") {
      return (
        <React.Fragment>
          <h4 className="join-status-pending">Pending</h4>
        </React.Fragment>
      )
    } else if (this.props.request === "accepted") {
      return (
        <React.Fragment>
          <h4 className="join-status-accepted">Accepted</h4>
        </React.Fragment>
      )
    } else if (this.props.request === "rejected") {
      return (
        <React.Fragment>
          <h4 className="join-status-rejected">Rejected</h4>
        </React.Fragment>
      )
    }
  }

  render() {
    return(
      <div className="join-box">
        <div className="top">
          <h2 className="join-status-heading">Request status: {this.checkStatus()}</h2>
        </div>
        <div className="bottom">
        </div>
      </div>
    );
  }
}
export default JoinStatusCampaign;