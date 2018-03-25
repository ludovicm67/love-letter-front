import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';

import { api_login, colors } from '../../../../../../utils';

/**********************/
/***FORMULAIRE LOGIN***/
/**********************/

class Form extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    api_login(this.state.email, this.state.password);
  }

  render() {
    let { handleLogin } = this;

    let formStyle = {
        padding: '30px 0',

        label: {
            display: 'block',
            margin: '10px 0',
        },
        input: {
            minHeight: '25px',
            minWidth: '70%',
            marginBottom: '10px'
        },
        submit: {
            display: 'block',
            height: '40px',
            marginTop: '20px',
            border: 'none',
            borderRadius: '1px',
            fontWeight: '600',
            fontSize: '0.8em',
            backgroundColor: colors.darkMainColor,
            color: colors.whiteColor,
            cursor: 'pointer'
        }
    };

    return (
      <form style={formStyle}>
        <label id="email" style={formStyle.label}>
          <FormattedMessage id="Login.Form.emailLabel" />
        </label>
        <input
          id="email"
          name="email"
          style={formStyle.input}
        />

        <label id="password" style={formStyle.label}>
          <FormattedMessage id="Login.Form.passwordLabel" />
        </label>
        <input
          id="password"
          name="password"
          type="password"
          style={formStyle.input}
        />

        <button type="button" onClick={handleLogin} style={formStyle.submit}>
          <FormattedMessage id="Login.Form.submitButton" />
        </button>
      </form>
    );
  }
}

export default injectIntl(Form);
