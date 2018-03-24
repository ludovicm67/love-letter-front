import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import MainMenu from './components/MainMenu';
import NewGame from './components/NewGame/';
import JoinGame from './components/JoinGame/';
import Rankings from './components/Rankings/';
import Help from './components/Help/';
import Options from './components/Options/';
import Game from './components/Game/';
import Credits from './components/Credits/';

/****************************/
/***CONTENEUR PAGE DE MENU***/
/****************************/

export class Menu extends Component {
  render() {
    return (
      <div>
        <h1>
            <FormattedMessage id="Menu.title" />
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
