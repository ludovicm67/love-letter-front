import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Form from './components/Form/';
import { colors } from '../../../../utils';

/*******************/
/***PAGE DE LOGIN***/
/*******************/

export default class Login extends Component {
  render() {
    var loginStyle = {
        container: {
            padding: '50px',
            fontSize: '1.2em'
        },

        title: {
            textAlign: 'center',
            marginBottom: '10%'
        },

        link: {
            textDecoration: 'none',
            color: colors.whiteColor
        }
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
