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
        game_infos: {}
      },
    };

    console.log('creating new game...');
    const userToken = localStorage.getItem('token');
    fetch(`${API_URL}/game/create?token=${userToken}`)
      .then(response => {
        if (response.status && response.status === 401) {
          this.props.history.push('/login');
          window.location.reload();
        }
        return response.json();
      })
      .then(json => {
        if (!json.success) {
          console.error('unable to create game');
          return;
        }

        this.setState({
          game: json.data,
        });
      })
      .catch(() => {
        console.error('unable to create game');
      });
  }

  render() {
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

      </div>
    );
  }
}
