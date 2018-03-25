import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Form from './components/Form/';
import { colors } from '../../../../utils';

/********************************/
/***PAGE DE CREATION DE COMPTE***/
/********************************/

export default class Register extends Component {
  render() {
    var registerStyle = {
      container: {
          padding: '50px',
          fontSize: '1.2em'
      },

      title: {
          textAlign: 'center',
          marginBottom: '5%'
      },

      link: {
          textDecoration: 'none',
          color: colors.whiteColor
      }
    };

    return (
      <div style={registerStyle.container}>
        <h1 style={registerStyle.title}>
          <FormattedMessage id="Register.title" />
        </h1>

        <Form />

        <Link to="/login" style={registerStyle.link}>
          <FormattedMessage id="Register.linkToLogin" />
        </Link>
      </div>
    );
  }
}
