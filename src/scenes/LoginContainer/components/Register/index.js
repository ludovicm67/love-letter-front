import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Radium from 'radium';

import Form from './components/Form/';
import { StyledLink } from '../../../../components/';

/********************************/
/***PAGE DE CREATION DE COMPTE***/
/********************************/

class Register extends Component {
  render() {
    var registerStyle = {
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
        marginBottom: '5%',

        //phone
        '@media (max-width: 768px)': {
          margin: 0,
          fontSize: '0.8em',
        },
      },
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

export default Radium(Register);
