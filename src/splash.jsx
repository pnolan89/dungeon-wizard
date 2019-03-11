import React, { Component } from "react";
import './splash.css';
import axios from 'axios';
import { Link } from "react-router-dom";


class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
        redirect: false,
    };
}
   
    render() {
        return(

                <div className="splash">
               
               <h1>bringing adventurers together</h1>

               
               
                <div className="splash-details">


           

                <div className="image">
                <img src="https://i.imgur.com/g4k3xxt.png"/>
                {/* <img src="https://i.imgur.com/mUIbPCl.png" /> */}
                </div>

               
                       
               
               
               

               
                <div className="users overlay" >
                <h2>begin your journey!</h2>
                <Link to="/users/new/">
                <h3>REGISTER</h3>
                </Link>
                </div>
               

               
                <div className="login">
                <h2>welcome back traveller...</h2>
                <Link to="/login/">
                <h3>LOGIN</h3>
                </Link>
                </div>


                <div className="campaigns" >
                <h2>your adventures await!</h2>
                <Link to="/campaigns/">
                <h3>CAMPAIGNS</h3>
                </Link>
                </div>

                </div>
   
                </div>
        );
    }
}
export default Splash;