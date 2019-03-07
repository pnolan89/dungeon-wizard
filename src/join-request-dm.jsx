import React, { Component } from "react";
import './join-request.css';
import axios from 'axios';


class JoinRequestDM extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.checkStatus = this.checkStatus.bind(this);
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
          <div className="user-info">
          <p>{request.user.name}</p>
            <p>{request.request.message}</p>
          </div>
          <div className="operations">
          <input type="submit" name="action" value="Approve"  onClick={this.approve(request.request.id)} />
          <input type="submit" name="action" value="Reject" onClick={this.reject(request.request.id)} />
          </div>
          </div>
        )
      })
      return join_requests
    }
  }

  approve(id) {
    return function(){
      let update = {
        dm_confirm: "approved"
      }
    axios.put(`http://localhost:3000/join_requests/${id}`, update)
      .then((response) => {
        console.log("Success", response)
      })
      .catch((response) => {
        console.log("Failure", response)

      })
    }
  }

  reject(id) {
    return function(){
      let update = {
        dm_confirm: "rejected"
      }
    axios.put(`http://localhost:3000/join_requests/${id}`, update)
      .then((response) => {
        console.log("Success", response)
      })
      .catch((response) => {
        console.log("Failure", response)
      })
    }
  }


  componentDidMount() {
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