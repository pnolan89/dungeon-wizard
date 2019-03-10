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
        <React.Fragment>
        <h4>Email: <span className="card-value">{this.props.playerInfo.email}</span></h4>
        </React.Fragment>
      );
    }
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
      {this.renderEmail()}
      <h4>Experience level: <span className="card-value">{this.capitalize(this.props.playerInfo.exp_level)}</span></h4>
      <h4>Play style: <span className="card-value">{this.capitalize(this.props.playerInfo.playing_style)}</span></h4>
      </div>
      <img src={this.props.playerInfo.avatar} />
      </div>
      </Link>
    )
  }
}
export default PlayerCard;