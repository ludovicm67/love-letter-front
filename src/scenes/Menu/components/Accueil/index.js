import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl'

/********************************/
/***PAGE DE CREATION DE COMPTE***/
/********************************/

export default class Accueil extends Component {

    render() {
        return (
        <div>
            <h1><FormattedMessage id="Accueil.title" /></h1>

            <Link to="/jouer">
                <FormattedMessage id="Accueil.linkToJouer" />
            </Link>

            <hr/>

            <Link to="/rejoindre">
                <FormattedMessage id="Accueil.linkToRejoindre" />
            </Link>
        </div>
    );
  }
}
