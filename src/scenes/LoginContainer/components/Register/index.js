import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import Form from './components/Form/';
import { StyledLink } from '../../../../components/';

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
      }
    };

    return (
      <div style={registerStyle.container}>
        <h1 style={registerStyle.title}>
          <FormattedMessage id="Register.title" />
        </h1>

        <Form />

        <StyledLink to="/login" msgId="Register.linkToLogin" />
      </div>
    );
  }
}
