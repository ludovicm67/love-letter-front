import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

/**********************/
/***FORMULAIRE LOGIN***/
/**********************/

export class Form extends Component {
  render() {
    return (
        <form>
            <label id="name">
                <FormattedMessage id="Login.Form.nameLabel" />
            </label>
            <input id="name" name="name" />

            <label id="password">
                <FormattedMessage id="Login.Form.passwordLabel" />
            </label>
            <input id="password" name="password" />

            <button type="submit">
                <FormattedMessage id="Login.Form.submitButton" />
            </button>
        </form>
    );
  }
}
