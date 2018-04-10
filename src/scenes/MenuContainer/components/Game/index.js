import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { API_URL, echo } from '../../../../utils';

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

  playGame(state, card) {
    const userToken = localStorage.getItem('token');
    const data = new FormData();
    data.append('game_id', state.game.game_id);
    data.append('action', 'play_card');
    data.append('card', card);
    axios.post(`${API_URL}/game/play?token=${userToken}`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
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

        <button onClick={this.playGame.bind(this, this.state, 1)}>
          Card 1
        </button>
        <button onClick={this.playGame.bind(this, this.state, 2)}>
          Card 2
        </button>
        <button onClick={this.playGame.bind(this, this.state, 3)}>
          Card 3
        </button>
        <button onClick={this.playGame.bind(this, this.state, 4)}>
          Card 4
        </button>
        <button onClick={this.playGame.bind(this, this.state, 5)}>
          Card 5
        </button>

        <p>GAME_INFOS: {JSON.stringify(this.state)}</p>
      </div>
    );
  }
}
