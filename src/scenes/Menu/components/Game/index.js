import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export default class Game extends Component {
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage id="Game.title" />
        </h1>

        <Link to="/">
          <FormattedMessage id="Game.backToMenu" />
        </Link>
      </div>
    );
  }
}
