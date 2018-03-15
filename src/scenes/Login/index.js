import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl'

import { Form } from './components/Form/';

/*******************/
/***PAGE DE LOGIN***/
/*******************/

export class Login extends Component {

    getFormData() {
        console.log("hellooow !");
    }

    render() {
        return (
        <div>
            <h1><FormattedMessage id="Login.title" /></h1>

            <Form getFormData={this.getFormData} />

            <Link to="/register">
                <FormattedMessage id="Login.linkToRegister" />
            </Link>

            <hr />

            <Link to="/">
                <FormattedMessage id="Login.fakeConnection" />
            </Link>
        </div>
    );
  }
}
