import axios from 'axios';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { API_URL, echo, colors } from '../../../../utils';

import { appLocale } from '../../../../';
let cardsLocale;

if (appLocale !== 'en' && appLocale !== 'fr') {
  cardsLocale = 'fr';
} else {
  cardsLocale = appLocale;
}

let imgPath = `images`;
let cardsPath = `${imgPath}/cards/${cardsLocale}`;

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        game_id: '',
        game_infos: { players: [] },
      },
    };

    this.cardAction = this.cardAction.bind(this);

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

  playGame(state, action, card_name, card_value, chosen_player, chosen_card) {
    const userToken = localStorage.getItem('token');
    const data = new FormData();

    if(action !== 'pick_card' && action !== 'play_card')
        console.error("action invalide : " + action);

    console.log({
      'game_id': state.game.game_id,
      'action': action,
      'played_card': card_value,
      'choosen_player': chosen_player,
      'choosen_card_name': chosen_card
    });

    data.append('game_id', state.game.game_id);
    data.append('action', action);
    data.append('played_card', card_value);
    data.append('choosen_player', chosen_player);
    data.append('choosen_card_name', chosen_card);

    axios.post(`${API_URL}/game/play?token=${userToken}`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  cardAction(card_name, card_value) {
      //demander le player
      let chosen_player = null; //indice
      let chosen_card = null; //nom

      //regarder ce que les cartes demandent dans :
      /***choose_players
      choose_players_or_me
      choose_card_name*/

      this.playGame(this.state, 'play_card', card_name, card_value, chosen_player, chosen_card);
  }

  handleCardName(cardName) {
    cardName = cardName.toLowerCase();
    if (cardName === 'princess_prince') {
      if (Math.random() > 0.5) {
        cardName = 'princess';
      } else {
        cardName = 'prince';
      }
    }

    return cardName;
  }

  render() {
    var gameStyle = {
      piocheContainer: {
        position: 'fixed',
        bottom: '240px', //space + cardHeight
        left: '20px',
      },

      my_infos: {
        backgroundColor: colors.darkMainColor,
        color: colors.whiteColor,
        position: 'fixed',
        bottom: 0,
        right: 0,
        padding: '40px',
        borderRadius: '10px 0 0 0',
      },

      card: {
        width: '140px',
        margin: '5px',

        left: {
          position: 'relative',
          left: '-70px',
          transform: 'rotate(90deg)',
        },
        me: {
          width: '160px',
          position: 'relative',
          bottom: '-15vh',
        },

        pioche: {
          position: 'absolute',
        },
      },
      player: {
        name: {
          padding: '10px',
          fontSize: '2em',
          fontWeight: 400,
        },
        score: {},

        row: {
          position: 'absolute',
          top: '20%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          left: {
            // alignSelf: 'flex-end'
            text: {},
          },
          right: {
            text: {},
          },
        },
        column: {
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '70vh',
          width: '100%',
          alignItems: 'center',

          me: {
            display: 'flex',
            flexDirection: 'row',
            text: {},
          },
          top: {
            display: 'flex',
            flexDirection: 'row',
            text: {
              position: 'absolute',
              left: '20vw',
            },
          },
        },
      },
    };

    let { game_infos } = this.state.game;
    let pioche = [];
    let players = game_infos.players;

    // get an array with the current player as the first item
    const myIndexInArray = game_infos.players.map(p => p.name).indexOf(localStorage.getItem('name'));

    let i = myIndexInArray;
    while (i-- > 0) players.push(players.shift());

    let nbPlayers = players.length;

    let current_player = (((game_infos.current_player + myIndexInArray) % nbPlayers) + nbPlayers) % nbPlayers;

    //render
    for (let i = 0; i < 5; i++) {
      pioche.push(
        <img
          key={`pioche${i}`}
          style={{
            ...gameStyle.card,
            ...gameStyle.card.pioche,
            marginLeft: `-${i * 2}px`,
            marginTop: `-${i}px`,
          }}
          src={`${imgPath}/cards/back.svg`}
          alt="pioche"
        />
      );
    }

    return (
      <div style={gameStyle}>
        <div style={gameStyle.player.row}>
          {/*joueur gauche*/ players.length >= 3 && (
            <div style={gameStyle.player.row.left}>
              <div style={gameStyle.player.row.left.text}>
                <p style={gameStyle.player.name}>{players[2].name}</p>
                <p style={gameStyle.player.score}>
                  {players[2].winning_rounds_count}
                  <FormattedMessage id="Game.wonGames" />
                </p>
                {current_player === 2 && (
                    <FormattedMessage id='Game.playing' />
                )}
              </div>

              <div style={gameStyle.card.left}>
                {//@TODO FormattedMessage 'alt'
                players[2].hand.map(hand => (
                  <img
                    key={2 + hand.id}
                    style={gameStyle.card}
                    src={`${imgPath}/cards/back.svg`}
                    alt="main joueur 2"
                  />
                ))}
              </div>
            </div>
          )}

          {/*joueur droite*/ players.length === 4 && (
            <div style={gameStyle.player.row.right}>
              <div style={gameStyle.player.row.right.text}>
                <p style={gameStyle.player.name}>{players[3].name}</p>
                <p style={gameStyle.player.score}>
                  {players[3].winning_rounds_count}
                  <FormattedMessage id="Game.wonGames" />
                </p>

                {current_player === 3 && (
                    <FormattedMessage id='Game.playing' />
                )}

              </div>
            </div>
          )}
        </div>

        <div style={gameStyle.player.column}>
          {/*joueur haut*/ players.length >= 2 && (
            <div style={gameStyle.player.column.top}>
              <div style={gameStyle.player.column.top.text}>
                <p style={gameStyle.player.name}>{players[1].name}</p>
                <p style={gameStyle.player.score}>
                  {players[1].winning_rounds_count}
                  <FormattedMessage id="Game.wonGames" />
                </p>

                {current_player === 1 && (
                    <FormattedMessage id='Game.playing' />
                )}

              </div>

              <div style={gameStyle.card.top}>
                {//@TODO FormattedMessage 'alt'
                players[1].hand.map(hand => (
                  <img
                    key={1 + hand.id}
                    style={gameStyle.card}
                    src={`${imgPath}/cards/back.svg`}
                    alt="main joueur 1"
                  />
                ))}
              </div>
            </div>
          )}

          {/*joueur bas*/ players.length >= 1 && (
            <div style={gameStyle.player.column.me}>
              <div>
                {//@TODO FormattedMessage 'alt'
                players[0].hand.map(card => (
                  <img
                    key={0 + card.id}
                    style={gameStyle.card.me}
                    src={`${cardsPath}/${this.handleCardName(
                      card.card_name
                    )}.svg`}
                    alt="main joueur 0"
                    onClick={this.cardAction(card.card_name, card.value)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div
        style={gameStyle.piocheContainer}
        onClick={this.playGame.bind(this, this.state, 'pick_card', null, null, null)}>
            {pioche}
        </div>

        <div style={gameStyle.my_infos}>
          <p style={gameStyle.player.name}>{players[0].name}</p>
          <p style={gameStyle.player.score}>
            {players[0].winning_rounds_count}
            <FormattedMessage id="Game.wonGames" />
          </p>
          {current_player === 0 && (
              <FormattedMessage id='Game.me_playing' />
          )}
        </div>
      </div>
    );
  }
}
