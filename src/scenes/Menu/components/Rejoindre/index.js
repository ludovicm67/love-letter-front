import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

/*********************/
/***NOUVELLE PARTIE***/
/*********************/

export default class Rejoindre extends Component {

    render() {
        return (
        <div>
            <h1><FormattedMessage id="Rejoindre.title" /></h1>

            <Link to="/">
                <FormattedMessage id="Rejoindre.backToMenu" />
            </Link>
        </div>
    );
  }
}
