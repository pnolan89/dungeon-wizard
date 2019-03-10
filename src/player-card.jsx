import React, { Component } from "react";
import './join-request.css';
import { Link } from "react-router-dom";

class PlayerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderEmail() {
    if (this.props.isPlayer || this.props.isDM) {
      return (
        <h4>Email: {this.props.playerInfo.email}</h4>
      );
    }
  }

  componentDidMount() {
  }

  render() {
    return(
      <Link to={`/users/${this.props.playerInfo.id}`}>
        <div className="player">
          <div className="player-info">
            <h3>{this.props.playerInfo.name}</h3>
            {this.renderEmail()}
            <h4>Experience level: {this.props.playerInfo.exp_level}</h4>
            <h4>Play style: {this.props.playerInfo.playing_style}</h4>
          </div>
          <img src={this.props.playerInfo.avatar} />
        </div>
      </Link>
    )
  }
}
export default PlayerCard;