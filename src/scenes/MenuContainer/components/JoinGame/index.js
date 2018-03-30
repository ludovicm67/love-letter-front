import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { API_URL } from '../../../../utils';

export default class JoinGame extends Component {
  render() {

    console.log('listing all games...');

    const userToken = localStorage.getItem('token');
    fetch(`${API_URL}/game/list?token=${userToken}`)
      .then(response => response.json())
      .then(function(json) {
        if (!json.success) {
          console.error('unable to fetch game list');
          return;
        }

        console.log(json.data.games);
      });

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
      </div>
    );
  }
}
