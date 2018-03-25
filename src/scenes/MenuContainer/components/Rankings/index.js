import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export default class Rankings extends Component {
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage id="Rankings.title" />
        </h1>

        <Link to="/">
          <FormattedMessage id="Rankings.backToMenu" />
        </Link>
      </div>
    );
  }
}
