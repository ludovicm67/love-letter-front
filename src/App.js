import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { /*FormattedMessage,*/ injectIntl } from 'react-intl';

import { colors } from './utils.js';
import './styles.css';

import { LoginContainer } from './scenes/LoginContainer/';
import { Menu } from './scenes/Menu/';

/*****************/
/****Component****/
/*****************/

class App extends Component {
  render() {
    var appStyle = {
      backgroundColor: colors.whiteColor,
      fontFamily: 'Magra',

      page: {
        height: '100vh',
        width: '100vw'
      },
    };

    return (
      <div style={appStyle}>
        <Router>
          <div style={appStyle.page}>
            <Route exact path="/login" component={LoginContainer} />
            <Route exact path="/register" component={LoginContainer} />

            <Route
              path="*"
              render={() =>
                localStorage.getItem('token') ? (
                  <Menu />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default injectIntl(App);
