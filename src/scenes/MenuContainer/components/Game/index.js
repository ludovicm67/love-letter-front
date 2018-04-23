import axios from 'axios';
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { API_URL, echo, getLanguage } from '../../../../utils';
import { gameStyle } from './style';
import Radium from 'radium';

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
        card: '',
      },
      endRoundEvent: {
        state: false,
        reason: '',
        winner: '',
      },
      endGameEvent: {
        state: false,
        winner: '',
      },
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
          this.setState({
            eliminatedEvent: {
              state: true,
              player: e.content.game.eliminated_player,
              attackFrom: e.content.game.eliminator_player,
              card: e.content.game.card,
            },
          });

          let self = this;
          setTimeout(function() {
            self.setState({
              eliminatedEvent: {
                state: false,
                player: '',
                attackFrom: '',
                card: '',
              },
            });
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

          this.setState({
            endRoundEvent: {
              state: true,
              reason: reason,
              winner: e.content.game.winner_name,
            },
          });

          let self = this;
          setTimeout(function() {
            self.setState({
              endRoundEvent: {
                state: false,
                reason: null,
                winner: '',
              },
            });
          }, 5000);
        })
        .listen('EndGameEvent', e => {
          console.log('got endGame Event', e);

          this.setState({
            endGameEvent: {
              state: true,
              winner: e.content.game.winner_name,
            },
          });

          let self = this;
          setTimeout(function() {
            self.setState({
              endGameEvent: {
                state: false,
                winner: '',
              },
            });
          }, 5000);
        });
    }

    this.cardAction = this.cardAction.bind(this);
    this.playGame = this.playGame.bind(this);
    this.handleChooseCard = this.handleChooseCard.bind(this);
    this.handleChoosePlayer = this.handleChoosePlayer.bind(this);
    this.setAllChosen = this.setAllChosen.bind(this);
    this.showHand = this.showHand.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    require('./style.css');
  }

  componentWillUnmount() {
    echo.leave(`channel-game:${this.state.game.id}`);
  }

  showHand(player) {
    if (!this.state.game.players[player].immunity) {
      this.setState({ showHand: this.state.game.players[player].hand[0] });
    }

    let self = this;
    setTimeout(function() {
      self.setState({ showHand: null });
    }, 5000);
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
        if (chosen_player === '') return;
      }

      if (card.choose_players) {
        chosen_player = this.state.chosenPlayer;
        if (chosen_player === -1) return;
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
    let playersSelectList;
    let playersSelect = [];
    let { current_round, winning_rounds } = this.state.game;
    let players_cards = current_round.played_cards;
    let number_pile = this.state.game.current_round.pile.length;
    let styleMap = { top: -1, bottom: -1, left: -1, right: -1 , twoPlayers: -1};
    let nbPlayers = players.length;
    let card_played = [];
    let current_players = this.state.game.current_round.current_players;

    for (let i = 0; i < nbPlayers; i++) {
      if (players[i].name === localStorage.getItem('name')) {
        styleMap.bottom = i;
      } else {
        if (styleMap.top === -1) {
          styleMap.top = i;
        } else if (styleMap.left === -1) {
          styleMap.left = i;
        } else if (styleMap.right === -1) {
          styleMap.right = i;
        }
      }
    }
    if( nbPlayers === 2){
      styleMap.twoPlayers = 4;
    }

    card_played[0] = players_cards.filter(card => card[0] === 0);
    card_played[1] = players_cards.filter(card => card[0] === 1);
    card_played[2] = players_cards.filter(card => card[0] === 2);
    card_played[3] = players_cards.filter(card => card[0] === 3);
    card_played[4] = players_cards.filter(card => card[0] === -1);

    if (nbPlayers === 0) {
      return (
        <p>
          {' '}
          <FormattedMessage id="Game.noPlayer" />{' '}
        </p>
      );
    }

    let current_player = game_infos.current_player;
    myTurn = current_player === styleMap.bottom;

    if (
      players[styleMap.bottom].hand.length === 2 &&
      myTurn &&
      !chooseCard &&
      !choosePlayer
    ) {
      myCardsStyle = { ...gameStyle.card.me, ...gameStyle.card.light };
    } else {
      myCardsStyle = gameStyle.card.me;
    }

    /***************/
    /*CARTE RETIRES*/
    /**************/


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
      if (i === 4 && players[styleMap.bottom].hand.length === 1 && myTurn) {
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
    }

    pioche.push(
      <p key="number_pile" style={gameStyle.piocheContainer.text}>
        {number_pile}
      </p>
    );

    /********************/
    /***PLAYERS SELECT***/
    /********************/

    playersSelect.length = 0;

    if (choosePlayer) {
      playersSelectList = players.filter(function(p) {
        let index = players.indexOf(p)
        //check if player still in game
        return (current_players.indexOf(index) > -1);
      });

      for (let i = 0; i < playersSelectList.length; i++) {
        //my name appears only if it's the card sorcerer
        if (
          (i === styleMap.bottom && this.state.card_played.value === 5) ||
          //other names appears each time
          i !== styleMap.bottom
        ) {
          playersSelect.push(
            <option key={`playerSelect${i}${Math.random()}`} value={i}>
              {playersSelectList[i].name}
            </option>
          );
        }
      }
    }

    return (
      <div style={gameStyle}>
        {(choosePlayer || chooseCard) && (
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
                    >
                      {formatMessage({ id: 'Game.chooseACard' })}
                    </option>
                    <option value="sorcerer">
                      {formatMessage({ id: 'Game.sorcerer' })}
                    </option>
                    <option value="minister">
                      {formatMessage({ id: 'Game.minister' })}
                    </option>
                    <option value="princess_prince">
                      {formatMessage({ id: 'Game.princess_prince' })}
                    </option>
                    <option value="priestess">
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

            <button
              style={gameStyle.selection.button}
              onClick={this.setAllChosen}
            >
              <FormattedMessage id="Game.choosePlayerCard" />
            </button>
          </div>
        )}

        {/*Display an opponent's hand*/}
        <div>
          {this.state.showHand !== null && (
            <img
              style={gameStyle.card.showHand}
              src={`${cardsPath}/${this.handleCardName(
                this.state.showHand.card_name
              )}.svg`}
              alt={`${formatMessage({ id: 'Game.showHand' })} ${
                this.showHand.card_name
              }`}
            />
          )}
        </div>

        {/*EVENTS*/}
        {(this.state.eliminatedEvent.state ||
          this.state.endRoundEvent.state ||
          this.state.endGameEvent.state) && (
          <div style={gameStyle.event}>
            {/*player elimination event*/}
            {this.state.eliminatedEvent.state &&
              (this.state.eliminatedEvent.player ===
              this.state.eliminatedEvent.attackFrom ? (
                <p>
                  {this.state.eliminatedEvent.player}
                  <FormattedMessage id="Game.auto_eliminated" />
                  <FormattedMessage
                    id={`Game.${this.state.eliminatedEvent.card}`}
                  />
                </p>
              ) : (
                <p>
                  {this.state.eliminatedEvent.player}
                  <FormattedMessage id="Game.eliminated_by" />
                  {this.state.eliminatedEvent.attackFrom}
                  <FormattedMessage id="Game.eliminated_with" />
                  <FormattedMessage
                    id={`Game.${this.state.eliminatedEvent.card}`}
                  />
                </p>
              ))}

            {/*end round event*/}
            {this.state.endRoundEvent.state &&
              (this.state.endRoundEvent.reason === 'all_eliminated' ? (
                <p>
                  <FormattedMessage id="Game.winnerByElimination" />
                  {this.state.endRoundEvent.winner}
                </p>
              ) : (
                <p>
                  <FormattedMessage id="Game.winnerByEmptyPile" />
                  {this.state.endRoundEvent.winner}
                </p>
              ))}

            {this.state.endGameEvent.state && (
              <p>
                {this.state.endGameEvent.winner}
                <FormattedMessage id="Game.winnerOfGame" />
              </p>
            )}
          </div>
        )}

        {/*players' cards*/}

        <div style={gameStyle.player.row}>
          {/*joueur gauche*/ styleMap.left !== -1 && (
            <div style={gameStyle.player.row.left}>
              <div style={gameStyle.player.row.left.text}>
                <p style={gameStyle.player.name}>
                  {players[styleMap.left].name}
                </p>

                <p style={gameStyle.player.score}>
                  {players[styleMap.left].winning_rounds_count}
                  <span style={gameStyle.player.score.text}>
                    <FormattedMessage id="Game.wonGames" />
                  </span>
                </p>
                <p>
                  {current_player === styleMap.left && (
                    <FormattedMessage id="Game.playing" />
                  )}
                </p>
                <p>
                  {players[styleMap.left].immunity && (
                    <FormattedMessage id="Game.immunity" />
                  )}
                </p>
              </div>

              <div style={gameStyle.card.left}>
                {
                players[styleMap.left].hand.map(hand => (
                  <img
                    key={styleMap.left + Math.random()}
                    style={gameStyle.card}
                    src={`${imgPath}/cards/back.svg`}
                    alt={formatMessage({ id: `Game.alt.hand${styleMap.left}` })}
                  />
                ))}
              </div>

              {/*CARDS PLAYED*/}
              <div
                style={{
                  ...gameStyle.played_card,
                  ...gameStyle.played_card.left,
                }}
              >
                {card_played[styleMap.left].map(card => (
                  <img
                    key={styleMap.left + Math.random()}
                    style={gameStyle.played_card.cards}
                    src={`${cardsPath}/${this.handleCardName(
                      card[1].card_name
                    )}.svg`}
                    alt={formatMessage({ id: 'Game.alt.played_card2' })}
                  />
                ))}
              </div>
            </div>
          )}

          {/*joueur droite*/ styleMap.right !== -1 && (
            <div style={gameStyle.player.row.right}>
              <div style={gameStyle.player.row.right.text}>
                <p style={gameStyle.player.name}>
                  {players[styleMap.right].name}
                </p>
                <p style={gameStyle.player.score}>
                  {players[styleMap.right].winning_rounds_count}
                  <span style={gameStyle.player.score.text}>
                    <FormattedMessage id="Game.wonGames" />
                  </span>
                </p>

                <p>
                  {current_player === styleMap.right && (
                    <FormattedMessage id="Game.playing" />
                  )}
                </p>
                <p>
                  {players[styleMap.right].immunity && (
                    <FormattedMessage id="Game.immunity" />
                  )}
                </p>
              </div>

              <div style={gameStyle.card.right}>
                {
                players[styleMap.right].hand.map(hand => (
                  <img
                    key={styleMap.right + Math.random()}
                    style={gameStyle.card}
                    src={`${imgPath}/cards/back.svg`}
                    alt={formatMessage({ id: 'Game.alt.hand3' })}
                  />
                ))}
              </div>

              {/*CARDS PLAYED*/}
              <div
                style={{
                  ...gameStyle.played_card,
                  ...gameStyle.played_card.right,
                }}
              >
                {card_played[styleMap.right].map(card => (
                  <img
                    key={styleMap.right + Math.random()}
                    style={gameStyle.played_card.cards}
                    src={`${cardsPath}/${this.handleCardName(
                      card[1].card_name
                    )}.svg`}
                    alt={formatMessage({ id: 'Game.alt.played_card3' })}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={gameStyle.player.column}>
          {/*joueur haut*/ styleMap.top !== -1 && (
            <div style={gameStyle.player.column.top}>
              <div style={gameStyle.player.column.top.text}>
                <p style={gameStyle.player.name}>
                  {players[styleMap.top].name}
                </p>

                <p style={gameStyle.player.score}>
                  {players[styleMap.top].winning_rounds_count}
                  <span style={gameStyle.player.score.text}>
                    <FormattedMessage id="Game.wonGames" />
                  </span>
                </p>

                <p>
                  {current_player === styleMap.top && (
                    <FormattedMessage id="Game.playing" />
                  )}
                </p>
                <p>
                  {players[styleMap.top].immunity && (
                    <FormattedMessage id="Game.immunity" />
                  )}
                </p>
              </div>

              <div style={gameStyle.card.top}>
                {//@TODO FormattedMessage 'alt'
                players[styleMap.top].hand.map(hand => (
                  <img
                    key={styleMap.top + Math.random()}
                    style={gameStyle.card}
                    src={`${imgPath}/cards/back.svg`}
                    alt={formatMessage({ id: 'Game.alt.hand1' })}
                  />
                ))}
              </div>

              {/*CARDS PLAYED*/}
              <div
                style={{
                  ...gameStyle.played_card,
                  ...gameStyle.played_card.top,
                }}
              >
                {card_played[styleMap.top].map(card => (
                  <img
                    key={styleMap.top + Math.random()}
                    style={gameStyle.played_card.cards}
                    src={`${cardsPath}/${this.handleCardName(
                      card[1].card_name
                    )}.svg`}
                    alt={formatMessage({ id: 'Game.alt.played_card1' })}
                  />
                ))}
              </div>
            </div>
          )}

          {/*joueur bas*/ styleMap.bottom !== -1 && (
            <div style={gameStyle.player.column.me}>
              <div>
                {//@TODO FormattedMessage 'alt'
                players[styleMap.bottom].hand.map(card => (
                  <img
                    key={styleMap.bottom + Math.random()}
                    style={myCardsStyle}
                    src={`${cardsPath}/${this.handleCardName(
                      card.card_name
                    )}.svg`}
                    alt={formatMessage({ id: 'Game.alt.hand0' })}
                    onClick={this.cardAction.bind(this, card)}
                  />
                ))}
              </div>

              {/*CARDS PLAYED*/}
              <div
                style={{
                  ...gameStyle.played_card,
                  ...gameStyle.played_card.me,
                }}
              >
                {card_played[styleMap.bottom].map(card => (
                  <img
                    style={gameStyle.played_card.cards}
                    key={styleMap.bottom + Math.random()}
                    src={`${cardsPath}/${this.handleCardName(
                      card[1].card_name
                    )}.svg`}
                    alt={formatMessage({ id: 'Game.alt.played_card0' })}
                  />
                ))}
              </div>
            </div>
          )}
        </div>


        {styleMap.twoPlayers !== -1 && (
          <div style={{flexDirection: 'column', width: '12vw'}}>
          {card_played[styleMap.twoPlayers].map(card => (
            <img
                key={`secretCards`+ Math.random()}
                style={{  ...gameStyle.card,
                          width: '10vw',
                          marginBottom: '-18vh',
                        }}
                src={`${cardsPath}/${this.handleCardName(
                  card[1].card_name
                )}.svg`}
                alt={formatMessage({ id: 'Game.alt.pile' })}
              />
            ))
          }
          </div>
        )
      }

        <div
          style={gameStyle.piocheContainer}
          onClick={this.playGame.bind(this, 'pick_card', null, null, null)}
        >
          {pioche}
        </div>

        <div style={gameStyle.my_infos}>
          <p style={{ ...gameStyle.player.name, ...gameStyle.my_infos.name }}>
            {players[styleMap.bottom].name}
          </p>

          <p style={{ ...gameStyle.player.score, ...gameStyle.my_infos.score }}>
            {players[styleMap.bottom].winning_rounds_count}
            <span style={gameStyle.player.score.text}>
              <FormattedMessage id="Game.wonGames" />
              <FormattedMessage id="Game.rounds_2" />
              {winning_rounds}
            </span>
          </p>
          <p style={gameStyle.my_infos.me_playing}>
            {current_player === styleMap.bottom && (
              <FormattedMessage id="Game.me_playing" />
            )}
          </p>
          <p style={gameStyle.my_infos.immunity}>
            {players[styleMap.bottom].immunity && (
              <FormattedMessage id="Game.me_immunity" />
            )}
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

export default injectIntl(Radium(Game));
