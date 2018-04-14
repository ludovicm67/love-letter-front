import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { API_URL, echo, colors } from '../../../../utils';

//import '../../../../node_modules/font-awesome/css/font-awesome.min.css';

export default class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };

    const userToken = localStorage.getItem('token');
    axios
      .get(`${API_URL}/game/waitlist?token=${userToken}`)
      .then(response => response.data)
      .then(json => {
        if (!json.success) {
          throw new Error('unable to get waitlist');
        }
        this.setState({ games: json.data.games });
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
      })
      .listen('UpdateGameInfosEvent', e => {
        this.setState({
          games: e.content.games,
        });
      });
  }

  componentWillUnmount() {
    echo.leave('channel-game-list');
  }

  joinGame(game) {
    const userToken = localStorage.getItem('token');
    const data = new FormData();

    data.append('game_id', game.id);
    axios
      .post(`${API_URL}/game/join?token=${userToken}`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => response.data)
      .then(json => {
        if (!json.success) {
          throw new Error('unable to join the game');
        }
        this.props.history.push({
          pathname: '/jouer',
          state: { game: { game_id: game.id, game_infos: json.data.game } },
        });
      })
      .catch(() => {
        console.error('unable to join the game');
      });
  }

  deleteGame(gameId) {
    const userToken = localStorage.getItem('token');
    const data = new FormData();
    data.append('game_id', gameId);
    axios.post(`${API_URL}/game/delete?token=${userToken}`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  render() {
    var joinGameStyle = {
      fontSize: '1.8em',
      lineHeight: '1.5',
      textColor: colors.blackColor,
      height: '100vh',

      title: {
        fontSize: '1.5em',
        textAlign: 'center',
      },

      buttonStyle: {
        backgroundColor: colors.darkMainColor,
        border: 'none',
        fontSize: '1em',
        cursor: 'pointer',
      },

      cellule: {
        padding: '2.5vh',
      },

      div_table: {
        overflowY: 'auto',
        height: '55%',
      },

      play: {
        textAlign: 'left',
        marginLeft: '5vh',
        padding: '5vh',
      },
    };
    const games = this.state.games.map(game => {
      if (
        game.creator.name !== localStorage.name &&
        game.slots.indexOf(0) === -1
      )
        return '';
      let action;
      if (game.creator.name === localStorage.name) {
        action = (
          <button
            style={joinGameStyle.buttonStyle}
            onClick={this.deleteGame.bind(this, game.id)}
          >
            <FormattedMessage id="JoinGame.delete" />
          </button>
        );
      } else {
        action = (
          <button
            style={joinGameStyle.buttonStyle}
            onClick={this.joinGame.bind(this, game)}
          >
            <FormattedMessage id="JoinGame.join" />
          </button>
        );
      }
      return (
        <tr key={game.id}>
          <td style={joinGameStyle.cellule}>
            <FormattedMessage id="JoinGame.salon" /> {game.creator.name}
          </td>
          <td style={joinGameStyle.cellule}>{game.players[0].name}</td>
          <td style={joinGameStyle.cellule}>
            {game.players.length > 1 ? game.players[1].name : ''}
          </td>
          <td style={joinGameStyle.cellule}>
            {game.players.length > 2 ? game.players[2].name : ''}
          </td>
          <td style={joinGameStyle.cellule}>
            {game.players.length > 3 ? game.players[3].name : ''}
          </td>
          <td style={joinGameStyle.cellule}>{action}</td>
        </tr>
      );
    });
    return (
      <div style={joinGameStyle}>
        <h1 style={joinGameStyle.title}>
          <FormattedMessage id="JoinGame.title" />
        </h1>

        <Link to="/">
          <FormattedMessage id="JoinGame.backToMenu" />
        </Link>

        <div style={joinGameStyle.div_table}>
          <table style={joinGameStyle.play}>
            <thead>
              <tr>
                <th style={joinGameStyle.cellule} />
                <th style={joinGameStyle.cellule}>
                  {' '}
                  <FormattedMessage id="JoinGame.player1" />{' '}
                </th>
                <th style={joinGameStyle.cellule}>
                  {' '}
                  <FormattedMessage id="JoinGame.player2" />{' '}
                </th>
                <th style={joinGameStyle.cellule}>
                  {' '}
                  <FormattedMessage id="JoinGame.player3" />{' '}
                </th>
                <th style={joinGameStyle.cellule}>
                  {' '}
                  <FormattedMessage id="JoinGame.player4" />{' '}
                </th>
                <th style={joinGameStyle.cellule} />
              </tr>
            </thead>
            <tbody>{games}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
