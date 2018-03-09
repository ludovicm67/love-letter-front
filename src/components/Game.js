import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'

export class Game extends Component {
  render() {
    return (
        <p>
            <FormattedMessage id="Game.welcome" />
        </p>
    );
  }
}
