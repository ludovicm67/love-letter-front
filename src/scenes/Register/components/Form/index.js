import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { api_register } from '../../../../utils';

/*************************/
/***FORMULAIRE REGISTER***/
/*************************/

export default class Form extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            name: '',
            password: ''
        };

        this.handleRegister = this.handleRegister.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleRegister () {
        console.log(this.state);
        api_register(
            this.state.name,
            this.state.password,
            this.state.email
        );
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }
    handleNameChange = (e) => {
        this.setState({name: e.target.value});
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    render() {
    return (
        <form>
            <label id="email">
                <FormattedMessage id="Register.Form.emailLabel" />
            </label>
            <input id="email" name="email" value={this.state.email} onChange={this.handleEmailChange} />

            <label id="name">
                <FormattedMessage id="Register.Form.nameLabel" />
            </label>
            <input id="name" name="name" value={this.state.name} onChange={this.handleNameChange} />

            <label id="password">
                <FormattedMessage id="Register.Form.passwordLabel" />
            </label>
            <input id="password" name="password" type="password" value={this.state.password} onChange={this.handlePasswordChange}/>

            <button type="button" onClick={this.handleRegister}>
                <FormattedMessage id="Register.Form.submitButton" />
            </button>
        </form>
    );
  }
}
