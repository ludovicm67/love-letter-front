import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

export default class Options extends Component {

    render() {
        return (
        <div>
            <h1><FormattedMessage id="Options.title" /></h1>

            <Link to="/">
                <FormattedMessage id="Options.backToMenu" />
            </Link>
        </div>
    );
  }
}
