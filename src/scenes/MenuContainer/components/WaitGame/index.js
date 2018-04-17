import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { colors, echo } from '../../../../utils';

export class WaitGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        id: '',
        creator: {
          name: '',
        },
        players: [
          {
            name: '',
          },
        ],
        slots: [0, 0, 0],
        started: false,
      },
    };

    // if got game props from other location
    if (props.location.state && props.location.state.game) {
      this.state.game = props.location.state.game;
    }

    // if no game informations, the redirect to the homepage
    if (this.state.game.id === '') {
      this.props.history.push({
        pathname: '/',
      });
    }

    // if game was already started
    if (this.state.game.started) {
      this.props.history.push({
        pathname: '/jeu',
        state: this.state,
      });
    }

    echo
      .channel(`channel-game:${this.state.game.id}`)
      .listen('UpdateGameEvent', e => {
        this.setState({
          game: e.content.game,
        });
      })
      .listen('StartGameEvent', e => {
        this.props.history.push({
          pathname: '/jeu',
          state: e.content.game,
        });
      });
  }

  render() {
    let waitGameStyle = {
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

      icon: {
        color: colors.whiteColor,
        fontSize: '1.5em',
        margin: '1em',
        '@media (maxWidth: 768px)': {
          margin: '0.5em',
        },
      },
    };

    let player1 = this.state.game.players[0].name;
    let player2;
    let player3;
    let player4;

    // player2
    switch (this.state.game.slots[0]) {
      case -1:
        player2 = 'X';
        break;
      case -2:
      case 0:
        player2 =
          this.state.game.players.length > 1
            ? this.state.game.players[1].name
            : 'En attente...';
        break;
      case 1:
        player2 = 'IA';
        break;
      case 2:
        player2 = 'IA++';
        break;
      default:
        player2 = '';
    }

    // player3
    switch (this.state.game.slots[1]) {
      case -1:
        player3 = 'X';
        break;
      case -2:
      case 0:
        player3 =
          this.state.game.players.length > 2
            ? this.state.game.players[2].name
            : 'En attente...';
        break;
      case 1:
        player3 = 'IA';
        break;
      case 2:
        player3 = 'IA++';
        break;
      default:
        player3 = '';
    }

    // player4
    switch (this.state.game.slots[2]) {
      case -1:
        player4 = 'X';
        break;
      case -2:
      case 0:
        player4 =
          this.state.game.players.length > 3
            ? this.state.game.players[3].name
            : 'En attente...';
        break;
      case 1:
        player4 = 'IA';
        break;
      case 2:
        player4 = 'IA++';
        break;
      default:
        player4 = '';
    }

    return (
      <div style={waitGameStyle}>
        <h1 style={waitGameStyle.title}>
          <FormattedMessage id="NewGame.title" />
        </h1>

        <Link to="/">
          <FormattedMessage id="NewGame.backToMenu" />
        </Link>

        <table style={waitGameStyle.table}>
          <tbody>
            <tr>
              <td style={waitGameStyle.cellule}>
                <FormattedMessage id="NewGame.player1" />
              </td>
              <td style={waitGameStyle.cellule}>{player1}</td>
            </tr>
            <tr>
              <td style={waitGameStyle.cellule}>
                <FormattedMessage id="NewGame.player2" />
              </td>
              <td style={waitGameStyle.cellule}>{player2}</td>
            </tr>
            <tr>
              <td style={waitGameStyle.cellule}>
                <FormattedMessage id="NewGame.player3" />
              </td>
              <td style={waitGameStyle.cellule}>{player3}</td>
            </tr>
            <tr>
              <td style={waitGameStyle.cellule}>
                <FormattedMessage id="NewGame.player4" />
              </td>
              <td style={waitGameStyle.cellule}>{player4}</td>
            </tr>
          </tbody>
        </table>
        <p style={waitGameStyle.center}>
          <span style={waitGameStyle.icon} className="fa fa-spinner fa-spin" />
        </p>
      </div>
    );
  }
}

export default injectIntl(WaitGame);
