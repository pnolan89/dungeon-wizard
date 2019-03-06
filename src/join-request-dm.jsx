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
          <div className="join-requests">
          <div className="user-info">
          <p>{request.user.name}</p>
            <p>{request.request.message}</p>
          </div>
          <div className="operations">
          <form onSubmit={this.handleSubmit}>
          <input type="submit" name="action" value="Approve" />
          <input type="submit" name="action" value="Reject" />
          </form>
          </div>
          </div>
        )
      })
      return join_requests
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let req_id = this.request.request.id
    if (event.target.value === "Approve") {
      axios.put(`http://localhost:3000/join_requests/${req_id}`, {
        data: { dm_confirm: true}
      })
      .then((response) => {
        console.log("Success", response)
      })
      .catch((response) => {
        console.log("Failure", response)

      })
  } else if (event.target.value === "Reject") {
    axios.delete(`http://localhost:3000/join_requests/${req_id}`, {
      params: { id: req_id }  
    })
      .then((response) => {
        console.log("Success", response)

      })
      .catch((response) => {
        console.log("Failure", response)

      })
  } else {
    console.log("Something went wrong!")
  }
    const formData = {
      name: this.state.username,
      email: this.state.email,
      playing_style: this.state.play_style,
      exp_level: this.state.exp,
      password: this.state.password
    }
    console.log(formData);
    axios.post('http://localhost:3000/users', formData)
      .then((response) => {
        localStorage.setItem('user_id', response.data.id);
        localStorage.setItem('username', response.data.name);
        this.setState({
          userId: response.data,
          redirect: true
        });
          //handle success
          console.log(response);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
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