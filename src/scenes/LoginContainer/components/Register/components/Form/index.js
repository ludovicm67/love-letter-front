import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { defineMessages, injectIntl } from 'react-intl';

import { api_register, mailRegex, colors } from '../../../../../../utils';

const messages = defineMessages({
  emailError: {
    id: 'Register.Form.emailError',
  },
  passwordError: {
    id: 'Register.Form.passwordError',
  },
});

/*************************/
/***FORMULAIRE REGISTER***/
/*************************/

class Form extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      password: '',
      validEmail: '',
      validPassword: '',
    };

    this.handleRegister = this.handleRegister.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleRegister() {
    api_register(this.state.name, this.state.password, this.state.email);
  }

  handleEmailChange = e => {
    this.setState({ email: e.target.value });

    if (mailRegex.test(e.target.value)) {
      this.setState({ validEmail: '' });
    } else {
      this.setState({
        validEmail: this.props.intl.formatMessage(messages.emailError),
      });
    }
  };
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });

    if (e.target.value.length >= 6) {
      this.setState({ validPassword: '' });
    } else {
      this.setState({
        validPassword: this.props.intl.formatMessage(messages.passwordError),
      });
    }
  };

  render() {
    let {
      state,
      handleEmailChange,
      handleNameChange,
      handlePasswordChange,
      handleRegister,
    } = this;

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
        },
        errors: {
            color: 'red',
        },
    };

    return (
      <form style={formStyle}>
        <label id="email" style={formStyle.label}>
          <FormattedMessage id="Register.Form.emailLabel" />
        </label>
        <input
          id="email"
          name="email"
          value={state.email}
          onChange={handleEmailChange}
          style={formStyle.input}
        />
        <span style={formStyle.errors}>{state.validEmail}</span>

        <label id="name" style={formStyle.label}>
          <FormattedMessage id="Register.Form.nameLabel" />
        </label>
        <input
          id="name"
          name="name"
          value={state.name}
          onChange={handleNameChange}
          style={formStyle.input}
        />

        <label id="password" style={formStyle.label}>
          <FormattedMessage id="Register.Form.passwordLabel" />
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={state.password}
          onChange={handlePasswordChange}
          style={formStyle.input}
        />
        <span style={formStyle.errors}>{state.validPassword}</span>

        <button type="button" onClick={handleRegister} style={formStyle.submit}>
          <FormattedMessage id="Register.Form.submitButton" />
        </button>
      </form>
    );
  }
}

export default injectIntl(Form);
