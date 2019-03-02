import React, { Component } from 'react';
import './App.css';
import Nav from './Nav.jsx';
import Campaign from './campaign.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      messages: []
    };
  }
  componentDidMount() {
    axios.get('http://localhost:3000/users/29')
      .then(function (response) {
        console.log(response);
        // this.setState({
        //   messages: response
        // });
      })
    .catch(function (error) {
      // handle error
      console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <Campaign />
      </div>
    );
  }
}

export default App;
