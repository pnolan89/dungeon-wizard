import React, { Component } from "react";
import './join-request.css';
import axios from 'axios';



class DMButton extends Component {
  constructor(props) {
      super(props);
      this.state = {
        redir: false
      };
      this.approve = this.approve.bind(this);
      this.reject = this.reject.bind(this);
      this.fetchInfo = this.reject.bind(this);
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
          redir: true
        })
        this.location.reload()
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
          redir: true
        })
      })
      .catch((response) => {
        console.log("Failure", response)
      })
    }

    fetchInfo() {
      let id = this.props.id
      axios.get(`http://localhost:3000/join_requests/${id}`)
      .then((response) => {
        this.setState({
          reload: true
        })
      })
      .catch((response) => {

      })
    }

  componentDidMount() {
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("this", this.props.dm_confirm);
    console.log("next", nextProps.dm_confirm);
  }
  
  render() {
      return(
//         <div>
// {!this.state.redir (
  <div key={this.props.id}>
  { this.props.dm_confirm === "pending" ? (
    <div>
    <button onClick={this.approve}>Approve</button>
    <button onClick={this.reject}>
      Reject
    </button>
    </div>
  ) : this.props.dm_confirm === "approved" ? (
    <p>Approved</p>
  ) : this.props.dm_confirm === "rejected" ? (
    <p>Rejected</p>
  ): (
    <p>Pending</p>
  )}
{/* </div> */}
// ) : (
//   <div>
//     <p>Thanks for the response!</p>
//   </div>
// )}

</div>

      );
  }
}
export default DMButton;