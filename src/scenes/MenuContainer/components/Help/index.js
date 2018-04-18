import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

export default class Help extends Component {
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage id="Help.title" />
        </h1>

      </div>
    );
  }
}
