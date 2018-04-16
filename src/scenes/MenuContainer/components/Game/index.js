import axios from 'axios';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { API_URL, echo } from '../../../../utils';
import { gameStyle } from './style';

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

    // if got game props from other location
    if (props.location.state && props.location.state.game) {
      this.state.game = props.location.state.game;
    }

    // listen to game changes
    if (this.state.game.game_id !== '') {
      echo
        .channel(`channel-game:${this.state.game.game_id}`)
        .listen('UpdateGameEvent', e => {
          console.log('got UpdateGameEvent', e);
          this.setState({
            game: e.content.game,
          });
        });
    }
  }

  componentWillUnmount() {
    echo.leave(`channel-game:${this.state.game.game_id}`);
  }

  cardAction(card) {
    console.log(card);

    let chosen_player = null;
    let chosen_card = null;

    if(card.choose_card_name) {
      //donner une valeur à chosen_card
    }

    if(card.choose_players) {
      //donner une valeur à chosen_player
    }

    this.playGame(this.state, 'play_card', card.card_value, chosen_player, chosen_card);
  }


  playGame(state, action, played_card_value, chosen_player, chosen_card) {
    const userToken = localStorage.getItem('token');
    const data = new FormData();

    if (action !== 'pick_card' && action !== 'play_card')
      console.error('action invalide : ' + action);

    console.log({
      game_id: state.game.game_id,
      action: action,
      played_card: played_card_value,
      choosen_player: chosen_player,
      choosen_card_name: chosen_card,
    });

    data.append('game_id', state.game.game_id);
    data.append('action', action);
    data.append('played_card', played_card_value);
    data.append('choosen_player', chosen_player);
    data.append('choosen_card_name', chosen_card);

    axios.post(`${API_URL}/game/play?token=${userToken}`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
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
    let { game_infos } = this.state.game;
    let players = game_infos.players;
    let pioche = [];
    let myCardsStyle;
    let myTurn;

    console.log(this.state.game);

    // get an array with the current player as the first item
    const myIndexInArray = game_infos.players
      .map(p => p.name)
      .indexOf(localStorage.getItem('name'));

    let i = myIndexInArray;
    while (i-- > 0) players.push(players.shift());

    let nbPlayers = players.length;

    let current_player =
      ((game_infos.current_player + myIndexInArray) % nbPlayers + nbPlayers) %
      nbPlayers;

    myTurn = (game_infos.current_player === current_player);

    if(players[current_player].hand.length === 2
    && myTurn) {
      myCardsStyle = {...gameStyle.card.me, ...gameStyle.card.light};
    } else {
      myCardsStyle = gameStyle.card.me;
    }

    //render
    for (let i = 0; i < 5; i++) {
      let style = { ...gameStyle.card, ...gameStyle.card.pioche,
          left: `-${i * 2}px`, top: `-${i}px`};

      //if time to use the pile/pioche, set a halo on the last card
      if((i === 4)
        && (players[current_player].hand.length === 1)
        && myTurn) {
        style = {...style, ...gameStyle.card.light};
      }

      pioche.push(
        <img
          key={`pioche${i}`}
          style={style}
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
                {current_player === 2 && <FormattedMessage id="Game.playing" />}
              </div>

              <div style={gameStyle.card.left}>
                {//@TODO FormattedMessage 'alt'
                players[2].hand.map(hand => (
                  <img
                    key={2 + Math.random()}
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

                {current_player === 3 && <FormattedMessage id="Game.playing" />}
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

                {current_player === 1 && <FormattedMessage id="Game.playing" />}
              </div>

              <div style={gameStyle.card.top}>
                {//@TODO FormattedMessage 'alt'
                players[1].hand.map(hand => (
                  <img
                    key={1 + Math.random()}
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
                    key={0 + Math.random()}
                    style={myCardsStyle}
                    src={`${cardsPath}/${this.handleCardName(
                      card.card_name
                    )}.svg`}
                    alt="main joueur 0"
                    onClick={this.cardAction.bind(this, card)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          style={gameStyle.piocheContainer}
          onClick={this.playGame.bind(
            this,
            this.state,
            'pick_card',
            null,
            null,
            null
          )}
        >
          {pioche}
        </div>

        <div style={gameStyle.my_infos}>
          <p style={gameStyle.player.name}>{players[0].name}</p>
          <p style={gameStyle.player.score}>
            {players[0].winning_rounds_count}
            <FormattedMessage id="Game.wonGames" />
          </p>
          {current_player === 0 && <FormattedMessage id="Game.me_playing" />}
        </div>
      </div>
    );
  }
}
