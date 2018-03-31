import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { API_URL, echo } from '../../../../utils';

export default class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };

    const userToken = localStorage.getItem('token');
    axios.get(`${API_URL}/game/waitlist?token=${userToken}`)
      .then(response => response.data)
      .then(json => {
        if (!json.success) {
          throw new Error('unable to get waitlist');
        }
        this.setState({games: json.data.games});
      })
      .catch(() => {
        console.error('unable to get waitlist');
        this.props.history.push('/login');
        window.location.reload();
      });

      // update games list when a new game is created/deleted somewhere
      echo
        .channel('channel-game-list')
        .listen('NewGameEvent', e => {
          this.setState({
            games: e.content.games,
          });
        })
        .listen('DeleteGameEvent', e => {
          this.setState({
            games: e.content.games,
          });
        });
  }

  componentWillUnmount() {
    echo.leave('channel-game-list');
  }

  deleteGame(gameId) {
    const userToken = localStorage.getItem('token');
    const data = new FormData();
    data.append('game_id', gameId);
    axios.post(`${API_URL}/game/delete?token=${userToken}`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  render() {
    const games = this.state.games.map(game => {
      let deleteAction;
      let joinAction = <Link to="/jeu"><button>Rejoindre</button></Link>;
      if (game.creator.name === localStorage.name) {
        deleteAction = <button onClick={this.deleteGame.bind(this, game.id)}>Supprimer</button>;
      }
      return <li key={game.id}>Partie de {game.creator.name}{joinAction}{deleteAction}</li>
    });

    return (
      <div>
        <h1>
          <FormattedMessage id="JoinGame.title" />
        </h1>

        <Link to="/jeu">
          <FormattedMessage id="JoinGame.joinLink" />
        </Link>

        <Link to="/">
          <FormattedMessage id="JoinGame.backToMenu" />
        </Link>

        <ul>{games}</ul>
      </div>
    );
  }
}
