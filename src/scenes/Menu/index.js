import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainMenu from './components/MainMenu';
import NewGame from './components/NewGame/';
import JoinGame from './components/JoinGame/';
import Rankings from './components/Rankings/';
import Help from './components/Help/';
import Options from './components/Options/';
import Game from './components/Game/';

/****************************/
/***CONTENEUR PAGE DE MENU***/
/****************************/

export class Menu extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={MainMenu} />
            <Route exact path="/jouer" component={NewGame} />
            <Route exact path="/rejoindre" component={JoinGame} />
            <Route exact path="/classement" component={Rankings} />
            <Route exact path="/aide" component={Help} />
            <Route exact path="/options" component={Options} />
            <Route exact path="/jeu" component={Game} />
          </div>
        </Router>
      </div>
    );
  }
}
/**

<Route exact path="/credits" component={} />

**/
