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
      chosenCard: '',
      chosenPlayer: -1,
      card_played: {},
      allChosen: false,
      showHand: null,
      eliminatedEvent: {
        state: false,
        player: '',
        attackFrom: '',
        card: ''
      },
      endRoundEvent: {
        state: false,
        reason: '',
        winner: ''
      },
      endGameEvent: {
        state: false,
        winner: ''
      }
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
        })
        .listen('EliminatedPlayerEvent', e => {
          console.log('got eliminatedPlayer Event', e);
          this.setState({eliminatedEvent: {
            state: true,
            player: e.content.game.eliminated_player,
            attackFrom: e.content.game.eliminator_player,
            card: e.content.game.card
          }});

          let self = this;
          setTimeout(function(){
            self.setState({eliminatedEvent: {
              state: false,
              player: '',
              attackFrom: '',
              card: ''
            }});
          }, 5000);

        })
        .listen('EndRoundEvent', e => {
          console.log('got endRound Event', e);

          let reason;

          switch (e.content.game.reason_end) {
            case 1:
            reason = 'empty_pile';
              break;
            case 2:
            default:
            reason = 'all_eliminated';
          }

          this.setState({endRoundEvent: {
            state: true,
            reason: reason,
            winner: e.content.game.winner_name
          }});

          let self = this;
          setTimeout(function(){
            self.setState({endRoundEvent: {
              state: false,
              reason: null,
              winner: ''
            }});
          }, 5000);

        })
        .listen('EndGameEvent', e => {
          console.log('got endGame Event', e);

          this.setState({endGameEvent: {
            state: true,
            winner: e.content.game.winner_name
          }});

          let self = this;
          setTimeout(function(){
            self.setState({endGameEvent: {
              state: false,
              winner: ''
            }});
          }, 5000);
        });
      }

    this.cardAction = this.cardAction.bind(this);
    this.playGame = this.playGame.bind(this);
    this.handleChooseCard = this.handleChooseCard.bind(this);
    this.handleChoosePlayer = this.handleChoosePlayer.bind(this);
    this.setAllChosen = this.setAllChosen.bind(this);
    this.showHand = this.showHand.bind(this);
    this.shiftPlayers = this.shiftPlayers.bind(this);
    this.getOriginalIndex = this.getOriginalIndex.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    require('./style.css');
  }

  componentWillUnmount() {
    echo.leave(`channel-game:${this.state.game.id}`);
  }

  showHand(player) {
    let originalPlayer = this.getOriginalIndex(player);

    if(!this.state.game.players[originalPlayer].immunity) {
      this.setState({showHand: this.state.game.players[originalPlayer].hand[0]});
    }

    let self = this;
    setTimeout(function(){
      self.setState({showHand: null});
    }, 5000);
  }

  // get an array with the current player as the first item
  shiftPlayers() {
    let game_infos = this.state.game;
    let players = game_infos.players;

    let myIndexInArray = game_infos.players
      .map(p => p.name)
      .indexOf(localStorage.getItem('name'));

    let i = myIndexInArray;
    while (i-- > 0) players.push(players.shift());

    return myIndexInArray;
  }

  getShiftPlayersIndexes(originalIndex, myIndexInArray) {
    let nbPlayers = this.state.game.players.length;

    let newIndex =
      ((originalIndex + myIndexInArray) % nbPlayers + nbPlayers) % nbPlayers;

    return newIndex;
  }

  getOriginalIndex(shiftedIndex) {
    let nbPlayers = this.state.game.players.length;
    let myIndexInArray = localStorage.getItem('myIndexInArray');
    return (
      ((shiftedIndex - myIndexInArray) % nbPlayers + nbPlayers) % nbPlayers
    );
  }

  cardAction(card) {
    //if we have all the informations we need to play
    if (
      this.state.allChosen ||
      (!card.choose_card_name && !card.choose_players)
    ) {
      let chosen_player = null;
      let chosen_card = null;

      if (card.choose_card_name) {
        chosen_card = this.state.chosenCard;
        if(chosen_player === '') return;
      }

      if (card.choose_players) {
        chosen_player = this.state.chosenPlayer;
        if(chosen_player === -1) return;
      }

      this.playGame('play_card', card.value, chosen_player, chosen_card);

      //if played_card === clown
      if (card.value === 2) this.showHand(chosen_player);

      this.setState({ allChosen: false });
      this.setState({ choosePlayer: false });
      this.setState({ chooseCard: false });
      this.setState({ chosenCard: '' });
      this.setState({ chosenPlayer: -1 });
    } else {
      if (card.choose_card_name) {
        this.setState({ card_played: card });
        this.setState({ chooseCard: true });
      }

      if (card.choose_players) {
        this.setState({ card_played: card });
        this.setState({ choosePlayer: true });
      }
    }
  }

  setAllChosen() {
    this.setState({ allChosen: true });
    this.cardAction(this.state.card_played);
  }

  playGame(action, played_card_value, chosen_player, chosen_card) {
    const userToken = localStorage.getItem('token');
    const data = new FormData();

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

    this.setState({ card_played: 0 });
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

  handleChooseCard = event => {
    this.setState({ chosenCard: event.target.value });
  };

  handleChoosePlayer = event => {
    this.setState({ chosenPlayer: event.target.value });
  };

  render() {
    let game_infos = this.state.game;
    let players = game_infos.players;
    let pioche = [];
    let myCardsStyle;
    let myTurn;
    let { chooseCard, choosePlayer } = this.state;
    let { formatMessage } = this.props.intl;
    let playersSelect = [];
    let {current_round, winning_rounds} = this.state.game;
    let card_played = current_round.played_cards;

    let card_played_0 = card_played.filter( card => card[0] === this.getOriginalIndex(0));
    let card_played_1 = card_played.filter( card => card[0] === this.getOriginalIndex(1));
    let card_played_2 = card_played.filter( card => card[0] === this.getOriginalIndex(2));
    let card_played_3 = card_played.filter( card => card[0] === this.getOriginalIndex(3));

    let nbPlayers = players.length;
    if (nbPlayers === 0) {
      console.error("Il n'y a plus aucun joueur ici");
      return <p> <FormattedMessage id="Game.houston" /> </p>;
    }

    const myIndexInArray = this.shiftPlayers();

    localStorage.setItem('myIndexInArray', myIndexInArray);

    let current_player = this.getShiftPlayersIndexes(
      game_infos.current_player,
      myIndexInArray
    );

    myTurn = current_player === 0;

    if (
      players[0].hand.length === 2 &&
      myTurn &&
      !chooseCard &&
      !choosePlayer
    ) {
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
          alt={formatMessage({ id: 'Game.alt.pile' })}
          onClick={e => {
            this.playGame.bind(this, 'pick_card', null, null, null);
          }}
        />
      );

      /********************/
      /***PLAYERS SELECT***/
      /********************/

      playersSelect.length = 0;
      if (choosePlayer) {
        for (let i = 0; i < players.length; i++) {
          //my name appears only if it's the card sorcerer
          if (
            (i === 0 && this.state.card_played.value === 5) ||
            //other names appears each time
            i !== 0
          ) {
            playersSelect.push(
              <option key={`playerSelect${i}${Math.random()}`} value={i}>
                {players[i].name}
              </option>
            );
          }
        }
      }
    }

    return (
      <div style={gameStyle}>
        <div style={gameStyle.selection}>

          {/*choose a card / choose a player*/}
          {chooseCard && (
            <div>
              <form>
                <select
                  style={gameStyle.selection.select}
                  onChange={this.handleChooseCard}
                  value={this.state.chosenCard}
                >
                  <option
                    key={`cardSelect-default-${Math.random()}`}
                    value=""
                  >{formatMessage({ id: 'Game.chooseACard' })}</option>
                  <option value="sorcerer">
                    {formatMessage({ id: 'Game.sorcerer' })}
                  </option>
                  <option value="minister">
                    {formatMessage({ id: 'Game.minister' })}
                  </option>
                  <option value="princess_prince">
                    {formatMessage({ id: 'Game.princess_prince' })}
                  </option>
                  <option value="priest">
                    {formatMessage({ id: 'Game.priest' })}
                  </option>
                  <option value="knight">
                    {formatMessage({ id: 'Game.knight' })}
                  </option>
                  <option value="general">
                    {formatMessage({ id: 'Game.general' })}
                  </option>
                  <option value="clown">
                    {formatMessage({ id: 'Game.clown' })}
                  </option>
                </select>
              </form>
            </div>
          )}

          {choosePlayer && (
            <div>
              <form>
                <select
                  style={gameStyle.selection.select}
                  onChange={this.handleChoosePlayer}
                  value={this.state.chosenPlayer}
                >
                  <option
                    key={`playerSelect-default-${Math.random()}`}
                    value="-1"
                  >
                    {formatMessage({ id: 'Game.chooseAPlayer' })}
                  </option>
                  {playersSelect}
                </select>
              </form>
            </div>
          )}

          {(choosePlayer || chooseCard) && (
            <button style={gameStyle.selection.button} onClick={this.setAllChosen}>
              <FormattedMessage id="Game.choosePlayerCard" />
            </button>
          )}
        </div>

        {/*Display an opponent's hand*/}
        <div>
          {this.state.showHand !== null &&
            <img
            style={gameStyle.card.showHand}
            src={`${cardsPath}/${this.handleCardName(
              'soldier'/*this.state.showHand.card_name*/
            )}.svg`}
            alt={`${formatMessage({ id: 'Game.showHand' })} ${this.showHand.card_name}`} />
          }
        </div>

        {/*EVENTS*/}
        <div style={gameStyle.event}>
          {/*player elimination event*/}
          {this.state.eliminatedEvent.state && (
            (this.state.eliminatedEvent.player === this.state.eliminatedEvent.attackFrom) ? (
              <p>
                {this.state.eliminatedEvent.player}
                <FormattedMessage id="Game.auto_eliminated" />
                <FormattedMessage id={`Game.${this.state.eliminatedEvent.card}`} />
              </p>
            ) : (
              <p>
                {this.state.eliminatedEvent.player}
                <FormattedMessage id="Game.eliminated_by" />
                {this.state.eliminatedEvent.attackFrom}
                <FormattedMessage id="Game.eliminated_with" />
                <FormattedMessage id={`Game.${this.state.eliminatedEvent.card}`} />
              </p>
            )
          )}

          {/*end round event*/}
          {this.state.endRoundEvent.state && (
            (this.state.endRoundEvent.reason === 'all_eliminated') ? (
              <p>
                <FormattedMessage id="Game.winnerByElimination" />
                {this.state.endRoundEvent.winner}
              </p>
              ) : (
              <p>
                <FormattedMessage id="Game.winnerByEmptyPile" />
                {this.state.endRoundEvent.winner}
              </p>
            )
          )}

          {this.state.endGameEvent.state && (
            <p>
              {this.state.endGameEvent.winner}
              <FormattedMessage id="Game.winnerOfGame"/>
            </p>
          )}
        </div>

        {/*players' cards*/}

        <div style={gameStyle.player.row}>
          {/*joueur gauche*/ players.length >= 3 && (
            <div style={gameStyle.player.row.left}>
              <div style={gameStyle.player.row.left.text}>
                <p style={gameStyle.player.name}>{players[2].name}</p>
                <p style={gameStyle.player.score}>
                  {players[2].winning_rounds_count}
                  <FormattedMessage id="Game.wonGames" />
                </p>
                <p>
                  {current_player === 2 && (
                    <FormattedMessage id="Game.playing" />
                  )}
                </p>
                <p>
                  {players[2].immunity && (
                    <FormattedMessage id="Game.immunity" />
                  )}
                </p>
              </div>

              <div style={gameStyle.card.left}>
                {//@TODO FormattedMessage 'alt'
                players[2].hand.map(hand => (
                  <img
                    key={2 + Math.random()}
                    style={gameStyle.card}
                    src={`${imgPath}/cards/back.svg`}
                    alt={formatMessage({id: 'Game.alt.hand2'})}
                  />
                ))}
              </div>

              {/*CARDS PLAYED*/}
              <div style={{...gameStyle.played_card, ...gameStyle.played_card.left}}>
                {
                  card_played_2.map(card => (
                      <img
                      key={ 2 + Math.random()}
                      style={gameStyle.played_card.cards}
                      src={`${cardsPath}/${this.handleCardName(
                        card[1].card_name
                      )}.svg`}
                      alt={formatMessage({id: 'Game.alt.played_card2'})}
                      />
                  ))
                }
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

                <p>
                  {current_player === 3 && (
                    <FormattedMessage id="Game.playing" />
                  )}
                </p>
                <p>
                  {players[3].immunity && (
                    <FormattedMessage id="Game.immunity" />
                  )}
                </p>
              </div>

              <div style={gameStyle.card.right}>
                {//@TODO FormattedMessage 'alt'
                players[3].hand.map(hand => (
                  <img
                    key={3 + Math.random()}
                    style={gameStyle.card}
                    src={`${imgPath}/cards/back.svg`}
                    alt={formatMessage({id: 'Game.alt.hand3'})}
                  />
                ))}
              </div>

              {/*CARDS PLAYED*/}
              <div style={{...gameStyle.played_card, ...gameStyle.played_card.right}}>
                {
                  card_played_3.map(card => (
                      <img
                      key={ 0 + Math.random()}
                      style={gameStyle.played_card.cards}
                      src={`${cardsPath}/${this.handleCardName(
                        card[1].card_name
                      )}.svg`}
                      alt={formatMessage({id: 'Game.alt.played_card3'})}
                      />
                  ))
                }
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

                <p>
                  {current_player === 1 && (
                    <FormattedMessage id="Game.playing" />
                  )}
                </p>
                <p>
                  {players[1].immunity && (
                    <FormattedMessage id="Game.immunity" />
                  )}
                </p>
              </div>

              <div style={gameStyle.card.top}>
                {//@TODO FormattedMessage 'alt'
                players[1].hand.map(hand => (
                  <img
                    key={1 + Math.random()}
                    style={gameStyle.card}
                    src={`${imgPath}/cards/back.svg`}
                    alt={formatMessage({id: 'Game.alt.hand1'})}
                  />
                ))}
              </div>

              {/*CARDS PLAYED*/}
              <div style={{...gameStyle.played_card, ...gameStyle.played_card.top}}>
                {
                  card_played_1.map(card => (
                      <img
                      key={ 0 + Math.random()}
                      style={gameStyle.played_card.cards}
                      src={`${cardsPath}/${this.handleCardName(
                        card[1].card_name
                      )}.svg`}
                      alt={formatMessage({id: 'Game.alt.played_card1'})}
                      />
                  ))
                }
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
                    alt={formatMessage({id: 'Game.alt.hand0'})}
                    onClick={this.cardAction.bind(this, card)}
                  />
                ))}
              </div>

              {/*CARDS PLAYED*/}
              <div style={{...gameStyle.played_card, ...gameStyle.played_card.me}}>
                {
                  card_played_0.map(card => (
                      <img
                      style={gameStyle.played_card.cards}
                      key={ 0 + Math.random()}
                      src={`${cardsPath}/${this.handleCardName(
                        card[1].card_name
                      )}.svg`}
                      alt={formatMessage({id: 'Game.alt.played_card0'})}
                      />
                  ))
                }
              </div>
            </div>
          )}
        </div>

        <div
          style={gameStyle.piocheContainer}
          onClick={this.playGame.bind(this, 'pick_card', null, null, null)}
        >
          {pioche}
        </div>

        <div style={gameStyle.my_infos}>
          <p style={gameStyle.player.name}>{players[0].name}</p>
          <p style={gameStyle.player.score}>
            {players[0].winning_rounds_count}
            <FormattedMessage id="Game.wonGames" />
            <FormattedMessage id="Game.rounds_2" />
            {winning_rounds}
          </p>
          <p>
            {current_player === 0 && <FormattedMessage id="Game.me_playing" />}
          </p>
          <p>
            {players[0].immunity && <FormattedMessage id="Game.me_immunity" />}
          </p>

          <span style={gameStyle.my_infos.round}>
            <FormattedMessage id="Game.rounds" />
            {current_round.number}
          </span>
        </div>
      </div>
    );
  }
}

export default injectIntl(Game);
