import axios from 'axios';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { API_URL, echo } from '../../../../utils';

// import { appLocale } from '../../../../';
// let cardsLocale;

// if(appLocale !== 'en' && appLocale !== 'fr') {
//     cardsLocale = 'fr';
// } else {
//     cardsLocale = appLocale;
// }

let imgPath = `./images`;
// let cardsPath = `/${imgPath}cards/${cardsLocale}`;

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
        // display: 'flexbox',
        // flexDirection: 'column',
        height: '100vh',

        card: {
            position: 'absolute',
            width: '200px'
        },
        player: {
            left: {
                // alignSelf: 'flex-end'
            },
            right: {

            },
            me: {

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
      console.log(players);
      console.log(players[0]);
      console.log(players.length);

    for (var i=0; i<5; i++) {
        pioche.push(<img key={`pioche${i}`} style={{...gameStyle.card, marginLeft: `-${i*2}px`, marginTop: `-${i}px`}} src={`${imgPath}/cards/back.svg`} alt='pioche' />);
    }

    return (
      <div style={gameStyle}>

        { /*joueur gauche*/ players.length >= 3 && (
            <div style={gameStyle.player.left}>
                <p style={gameStyle.player.name}>{players[2].name}</p>
                <p style={gameStyle.player.score}>
                    {players[2].winning_rounds_count}
                    <FormattedMessage id='Game.wonGames' />
                </p>
            </div>
        ) }

        { /*joueur haut*/ players.length >= 2 && (
            <div style={gameStyle.player.top}>
                <p style={gameStyle.player.name}>{players[1].name}</p>
                <p style={gameStyle.player.score}>
                    {players[1].winning_rounds_count}
                    <FormattedMessage id='Game.wonGames' />
                </p>
            </div>
        ) }

        { /*joueur droite*/ players.length === 4 && (
            <div style={gameStyle.player.right}>
                <p style={gameStyle.player.name}>{players[3].name}</p>
                <p style={gameStyle.player.score}>
                    {players[3].winning_rounds_count}
                    <FormattedMessage id='Game.wonGames' />
                </p>
            </div>
        ) }

        { /*joueur bas*/}
        <div style={gameStyle.player.me}>
            <p style={gameStyle.player.name}>{players[0].name}</p>
            <p style={gameStyle.player.score}>
                {players[0].winning_rounds_count}
                <FormattedMessage id='Game.wonGames' />
            </p>
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


        <div>{pioche}</div>
      </div>
    );
  }
}
