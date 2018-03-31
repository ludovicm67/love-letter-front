import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Radium from 'radium';

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
        height: '100vh',
        width: '80vw',

        //laptop
        '@media (max-width: 1200px)': {
            width: '95vw',
        },
        //tablet
        '@media (max-width: 992px)': {

        },
        //phone
        '@media (max-width: 768px)': {
            flexDirection: 'column',
            width: '100vw'
        },

        left: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: colors.blackColor,

            //laptop
            '@media (max-width: 1200px)': {},
            //tablet
            '@media (max-width: 992px)': {
                fontSize: '0.8em'
            },
            //phone
            '@media (max-width: 768px)': {
                fontSize: '0.4em',
                textAlign: 'center',
                margin: '5px auto'
            },

            title: {
                fontSize: '7em',
                span: {
                    display: 'block',
                    marginLeft: '40%',

                    //phone
                    '@media (max-width: 768px)': {
                        marginLeft: 0
                    },
                },
            },
            slogan: {
                fontSize: '2em',
                textAlign: 'right',

                //phone
                '@media (max-width: 768px)': {
                    textAlign: 'center',
                },
            }
        },

        right: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth:'500px',
            maxHeight: '75vh',
            backgroundColor: colors.lightMainColor,
            borderRadius: '3px',
            marginTop: '150px',

            //laptop
            '@media (max-width: 1200px)': {
                maxWidth:'50vw',
                width: '50%',
                maxHeight: '95vh',
                marginTop: '2.5vh'
            },
            //tablet
            '@media (max-width: 992px)': {
                fontSize: '1.3em'
            },
            //phone
            '@media (max-width: 768px)': {
                fontSize: "1.2em",
                width: '100vw',
                maxWidth: '100vw',
                height: '90vh',
                textAlign: 'center'
            },
        }
    };

    return (
      <div style={loginStyle}>
        <div style={loginStyle.left}>
            <h1 style={loginStyle.left.title}>
                <FormattedMessage id="LoginContainer.title" />

                <span style={loginStyle.left.title.span}>
                    <FormattedMessage id="LoginContainer.titleSpan" />
                </span>
            </h1>

            <h2 style={loginStyle.left.slogan}>
                <FormattedMessage id="LoginContainer.slogan" />
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

export default Radium(LoginContainer);
