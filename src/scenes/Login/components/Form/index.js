import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

/**********************/
/***FORMULAIRE LOGIN***/
/**********************/

export class Form extends Component {
  render() {
    return (
        <form>
            <label id="pseudo">
                <FormattedMessage id="Login.Form.pseudoLabel" />
            </label>
            <input id="pseudo" name="pseudo" />

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

Form.propTypes = {
  getFormData: PropTypes.func
};
