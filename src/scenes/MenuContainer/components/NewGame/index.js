import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { API_URL, colors } from '../../../../utils';

export default class NewGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        game_id: '',
        game_infos: {
          creator: {
            name: '',
          },
        },
      },
      is_creator: false,
    };

    // if got game props from other location
    if (props.location.state && props.location.state.game) {
      this.state.game = props.location.state.game;
    } else if (localStorage.getItem('name') === this.state.game.creator.name) {
      this.state.is_creator = true;
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
    var newGameStyle = {
      // fontSize: '2em',
      lineHeight: '1.5',
      textColor: colors.blackColor,

      title: {
        fontSize: '1.9em',
        textAlign: 'center',
      },
      cellule: {
        padding: '2.5vh',
      },
      table: {
        margin: 'auto',
      },
    };
    const launchBtn = this.state.is_creator ? (
      <Link to="/jeu">
        <button>
          <FormattedMessage id="NewGame.startLink" />
        </button>
      </Link>
    ) : (
      ''
    );
    return (
      <div style={newGameStyle}>
        <h1 style={newGameStyle.title}>
          <FormattedMessage id="NewGame.title" />
        </h1>

        <Link to="/">
          <FormattedMessage id="NewGame.backToMenu" />
        </Link>

        <table style={newGameStyle.table}>
          <tr>
            <td style={newGameStyle.cellule}>Joueur 1</td>
            <td style={newGameStyle.cellule}>
              {this.state.game.game_infos.creator.name}
            </td>
          </tr>
          <tr>
            <td style={newGameStyle.cellule}>Joueur 2</td>
            <td style={newGameStyle.cellule}>
              <form>
                <select>
                  <option value="player">Joueur</option>
                  <option value="IA_easy">Ordi facile</option>
                  <option value="IA_normal">Ordi moyen</option>
                </select>
              </form>
            </td>
          </tr>
          <tr>
            <td style={newGameStyle.cellule}>Joueur 3</td>
            <td style={newGameStyle.cellule}>
              <form>
                <select>
                  <option value="player">Joueur</option>
                  <option value="IA_easy">Ordi facile</option>
                  <option value="IA_normal">Ordi moyen</option>
                  <option value="none">Aucun</option>
                </select>
              </form>
            </td>
          </tr>
          <tr>
            <td style={newGameStyle.cellule}>Joueur 4</td>
            <td style={newGameStyle.cellule}>
              <form>
                <select>
                  <option value="player">Joueur</option>
                  <option value="IA_easy">Ordi facile</option>
                  <option value="IA_normal">Ordi moyen</option>
                  <option value="none">Aucun</option>
                </select>
              </form>
            </td>
          </tr>
        </table>

        <p>GAME_ID: {this.state.game.game_id}</p>
        <p>GAME_INFOS: {JSON.stringify(this.state.game.game_infos)}</p>

        <p>{launchBtn}</p>
      </div>
    );
  }
}
