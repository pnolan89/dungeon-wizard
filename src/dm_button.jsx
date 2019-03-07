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
    console.log("Approve function") 
      let update = {
        dm_confirm: "approved"
      }
     
      let id = this.props.id
    axios.put(`http://localhost:3000/join_requests/${id}`, update)
      .then((response) => {
        console.log("in then")
       this.setState({
         redirect: true,
       })
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
        console.log("Success", response)
        this.setState({
          redirect: true,
        })
      })
      .catch((response) => {
        console.log("Failure", response)
      })
    }

  componentDidMount() {
  }

  render() {
      return(

//         <button onClick={this.approve}>
//   Approve
// </button>
<div>
  { this.props.dm_confirm === "pending" ? (
    <div>
    <button onClick={this.approve}>Approve</button>
    <button onClick={this.reject}>
      Reject
    </button>
    </div>
  ) : this.props.dm_confirm === "approved" ? (
    <p>Approved</p>
  ) : (
    <p>Rejected</p>
  )}

</div>
        // <React.Fragment>
          // <button type="submit" name="action" value="Approve"  onClick={this.approve(this.props.id)} />
          // <input type="submit" name="action" value="Reject" onClick={this.reject(this.props.id)} />
        // </React.Fragment>
               
      );
  }
}
export default DMButton;