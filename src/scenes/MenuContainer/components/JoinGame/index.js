import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export default class JoinGame extends Component {
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
      </div>
    );
  }
}
