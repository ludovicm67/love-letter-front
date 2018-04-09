import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { echo } from '../../../../utils';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        game_id: '',
        game_infos: {
          players: [],
        },
      },
    };

    // if got game props from other location
    if (props.location.state && props.location.state.game) {
      this.state.game = props.location.state.game;
    }

    // listen to game changes
    if (this.state.game.game_id !== '') {
      echo
        .channel(`channel-game:${this.state.game.game_id}`)
        .listen('UpdateGameEvent', e => {
          this.setState({
            game: e.content.game,
          });
        });
    }
  }

  componentWillUnmount() {
    echo.leave(`channel-game:${this.state.game.game_id}`);
  }

  render() {
    return (
      <div>
        <h1>
          <FormattedMessage id="Game.title" />
        </h1>

        <Link to="/">
          <FormattedMessage id="Game.backToMenu" />
        </Link>

        <p>GAME_INFOS: {JSON.stringify(this.state)}</p>
      </div>
    );
  }
}
