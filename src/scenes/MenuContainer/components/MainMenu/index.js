import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import '../../../../../node_modules/font-awesome/css/font-awesome.min.css';
import { StyledLink } from '../../../../components/';

import { logout, colors } from '../../../../utils';

export default class MainMenu extends Component {
  render() {
    var menuStyle = {
        marginTop: '15vh',
        textAlign: 'center',
        fontSize: '2em',
        lineHeight: '1.5',

        icon: {
            color: colors.whiteColor,
            fontSize: '1.5em',
            margin: '1em'
        },
        text: {
            // color: colors.whiteColor,
            display: 'flex',
            justifyContent: 'space-around',
            margin: '8em auto 0 auto'
        }
    };

    return (
      <div style={menuStyle}>
        <button onClick={logout}><FormattedMessage id = "MainMenu.logout" /></button>

        <StyledLink to="/jouer" msgId="MainMenu.linkToJouer" />
        <StyledLink to="/rejoindre" msgId="MainMenu.linkToRejoindre" />

        <Link to="/classement">
          <span style={menuStyle.icon} className="fa fa-list-ol"></span>
        </Link>

        <Link to="/aide">
            <span style={menuStyle.icon} className="fa fa-question"></span>
        </Link>

        <Link to="/options">
            <span style={menuStyle.icon} className="fa fa-cog"></span>
        </Link>

        <div style={menuStyle.text}>
            <span>{ localStorage.getItem('name') }</span>
            <span>{ localStorage.getItem('points') } <FormattedMessage id="MainMenu.points" /></span>
        </div>
      </div>
    );
  }
}
