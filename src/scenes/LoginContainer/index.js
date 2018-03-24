import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Login from './components/Login';
import Register from './components/Register';

import { colors } from '../../utils';

/*****************************/
/***CONTENEUR PAGE DE LOGIN***/
/*****************************/

export class LoginContainer extends Component {
  render() {
    var loginStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        margin: 'auto',
        height: '70vh',
        width: '80vw',

        left: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: colors.blackColor,

            title: {
                fontSize: '7em',
                span: {
                    display: 'block',
                    marginLeft: '40%'
                },
            },
            slogan: {
                fontSize: '2em',
                textAlign: 'right'
            }
        },

        right: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth:'500px',
            backgroundColor: colors.lightMainColor,
            borderRadius: '3px',
            marginTop: '150px',
        }
    };

    return (
      <div style={loginStyle}>
        <div style={loginStyle.left}>
            <h1 style={loginStyle.left.title}>
                <FormattedMessage id="Menu.title" />

                <span style={loginStyle.left.title.span}>
                    <FormattedMessage id="Menu.titleSpan" />
                </span>
            </h1>

            <h2 style={loginStyle.left.slogan}>
                <FormattedMessage id="Menu.slogan" />
            </h2>
        </div>

        <Router>
          <div style={loginStyle.right}>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
          </div>
        </Router>
      </div>
    );
  }
}
