import React, { Component } from "react";
import './join-request.css';
import axios from 'axios';



class DMButton extends Component {
  constructor(props) {
      super(props);
      this.state = {
      };
      this.approve = this.approve.bind(this);
      this.reject = this.reject.bind(this);
  }

  approve() {
      let update = {
        dm_confirm: "accepted"
      }

      let id = this.props.id
    axios.put(`http://localhost:3000/join_requests/${id}`, update)
      .then((response) => {
        console.log(response)
        console.log("button updat", update.dm_confirm)
        this.props.handleDMForm(update.dm_confirm)
      })
      .catch((response) => {
        console.log("Failure", response)
      })
  }
  reject() {
      let update = {
        dm_confirm: "rejected"
      }
      let id = this.props.id

    axios.put(`http://localhost:3000/join_requests/${id}`, update)
      .then((response) => {
        this.props.handleDMForm(update.dm_confirm)
      })
      .catch((response) => {
        console.log("Failure", response)
      })
    }


  componentDidMount() {
  }


  render() {
    console.log("props", this.props.dm_confirm)
      return(

  <div className="buttons" key={this.props.id}>
  { this.props.dm_confirm === "pending" ? (
    <div>
    <button onClick={this.approve}>Approve</button>
    <button onClick={this.reject}>
      Reject
    </button>
    </div>
  ) : this.props.dm_confirm === "accepted" ? (
    <p>Accepted</p>
  ) : this.props.dm_confirm === "rejected" ? (
    <p>Rejected</p>
  ): (
    <p>Pending</p>
  )}

</div>

      );
  }
}
export default DMButton;