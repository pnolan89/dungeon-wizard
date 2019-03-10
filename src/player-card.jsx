import React, { Component } from "react";
import './join-request.css';
import { Link } from "react-router-dom";

class PlayerCard extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  renderEmail() {
    if (this.props.isPlayer || this.props.isDM) {
      return (
        <React.Fragment>
        <h4>Email: <span className="card-value">{this.props.player.email}</span></h4>
        </React.Fragment>
      );
    }
  }

  onClick() {
    this.props.handlePlayerRemove(this.props.player.id)
  }

  renderRemoveBtn() {
    if (this.props.isDM) {
      return (
        <button onClick={this.onClick} className="player-delete-btn">Remove</button>
      )
    } else if (this.props.player.id === parseInt(localStorage.user_id)) {
      return (
        <button onClick={this.onClick} className="player-delete-btn">Resign</button>
      )
    }
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return(
      <div className="player">
        <div className="player-info">
          <Link to={`/users/${this.props.player.id}`}>
            <h3>{this.props.player.name}</h3>
          </Link>
          {this.renderEmail()}
          <h4>Experience level: <span className="card-value">{this.capitalize(this.props.player.exp_level)}</span></h4>
          <h4>Play style: <span className="card-value">{this.capitalize(this.props.player.playing_style)}</span></h4>
        </div>
        <div className="player-badges">
          <img src={this.props.player.avatar} />
          {this.renderRemoveBtn()}
        </div>
      </div>
    )
  }
}
export default PlayerCard;