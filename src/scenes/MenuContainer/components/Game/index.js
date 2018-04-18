import axios from 'axios';
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { API_URL, echo, getLanguage } from '../../../../utils';
import { gameStyle } from './style';

let cardsLocale = getLanguage();

let imgPath = `images`;
let cardsPath = `${imgPath}/cards/${cardsLocale}`;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        id: '',
        players: [],
      },
      choosePlayer: false,
      chooseCard: false,
      chosenCard: "knight",
      chosenPlayer: 0,
      card_played: 0,
      allChosen: false,
    };

    // if got game props from other location
    if (this.props.location.state && this.props.location.state.game) {
      this.state.game = this.props.location.state.game;
    }

    // listen to game changes
    if (this.state.game.id !== '') {
      echo
        .channel(`channel-game:${this.state.game.id}`)
        .listen('UpdateGameEvent', e => {
          console.log('got UpdateGameEvent', e);
          this.setState({
            game: e.content.game,
          });
        });
    }

    this.cardAction = this.cardAction.bind(this);
    this.playGame = this.playGame.bind(this);
    this.handleChooseCard = this.handleChooseCard.bind(this);
    this.handleChoosePlayer = this.handleChoosePlayer.bind(this);
    this.setAllChosen = this.setAllChosen.bind(this);
  }

  componentWillUnmount() {
    echo.leave(`channel-game:${this.state.game.id}`);
  }

  cardAction(card) {
    if(this.state.allChosen || (!card.choose_card_name && !card.choose_players)) {

      let chosen_player = null;
      let chosen_card = null;

      if (card.choose_card_name) {
        chosen_card = this.state.chosenCard;
      }

      if (card.choose_players) {
        chosen_player = this.state.chosenPlayer;
      }

      this.playGame('play_card', card.value, chosen_player, chosen_card);
      this.setState({allChosen: false});

    } else {
      if (card.choose_card_name) {
        this.setState({card_played: card});
        this.setState({chooseCard: true});
      }

      if (card.choose_players) {
        this.setState({card_played: card});
        this.setState({choosePlayer: true});
      }
    }
  }

  setAllChosen() {
    this.setState({allChosen: true});
    this.cardAction(this.state.card_played);
  }

  playGame(action, played_card_value, chosen_player, chosen_card) {
    const userToken = localStorage.getItem('token');
    const data = new FormData();

    console.log({
      action: action,
      played_card: played_card_value,
      choosen_player: chosen_player,
      choosen_card_name: chosen_card,
    });

    if (action !== 'pick_card' && action !== 'play_card') {
      console.error('action invalide : ' + action);
      return;
    }

    data.append('game_id', this.state.game.id);
    data.append('action', action);
    data.append('played_card', played_card_value);
    data.append('choosen_player', chosen_player);
    data.append('choosen_card_name', chosen_card);

    axios.post(`${API_URL}/game/play?token=${userToken}`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    this.setState({card_played: 0});
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

  handleChooseCard = (event) => {
    this.setState({chosenCard: event.target.value});
  }

  handleChoosePlayer = (event) => {
    this.setState({chosenPlayer: event.target.value});
  }

  render() {
    let game_infos = this.state.game;
    let players = game_infos.players;
    let pioche = [];
    let myCardsStyle;
    let myTurn;
    let {chooseCard, choosePlayer} = this.state;
    let {formatMessage} = this.props.intl;
    let playersSelect = [];

    // get an array with the current player as the first item
    const myIndexInArray = game_infos.players
      .map(p => p.name)
      .indexOf(localStorage.getItem('name'));

    let i = myIndexInArray;
    while (i-- > 0) players.push(players.shift());

    let nbPlayers = players.length;

    if (nbPlayers === 0) {
      console.error("Il n'y a plus aucun joueur ici");
      return <p>Houston, nous avons un problème. (Aucun joueur présent)</p>;
    }

    let current_player =
      (game_infos.current_player + (nbPlayers - myIndexInArray))%nbPlayers;
      // ((game_infos.current_player + myIndexInArray) % nbPlayers + nbPlayers) %
      // nbPlayers;

    myTurn = current_player === 0;

    if (players[0].hand.length === 2 && myTurn && !chooseCard && !choosePlayer) {
      myCardsStyle = { ...gameStyle.card.me, ...gameStyle.card.light };
    } else {
      myCardsStyle = gameStyle.card.me;
    }

    /************/
    /***PIOCHE***/
    /************/
    for (let i = 0; i < 5; i++) {
      let style = {
        ...gameStyle.card,
        ...gameStyle.card.pioche,
        left: `-${i * 2}px`,
        top: `-${i}px`,
      };

      //if time to use the pile/pioche, set a halo on the last card
      if (i === 4 && players[0].hand.length === 1 && myTurn) {
        style = { ...style, ...gameStyle.card.light };
      }

      pioche.push(
        <img
          key={`pioche${i}`}
          style={style}
          src={`${imgPath}/cards/back.svg`}
          alt="pioche"
          onClick={(e)=>{this.playGame.bind(this, 'pick_card', null, null, null)}}
        />
      );

      /********************/
      /***PLAYERS SELECT***/
      /********************/

      playersSelect.length = 0;
      if(choosePlayer) {
        for(let i=0; i<players.length; i++) {
          playersSelect.push(
            <option key={`playerSelect${i}${Math.random()}`} value={i}>{players[i].name}</option>
          );
        }
      }
    }

    return (
      <div style={gameStyle}>

        <div style={gameStyle.selection}>
          { chooseCard &&
            <div>
              <form>
                <FormattedMessage id="Game.chooseACard" />

                <select
                onChange={this.handleChooseCard}
                value={this.state.chosenCard}>

                  <option value="sorcerer">{formatMessage({ id: 'Game.sorcerer' })}</option>
                  <option value="minister">{formatMessage({ id: 'Game.minister' })}</option>
                  <option value="princess_prince">{formatMessage({ id: 'Game.princess_prince' })}</option>
                  <option value="priest">{formatMessage({ id: 'Game.priest' })}</option>
                  <option value="knight">{formatMessage({ id: 'Game.knight' })}</option>
                  <option value="general">{formatMessage({ id: 'Game.general' })}</option>
                  <option value="clown">{formatMessage({ id: 'Game.clown' })}</option>
                </select>
              </form>
            </div>
          }

          { choosePlayer &&
            <div>
            <form>
              <FormattedMessage id="Game.chooseAPlayer" />

              <select
              onChange={this.handleChoosePlayer}
              value={this.state.chosenPlayer}>
                {playersSelect}
              </select>
            </form>
            </div>
          }

          { (choosePlayer || chooseCard) &&
            <button onClick={this.setAllChosen}>
              <FormattedMessage id="Game.choosePlayerCard" />
            </button>
          }
        </div>

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
                {players[2].immunity && <FormattedMessage id="Game.immunity" />}
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
                {players[3].immunity && <FormattedMessage id="Game.immunity" />}
              </div>

              <div style={gameStyle.card.right}>
                {//@TODO FormattedMessage 'alt'
                players[3].hand.map(hand => (
                  <img
                    key={3 + Math.random()}
                    style={gameStyle.card}
                    src={`${imgPath}/cards/back.svg`}
                    alt="main joueur 3"
                  />
                ))}
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
                {players[1].immunity && <FormattedMessage id="Game.immunity" />}
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
          {players[0].immunity && <FormattedMessage id="Game.me_immunity" />}
        </div>
      </div>
    );
  }
}

export default injectIntl(Game);
