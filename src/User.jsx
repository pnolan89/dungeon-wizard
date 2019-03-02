import React, { Component } from "react";
import './User.css';

class User extends Component {
    render() {  
        return(
                 <div className="user">
                    <div className="user-box"> 
                        <div className="user-details">
                            <h1>LolaTheElfDog</h1>
                            <p>Member since: </p>
                            <p>Currently playing:</p>
                            <p>Playing Style: super tough </p>
                            <p>Experience level: newbie</p>
                        </div>
                        <div className="user-image">
                            <img src="https://bit.ly/2C3tnvb" />
                        </div>
                   
                    </div>   
                    <div classname="user-campaign">
                        <p>A campaign!</p>
                    </div>            
            </div>
        );
    }
}
export default User;