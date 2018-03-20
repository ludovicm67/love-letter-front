import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Login } from './scenes/Login/';
import { Register } from './scenes/Register/';
import { Menu } from './scenes/Menu/';

/*****************/
/****Component****/
/*****************/

class App extends Component {
  render() {
    var appStyle = {
      textAlign: 'center',

      page: {
        width: '80vw',
        minHeight: '70vh',
        margin: 'auto',
        border: '1px solid #000000',
        padding: 20,
      },
    };

    return (
      <div>
        <h1 style={appStyle}>
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
