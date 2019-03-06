import React, { Component } from 'react';
import './Nav.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
      return (
        <nav className='navbar'>
          <span className='logo'><a href='/' className='navbar-brand'><h1>DuNgeOn WiZarD</h1></a> </span>
          <span className='links'> <Link to="/users/">Users</Link> | <Link to="/campaigns/">Campaigns</Link> | <Link to="/register/">Register</Link></span>
          <span>{localStorage.currentUser}</span>
        </nav>
        )
    }
    }