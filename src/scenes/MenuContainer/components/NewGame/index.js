import axios from 'axios';
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { API_URL, colors } from '../../../../utils';

export class NewGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slot2: 0,
      slot3: 0,
      slot4: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.createGame = this.createGame.bind(this);
  }

  createGame() {
    const userToken = localStorage.getItem('token');
    const data = new FormData();
    data.append('slot2', this.state.slot2);
    data.append('slot3', this.state.slot3);
    data.append('slot4', this.state.slot4);
    axios
      .post(`${API_URL}/game/create?token=${userToken}`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => response.data)
      .then(json => {
        if (!json.success) {
          throw new Error('unable to create game');
        }
        this.props.history.push({
          pathname: '/attente',
          state: {
            game: json.data.game,
          },
        });
      })
      .catch(() => {
        console.error('unable to create game');
        this.props.history.push('/login');
        window.location.reload();
      });
  }

  handleChange(e) {
    switch (parseInt(e.target.dataset.slot, 10)) {
      case 0:
        this.setState({ slot2: e.target.value });
        break;
      case 1:
        this.setState({ slot3: e.target.value });
        break;
      case 2:
        this.setState({ slot4: e.target.value });
        break;
      default:
    }
  }

  render() {
    let { formatMessage } = this.props.intl;

    var newGameStyle = {
      fontSize: '1.8em',
      lineHeight: '1.5',
      textColor: colors.blackColor,

      title: {
        fontSize: '1.5em',
        textAlign: 'center',
      },

      cellule: {
        padding: '2vh',
      },

      table: {
        margin: 'auto',
      },

      buttonStyle: {
        backgroundColor: colors.darkMainColor,
        border: 'none',
        fontSize: '1em',
        cursor: 'pointer',
      },

      center: {
        textAlign: 'center',
      },

      select: {
        border: 'none',
        borderRadius: '4px',
        backgroundColor: colors.whiteColor,
        fontSize: '0.8em',
        widht: '100%',
      },
    };

    return (
      <div style={newGameStyle}>
        <h1 style={newGameStyle.title}>
          <FormattedMessage id="NewGame.title" />
        </h1>

        <table style={newGameStyle.table}>
          <tbody>
            <tr>
              <td style={newGameStyle.cellule}>
                <FormattedMessage id="NewGame.player1" />
              </td>
              <td style={newGameStyle.cellule}>
                {localStorage.getItem('name')}
              </td>
            </tr>
            <tr>
              <td style={newGameStyle.cellule}>
                <FormattedMessage id="NewGame.player2" />
              </td>
              <td style={newGameStyle.cellule}>
                <form>
                  <select
                    style={newGameStyle.select}
                    data-slot="0"
                    value={this.state.slot2}
                    onChange={this.handleChange}
                  >
                    <option value="0">
                      {formatMessage({ id: 'NewGame.player' })}
                    </option>
                    <option value="1">
                      {formatMessage({ id: 'NewGame.IA_easy' })}
                    </option>
                    <option value="2">
                      {formatMessage({ id: 'NewGame.IA_normal' })}
                    </option>
                  </select>
                </form>
              </td>
            </tr>
            <tr>
              <td style={newGameStyle.cellule}>
                <FormattedMessage id="NewGame.player3" />
              </td>
              <td style={newGameStyle.cellule}>
                <form>
                  <select
                    style={newGameStyle.select}
                    data-slot="1"
                    value={this.state.slot3}
                    onChange={this.handleChange}
                  >
                    <option value="0">
                      {formatMessage({ id: 'NewGame.player' })}
                    </option>
                    <option value="1">
                      {formatMessage({ id: 'NewGame.IA_easy' })}
                    </option>
                    <option value="2">
                      {formatMessage({ id: 'NewGame.IA_normal' })}
                    </option>
                    <option value="-1">
                      {formatMessage({ id: 'NewGame.none' })}
                    </option>
                  </select>
                </form>
              </td>
            </tr>
            <tr>
              <td style={newGameStyle.cellule}>
                <FormattedMessage id="NewGame.player4" />
              </td>
              <td style={newGameStyle.cellule}>
                <form>
                  <select
                    style={newGameStyle.select}
                    data-slot="2"
                    value={this.state.slot4}
                    onChange={this.handleChange}
                  >
                    <option value="0">
                      {formatMessage({ id: 'NewGame.player' })}
                    </option>
                    <option value="1">
                      {formatMessage({ id: 'NewGame.IA_easy' })}
                    </option>
                    <option value="2">
                      {formatMessage({ id: 'NewGame.IA_normal' })}
                    </option>
                    <option value="-1">
                      {formatMessage({ id: 'NewGame.none' })}
                    </option>
                  </select>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
        <p style={newGameStyle.center}>
          <button onClick={this.createGame} style={newGameStyle.buttonStyle}>
            <FormattedMessage id="NewGame.startLink" />
          </button>
        </p>
      </div>
    );
  }
}

export default injectIntl(NewGame);
