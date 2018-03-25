import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import MainMenu from './components/MainMenu';
import NewGame from './components/NewGame/';
import JoinGame from './components/JoinGame/';
import Rankings from './components/Rankings/';
import Help from './components/Help/';
import Options from './components/Options/';
import Game from './components/Game/';
import Credits from './components/Credits/';

import { colors } from '../../utils';

/****************************/
/***CONTENEUR PAGE DE MENU***/
/****************************/

export class MenuContainer extends Component {
  render() {

    var menuStyle = {
        container: {
            backgroundColor: colors.lightMainColor,
            minHeight: '100vh',
            minWidth: '100vw',
            padding: '40px'
        },

        title: {
            textAlign: 'center',
            fontSize: '4em',
            paddingBottom: '30px'
        }
    };

    if(!localStorage.getItem('token')) {
        return (
            <Redirect to="/login" />
        );
    }

    return (
      <div style={menuStyle.container}>
        <h1 style={menuStyle.title}>
            <FormattedMessage id="MenuContainer.title" />
        </h1>

        <Router>
          <div>
            <Route exact path="/" component={MainMenu} />
            <Route exact path="/jouer" component={NewGame} />
            <Route exact path="/rejoindre" component={JoinGame} />
            <Route exact path="/classement" component={Rankings} />
            <Route exact path="/aide" component={Help} />
            <Route exact path="/options" component={Options} />
            <Route exact path="/jeu" component={Game} />
            <Route exact path="/credits" component={Credits} />
          </div>
        </Router>
      </div>
    );
  }
}
