import React, { Component } from "react";
import './user-index.css';
import axios from 'axios';
import { Link } from "react-router-dom";


class UserIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
}

componentDidMount() {
  axios.get(`http://localhost:3000/users/`)
  .then ((response) => {
      console.log('USER: ', response.data);
      this.setState({
          users: response.data
      });
      console.log(this.state);
  })
  .catch(function (error) {
      console.log(error);
  });
}


getUserData() {
  if (this.state.users) {
      const users = this.state.users.map((user) => {
        return(
          <div className="User-Index">
          <Link to={`/users/${user.user.id}`}>
          <div className="User-Card">
            <div className="User-Card-Details">
                <h1>{user.user.name}</h1>
                <p>Play-style: {user.user.playing_style}</p>
                <p>Experience level: {user.user.exp_level}</p>
                <p>Campaigns: {user.campaigns.length}</p>
            </div>
            <div className="User-Index-Image">
                <img src="https://bit.ly/2C3tnvb" />
            </div>
          </div>
          </Link>
          </div>
          
        )
      })
      return users;
  } else {
      return (<p>Loading...</p>);
  }
}
    render() {

        return(
            <React.Fragment>
            {this.getUserData()}
            </React.Fragment>
        );
    }
}
export default UserIndex;