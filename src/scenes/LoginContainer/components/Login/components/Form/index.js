import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';
import Radium from 'radium';

import { api_login, colors } from '../../../../../../utils';

/**********************/
/***FORMULAIRE LOGIN***/
/**********************/

class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleKeypress = e => {
    if (e.key === 'Enter') {
      this.handleLogin();
    }
  };

  handleLogin() {
    api_login(this.state.name, this.state.password);
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    let { handleLogin, handleNameChange, handlePasswordChange, state } = this;

    let formStyle = {
      padding: '30px 0',

      label: {
        display: 'block',
        margin: '10px 0',
      },
      input: {
        minHeight: '25px',
        minWidth: '70%',
        marginBottom: '10px',
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
        cursor: 'pointer',

        //phone
        '@media (max-width: 768px)': {
          margin: '20px auto 40px auto',
        },
      },
    };

    return (
      <form style={formStyle}>
        <label id="name" style={formStyle.label}>
          <FormattedMessage id="Login.Form.nameLabel" />
        </label>
        <input
          id="name"
          name="name"
          value={state.name}
          onChange={handleNameChange}
          style={formStyle.input}
        />

        <label id="password" style={formStyle.label}>
          <FormattedMessage id="Login.Form.passwordLabel" />
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={state.password}
          onChange={handlePasswordChange}
          style={formStyle.input}
          onKeyPress={this.handleKeypress}
        />

        <button type="button" onClick={handleLogin} style={formStyle.submit}>
          <FormattedMessage id="Login.Form.submitButton" />
        </button>
      </form>
    );
  }
}

export default injectIntl(Radium(Form));
