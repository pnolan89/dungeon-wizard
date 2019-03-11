import React, { Component } from 'react';
import './Nav.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'


export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropClass: "dropdown-content",
      logout: false,
      redirect: false
    };
    this.dropdownClick = this.dropdownClick.bind(this);
    this.logoutClick = this.logoutClick.bind(this);
    this.handleWindowClick = this.handleWindowClick.bind(this);
    this.getCreate = this.getCreate.bind(this);
  }

  componentWillUnmount() {
    console.log("WillUnmount")
    document.removeEventListener('click', this.handleWindowClick);
  }

  componentWillMount() {
    console.log("WillMount: ", this.state.dropClass)
    document.addEventListener('click', this.handleWindowClick);
  }

  renderRedirect = () => {
    if (!localStorage.login) {
      let route = `/`
      return <Redirect to={route} />
    }
  }

  dropdownClick() {
    console.log(this.state.dropClass)
    if (this.state.dropClass === "dropdown-content") {
      this.setState({
        dropClass: "dropdown-content show"
      });
    } else {
      console.log("Got to else")
      this.setState({
        dropClass: "dropdown-content"
      });
    }
  }

  logoutClick() {
    return () => {
      localStorage.removeItem('user_id');
      localStorage.removeItem('username');
      localStorage.removeItem('login');
      this.setState({
        logout: true,
        redirect: true
      });
    };
  }

  handleWindowClick() {
    if (this.state.dropClass === 'dropdown-content show') {
      this.setState({
        dropClass: "dropdown-content"
      }, () => {
        console.log("I'm here");
        // window.removeEventListener('click', this.handleWindowClick);
      });
    }
  }

getRegister() {
  if (!localStorage.user_id) {
    return(
      <span>| <Link to="/users/new/">Register</Link></span>
  )}
}

getCreate() {

if (localStorage.user_id) {
  return(
    <span> | <Link to="/campaigns/new/">Create</Link></span>
  )}
}

  getDropdown() {
    if (localStorage.user_id) {
      let profilePath = `/users/${localStorage.user_id}/`;
      return (
        <div id="dropdown" className="dropdown">
          <button onClick={this.dropdownClick} className="dropbtn">{localStorage.username}</button>
          <div id="loginDropdown" className={this.state.dropClass}>
            <Link to={profilePath}>Profile</Link>
            <a onClick={this.logoutClick()}>Logout</a>
          </div>
        </div>
      );
    } else {
      return (
        <div id="dropdown" className="dropdown">
          <button onClick={this.dropdownClick} className="dropbtn">Login/Register</button>
          <div id="loginDropdown" className={this.state.dropClass}>
            <Link to="/login/">Login</Link>
            <Link to="/users/new">Register</Link>
          </div>
        </div>
      )
    }
  }

  render() {
      return (
        <nav className='navbar'>
        {this.renderRedirect()}
          <span className='logo'><Link to='/' className='navbar-brand'><h1>DuNgeOn WiZarD</h1></Link> </span>
          <span className='links'> <Link to="/users/">Users</Link> | <Link to="/campaigns/">Campaigns</Link> {this.getRegister()}   {this.getCreate()} </span>

          {this.getDropdown()}
        </nav>
        )
    }
    }