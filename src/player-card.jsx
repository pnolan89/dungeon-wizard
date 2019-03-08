import React, { Component } from "react";
import './join-request.css';
import { Link } from "react-router-dom";

class PlayerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  componentDidMount() {
    console.log('PLAYER CARD REACHED: ', this.props.playerInfo)
  }

  render() {

    return(
      <Link to={`/users/${this.props.playerInfo.id}`}>
      <div className="player">
      <div className="player-info">
      <h3>{this.props.playerInfo.name}</h3>
      <h4>Experience level: {this.props.playerInfo.exp_level}</h4>
      <h4>Play style: {this.props.playerInfo.playing_style}</h4>
      </div>
      <div className="player-img">
      <img src="https://bit.ly/2C3tnvb" />
      </div>
      </div>
      </Link>
    )
  }
}
export default PlayerCard;