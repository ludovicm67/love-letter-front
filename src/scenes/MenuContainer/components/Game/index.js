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

  handleCardName(cardName) {
      cardName = cardName.toLowerCase();
      if(cardName === 'princess_prince') {
          if(Math.random() > 0.5) {
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
            }
        },
        player: {
            name: {
                padding: '10px',
                fontSize: '2em',
                fontWeight: 400
            },
            score: {

            },

            row: {
                position: 'absolute',
                top: '20%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                left: {
                    // alignSelf: 'flex-end'
                    text: {

                    }
                },
                right: {
                    text: {

                    }
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
                    text: {

                    }
                },
                top: {
                    display: 'flex',
                    flexDirection: 'row',
                    text: {
                        position:'absolute',
                        left: '20vw',
                    }
                }
            }
        }
      };

    let { game_infos } = this.state.game;
    let pioche = [];
    let players = [];
    let my_id;

    //get id of the current player
    for(let i=0; i<game_infos.players.length; i++) {
        if(game_infos.players[i].name === localStorage.getItem('name')) {
            my_id = i;
        }
    }

    if(my_id === 'undefined') {
        console.error('the current player is missing in the game');

    } else {
        //get an array of players with the first one being the current player
        players = game_infos.players;

        while(my_id !== 0) {
            console.log(players);

            var tmp = players[my_id-1];
            players[my_id-1] = players[my_id];
            players[my_id] = tmp;

            my_id -= 1;
        }
    }

    console.log(this.state.game.game_infos);
    console.log(players[0].hand);
    console.log(game_infos.players);
    console.log(players);

    //render
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
                <div style={gameStyle.player.row.left}>
                    <div style={gameStyle.player.row.left.text}>
                        <p style={gameStyle.player.name}>{players[2].name}</p>
                        <p style={gameStyle.player.score}>
                            {players[2].winning_rounds_count}
                            <FormattedMessage id='Game.wonGames' />
                        </p>
                    </div>

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
                <div style={gameStyle.player.row.right}>
                    <div style={gameStyle.player.row.right.text}>
                        <p style={gameStyle.player.name}>{players[3].name}</p>
                        <p style={gameStyle.player.score}>
                            {players[3].winning_rounds_count}
                            <FormattedMessage id='Game.wonGames' />
                        </p>
                    </div>
                </div>
            )}
        </div>

        <div style={gameStyle.player.column}>
            { /*joueur haut*/ players.length >= 2 && (
                <div style={gameStyle.player.column.top}>
                    <div style={gameStyle.player.column.top.text}>
                        <p style={gameStyle.player.name}>{players[1].name}</p>
                        <p style={gameStyle.player.score}>
                            {players[1].winning_rounds_count}
                            <FormattedMessage id='Game.wonGames' />
                        </p>
                    </div>

                    <div style={gameStyle.card.top}>
                        { //@TODO FormattedMessage 'alt'
                        players[1].hand.map(hand => (
                            <img
                            key={1+hand.id}
                            style={gameStyle.card}
                            src={`${imgPath}/cards/back.svg`}
                            alt='main joueur 1' />
                        ))}
                    </div>
                </div>
            )}

            { /*joueur bas*/ players.length >= 1 && (
                <div style={gameStyle.player.column.me}>
                    <div>
                        { //@TODO FormattedMessage 'alt'
                        players[0].hand.map(hand => (
                            <img
                            key={0+hand.id}
                            style={gameStyle.card.me}
                            src={`${cardsPath}/${this.handleCardName(hand.card_name)}.svg`}
                            alt='main joueur 0' />
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
            <p style={gameStyle.player.name}>{players[0].name}</p>
            <p style={gameStyle.player.score}>
                {players[0].winning_rounds_count}
                <FormattedMessage id='Game.wonGames' />
            </p>
        </div>
      </div>
    );
  }
}
