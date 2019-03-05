import React, { Component } from 'react';
import './Nav.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
      return (
        <nav className='navbar'>
          <div className='logo'><a href='/' className='navbar-brand'><h1>DuNgeOn WiZarD</h1></a> </div>
          <div className='pages'> <Link to="/user/">User</Link> <Link to="/campaigns/">Campaign</Link></div>
        </nav>
        )
    }
    }