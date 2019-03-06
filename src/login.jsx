import React, { Component } from "react";
import './User.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('STORAGE: ', localStorage.currentUser);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      email: this.state.email,
      password: this.state.password
    }
    axios.get('http://localhost:3000/users/')
      .then((response) => {
        response.data.forEach((user) => {
          if (user.user.email === formData.email) {
            if (user.user.password === formData.password) {
              localStorage.setItem('currentUser', user.user.id);
              this.setState({
                redirect: true
              });
            } else {
              console.log('Incorrect password');
            }
          }
        });
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      let route = `/users/${localStorage.currentUser}`
      return <Redirect to={route} />
    }
  }
    render() {
        return(
                 <div className="user">
                 {this.renderRedirect()}
                    <div className="user-box">
                        <div className="user-details">
                            <h2>Login</h2>
                            <form onSubmit={this.handleSubmit}>
                            <div className="form">
                            <label>
                              Email:
                              <input name="email" type="email" value={this.state.email} onChange={this.handleChange}/>
                            </label>
                            </div>
                            <div className="form">
                            <label>
                              Password:
                              <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                            </label>
                            </div>

                            <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
            </div>
        );
    }
}
export default Login;