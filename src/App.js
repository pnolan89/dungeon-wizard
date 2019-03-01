import React, { Component } from 'react';
import './App.css';
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
    axios.get('http://localhost:3000', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      // withCredentials: true,
      // credentials: 'same-origin'
    })
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
        <p>Hello</p>
      </div>
    );
  }
}

export default App;
