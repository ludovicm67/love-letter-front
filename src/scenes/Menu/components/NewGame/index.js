import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export default class NewGame extends Component {
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage id="NewGame.title" />
        </h1>

        <Link to="/jeu">
          <FormattedMessage id="NewGame.startLink" />
        </Link>

        <Link to="/">
          <FormattedMessage id="NewGame.backToMenu" />
        </Link>
      </div>
    );
  }
}
