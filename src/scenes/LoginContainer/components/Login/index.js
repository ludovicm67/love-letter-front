import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Radium from 'radium';

import Form from './components/Form/';
import { colors } from '../../../../utils';

/*******************/
/***PAGE DE LOGIN***/
/*******************/

class Login extends Component {
  render() {
    var loginStyle = {
      container: {
        padding: '50px',
        fontSize: '1.2em',

        //phone
        '@media (max-width: 768px)': {
          padding: '0 10px',
        },
      },

      title: {
        textAlign: 'center',
        marginBottom: '10%',

        //phone
        '@media (max-width: 768px)': {
          margin: 0,
          fontSize: '0.8em',
        },
      },

      link: {
        textDecoration: 'none',
        color: colors.whiteColor,
      },
    };

    return (
      <div style={loginStyle.container}>
        <h1 style={loginStyle.title}>
          <FormattedMessage id="Login.title" />
        </h1>

        <Form />

        <Link to="/register" style={loginStyle.link}>
          <FormattedMessage id="Login.linkToRegister" />
        </Link>
      </div>
    );
  }
}

export default Radium(Login);
