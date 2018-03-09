import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'

export class Game extends React.Component {
  render() {
    return (
        <p>
            <FormattedMessage id={'Game.default'} defaultMessage={'Hello world'} />
        </p>
    );
  }
}
