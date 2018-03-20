import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { defineMessages, injectIntl } from 'react-intl';

import { api_login, mailRegex } from '../../../../utils';

const messages = defineMessages({
    emailError: {
        id: 'Register.Form.emailError'
    },
    passwordError: {
        id: 'Register.Form.passwordError'
    }
});

/**********************/
/***FORMULAIRE LOGIN***/
/**********************/

class Form extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            validEmail: '',
            validPassword: ''
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleLogin() {
        api_login(
            this.state.email,
            this.state.password
        );
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});

        if (mailRegex.test(e.target.value)) {
            this.setState({validEmail: ''});
        } else {
            this.setState({validEmail: this.props.intl.formatMessage(messages.emailError)});
        }
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});

        if (e.target.value.length >= 6) {
            this.setState({validPassword: ''});
        } else {
            this.setState({validPassword: this.props.intl.formatMessage(messages.passwordError)});
        }
    }

    render() {
        let { state, handleEmailChange, handlePasswordChange, handleLogin } = this;

        let formStyle = {
            errors: {
                color: 'red'
            }
        }

        return (
            <form>
                <label id="email">
                    <FormattedMessage id="Register.Form.emailLabel" />
                </label>
                <input id="email" required name="email" value={state.email} onChange={handleEmailChange} />
                <span style={formStyle.errors}>{state.validEmail}</span>

                <label id="password">
                    <FormattedMessage id="Register.Form.passwordLabel" />
                </label>
                <input id="password" required name="password" type="password" value={state.password} onChange={handlePasswordChange}/>
                <span style={formStyle.errors}>{state.validPassword}</span>

                <button type="button" onClick={handleLogin}>
                    <FormattedMessage id="Register.Form.submitButton" />
                </button>
            </form>
        );
  }
}

export default injectIntl(Form);
