import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { defineMessages, injectIntl } from 'react-intl';
import Radium from 'radium';

import { api_register, colors } from '../../../../../../utils';

const messages = defineMessages({
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
      validPassword: '',
    };

    this.handleRegister = this.handleRegister.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleKeypress = e => {
      if(e.key === 'Enter') {
        this.handleRegister();
     }
  }

  handleRegister() {
    api_register(this.state.name, this.state.password, this.state.email);
  }

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
            cursor: 'pointer',

            //phone
            '@media (max-width: 768px)': {
                margin: '20px auto 40px auto'
            },
        },
        errors: {
            color: 'red',
            display: 'block'
        },
    };

    return (
      <form style={formStyle}>
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
          onKeyPress={this.handleKeypress}
        />
        <span style={formStyle.errors}>{state.validPassword}</span>

        <button type="button" onClick={handleRegister} style={formStyle.submit}>
          <FormattedMessage id="Register.Form.submitButton" />
        </button>
      </form>
    );
  }
}

export default injectIntl(Radium(Form));
