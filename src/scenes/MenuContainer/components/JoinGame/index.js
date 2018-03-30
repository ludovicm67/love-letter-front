import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { API_URL } from '../../../../utils';

export default class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };

    console.log('listing all games...');
    const userToken = localStorage.getItem('token');
    fetch(`${API_URL}/game/waitlist?token=${userToken}`)
      .then(response => response.json())
      .then(json => {
        if (!json.success) {
          console.error('unable to get waitlist');
          return;
        }

        console.log(json.data.games);
        this.setState({
          games: json.data.games,
        });
      })
      .catch(() => {
        console.error('unable to get waitlist');
      });
  }

  render() {
    return (
      <div>
        <h1>
          <FormattedMessage id="JoinGame.title" />
        </h1>

        <Link to="/jeu">
          <FormattedMessage id="JoinGame.joinLink" />
        </Link>

        <Link to="/">
          <FormattedMessage id="JoinGame.backToMenu" />
        </Link>

        {this.state.games}
      </div>
    );
  }
}
