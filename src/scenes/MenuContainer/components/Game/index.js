import axios from 'axios';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { API_URL, echo, colors } from '../../../../utils';

import { appLocale } from '../../../../';
let cardsLocale;

if(appLocale !== 'en' && appLocale !== 'fr') {
    cardsLocale = 'fr';
} else {
    cardsLocale = appLocale;
}

let imgPath = `images`;
let cardsPath = `${imgPath}/cards/${cardsLocale}`;

console.log(cardsPath);

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        game_id: '',
        game_infos: { players: [] }
      }
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
      var gameStyle = {

        piocheContainer: {
            position: 'fixed',
            bottom : '240px', //space + cardHeight
            left: '20px'
        },

        my_infos: {
            backgroundColor: colors.darkMainColor,
            color: colors.whiteColor,
            position: 'fixed',
            bottom: 0,
            right: 0,
            padding : '40px',
            borderRadius: '10px 0 0 0'
        },

        card: {
            width: '150px',
            margin: '5px',

            left: {
                position: 'relative',
                left: '-70px',
                transform: 'rotate(90deg)',
            },
            me: {
                position: 'relative',
                bottom: '-15vh',
            },

            pioche: {
                position: 'absolute',
            }
        },
        player: {
            row: {
                position: 'absolute',
                top: '20%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                left: {
                    // alignSelf: 'flex-end'
                },
                right: {

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
                    flexDirection: 'row'

                },
                top: {
                    width: '300px'

                }
            },

            name: {
                padding: '10px',
                fontSize: '2em',
                fontWeight: 400
            }
        }
      };

    let { players } = this.state.game.game_infos;
    let pioche = [];

    console.log(this.state.game.game_infos);
    console.log(players[0].hand);
    // console.log(players[0]);
    // console.log(players.length);

    for (var i=0; i<5; i++) {
        pioche.push(
            <img
            key={`pioche${i}`}
            style={{...gameStyle.card, ...gameStyle.card.pioche, marginLeft: `-${i*2}px`, marginTop: `-${i}px`}}
            src={`${imgPath}/cards/back.svg`}
            alt='pioche' />
        );
    }

    return (
      <div style={gameStyle}>

        <div style={gameStyle.player.row}>
            { /*joueur gauche*/ players.length >= 3 && (
                <div style={gameStyle.player.left}>
                    <p style={gameStyle.player.name}>debug:Joueur2{players[2].name}</p>
                    <p style={gameStyle.player.score}>
                        {players[2].winning_rounds_count}
                        <FormattedMessage id='Game.wonGames' />
                    </p>

                    <div style={gameStyle.card.left}>
                        { //@TODO FormattedMessage 'alt'
                        players[2].hand.map(hand => (
                            <img
                            key={2+hand.id}
                            style={gameStyle.card}
                            src={`${imgPath}/cards/back.svg`}
                            alt='main joueur 2' />
                        ))}
                    </div>
                </div>
            )}

            { /*joueur droite*/ players.length === 4 && (
                <div style={gameStyle.player.right}>
                    <p style={gameStyle.player.name}>debug:Joueur3{players[3].name}</p>
                    <p style={gameStyle.player.score}>
                        {players[3].winning_rounds_count}
                        <FormattedMessage id='Game.wonGames' />
                    </p>
                </div>
            )}
        </div>

        <div style={gameStyle.player.column}>
            { /*joueur haut*/ players.length >= 2 && (
                <div style={gameStyle.player.top}>
                    <p style={gameStyle.player.name}>debug:Joueur1{players[1].name}</p>
                    <p style={gameStyle.player.score}>
                        {players[1].winning_rounds_count}
                        <FormattedMessage id='Game.wonGames' />
                    </p>
                </div>
            )}

            { /*joueur bas*/ players.length >= 1 && (
                <div style={gameStyle.player.me}>
                    <div style={gameStyle.card.me}>
                        { //@TODO FormattedMessage 'alt'
                        players[0].hand.map(hand => (
                            <img
                            key={0+hand.id}
                            style={gameStyle.card}
                            src={`${cardsPath}/${hand.card_name.toLowerCase()}.svg`}
                            alt='main joueur 2' />
                        ))}
                    </div>
                </div>
            )}
        </div>



        {/*<button onClick={this.playGame.bind(this, this.state, 1)}>
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
        </button>*/}


        <div style={gameStyle.piocheContainer}>{pioche}</div>

        <div style={gameStyle.my_infos}>
            <p style={gameStyle.player.name}>debug:Joueur0{players[0].name}</p>
            <p style={gameStyle.player.score}>
                {players[0].winning_rounds_count}
                <FormattedMessage id='Game.wonGames' />
            </p>
        </div>
      </div>
    );
  }
}
