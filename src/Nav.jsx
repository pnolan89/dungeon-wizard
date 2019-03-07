import React, { Component } from 'react';
import './Nav.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropClass: "dropdown-content"
    };
    this.dropdownClick = this.dropdownClick.bind(this);
    this.logoutClick = this.logoutClick.bind(this);
  }

  dropdownClick() {
    return () => {
      if (this.state.dropClass === "dropdown-content") {
        this.setState({
          dropClass: "dropdown-content show"
        });
      } else {
        this.setState({
          dropClass: "dropdown-content"
        });
      }
    };
  }

  logoutClick() {
    return () => {
      localStorage.removeItem('user_id');
      localStorage.removeItem('username');
      this.setState({
        logout: true
      });
    };
  }

  componentDidMount() {
    console.log(this.state.dropClass);
  }

  render() {
    let profilePath = `/users/${localStorage.user_id}/`;
      return (
        <nav className='navbar'>
          <span className='logo'><a href='/' className='navbar-brand'><h1>DuNgeOn WiZarD</h1></a> </span>
          <span className='links'> <Link to="/users/">Users</Link> | <Link to="/campaigns/">Campaigns</Link> | <Link to="/users/new/">Register</Link> | <Link to="/campaigns/new/">Create</Link></span>
          <div className="dropdown">
            <button onClick={this.dropdownClick()} className="dropbtn">{localStorage.username}</button>
            <div id="loginDropdown" className={this.state.dropClass}>
              <Link to={profilePath}>Profile</Link>
              <a onClick={this.logoutClick()}>Logout</a>
            </div>
          </div>
          <span className='login'></span>
        </nav>
        )
    }
    }