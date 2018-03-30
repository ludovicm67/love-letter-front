import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { logout } from '../../../../utils';

export default class MainMenu extends Component {
  render() {
    return (
      <div>
        <Link to="/jouer">
          <FormattedMessage id="MainMenu.linkToJouer" />
        </Link>

        <hr />

        <Link to="/rejoindre">
          <FormattedMessage id="MainMenu.linkToRejoindre" />
        </Link>

        <hr />

        <Link to="/classement">
          <FormattedMessage id="MainMenu.linkToRankings" />
        </Link>

        <hr />

        <Link to="/aide">
          <FormattedMessage id="MainMenu.linkToHelp" />
        </Link>

        <hr />

        <Link to="/options">
          <FormattedMessage id="MainMenu.linkToOptions" />
        </Link>

        <button onClick={logout}><FormattedMessage id = "MainMenu.logout" /></button>
      </div>
    );
  }
}
