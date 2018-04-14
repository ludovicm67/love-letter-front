import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Radium from 'radium';

import MainMenu from './components/MainMenu';
import NewGame from './components/NewGame/';
import JoinGame from './components/JoinGame/';
import Rankings from './components/Rankings/';
import Help from './components/Help/';
import Options from './components/Options/';
import Game from './components/Game/';
import Credits from './components/Credits/';

import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import { colors, api_logout } from '../../utils';

/****************************/
/***CONTENEUR PAGE DE MENU***/
/****************************/

class MenuContainer extends Component {
  render() {
    var menuStyle = {
      container: {
        backgroundColor: colors.lightMainColor,
        height: '100vh',
        maxWidth: '100%',
        paddingTop: '40px',
      },

      title: {
        textAlign: 'center',
        fontSize: '4em',
        paddingBottom: '30px',

        //tablet
        '@media (max-width: 992px)': {
          fontSize: '3em',
        },
        //phone
        '@media (max-width: 768px)': {
          fontSize: '2em',
        },
      },

      icon: {
        color: colors.whiteColor,
        fontSize: '3em',
        marginLeft: '1em',
        //phone
        '@media (max-width: 768px)': {
          fontSize: '2em',
          marginBottom: '10px',
        },
      },
    };

    let { pathname } = this.props.location;

    if (!localStorage.getItem('token')) {
      return <Redirect to="/login" />;
    }

    return (
      <div style={menuStyle.container}>
        <Link to="/" onClick={api_logout}>
          <span style={menuStyle.icon} className="fa fa-sign-out" />
        </Link>

        {pathname !== '/jeu' && (
          <h1 style={menuStyle.title}>
            <FormattedMessage id="MenuContainer.title" />
          </h1>
        )}

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

export default Radium(MenuContainer);
