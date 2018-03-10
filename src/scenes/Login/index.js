import React, { Component } from 'react';
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
        </div>
    );
  }
}
