import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

import { colors } from './utils.js';

import { Login } from './scenes/Login/';
import { Register } from './scenes/Register/';
import { Menu } from './scenes/Menu/';

/*****************/
/****Component****/
/*****************/

class App extends Component {
  render() {
    var appStyle = {
      backgroundColor: colors.lightMainColor,

      title: {
          textAlign: 'center'
      },
      page: {
        height: '100vh',
        width: '100vw'
      },
    };

    return (
      <div style={appStyle}>
        <h1 style={appStyle.title}>
          <FormattedMessage id="App.title" />
        </h1>

        <Router>
          <div style={appStyle.page}>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

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
