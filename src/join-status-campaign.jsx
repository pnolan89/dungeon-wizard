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
          <h3>Pending</h3>
        </React.Fragment>
      )
    } else if (this.props.request === "approved") {
      return (
        <React.Fragment>
          <h3>Approved</h3>
        </React.Fragment>
      )
    } else if (this.props.request === "rejected") {
      return (
        <React.Fragment>
          <h3>Rejected</h3>
        </React.Fragment>
      )
    }
  }

  componentDidMount() {
  }

  render() {
      return(
        <div className="join-box">
          <div className="top">
          <h2>Request status: {this.checkStatus()}</h2>
          </div>
          <div className="bottom">
            
          </div>
        </div>
               
      );
  }
}
export default JoinStatusCampaign;