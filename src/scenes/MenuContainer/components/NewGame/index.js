import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { API_URL } from '../../../../utils';

export default class NewGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        game_id: '',
        game_infos: {},
      },
      is_creator: false,
    };

    // if got game props from other location
    if (props.location.state && props.location.state.game) {
      this.state.game = props.location.state.game;
    }

    // create a game if not joining one
    if (this.state.game.game_id === '') {
      const userToken = localStorage.getItem('token');
      axios
        .get(`${API_URL}/game/create?token=${userToken}`)
        .then(response => response.data)
        .then(json => {
          if (!json.success) {
            throw new Error('unable to create game');
          }
          this.setState({
            game: json.data,
            is_creator: true,
          });
        })
        .catch(() => {
          console.error('unable to create game');
          this.props.history.push('/login');
          window.location.reload();
        });
    }
  }

  render() {
    const launchBtn = this.state.is_creator ? (
      <Link to="/jeu">
        <button>Lancer</button>
      </Link>
    ) : (
      ''
    );
    return (
      <div>
        <h1>
          <FormattedMessage id="NewGame.title" />
        </h1>

        <Link to="/jeu">
          <FormattedMessage id="NewGame.startLink" />
        </Link>

        <Link to="/">
          <FormattedMessage id="NewGame.backToMenu" />
        </Link>

        <p>GAME_ID: {this.state.game.game_id}</p>
        <p>GAME_INFOS: {JSON.stringify(this.state.game.game_infos)}</p>

        <p>{launchBtn}</p>
      </div>
    );
  }
}
