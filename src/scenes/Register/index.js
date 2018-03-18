import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import Form from './components/Form/';

/********************************/
/***PAGE DE CREATION DE COMPTE***/
/********************************/

export class Register extends Component {

    render() {
        return (
        <div>
            <h1><FormattedMessage id="Register.title" /></h1>

            <Form/>

            <Link to="/">
                <FormattedMessage id="Register.linkToLogin" />
            </Link>
        </div>
    );
  }
}
