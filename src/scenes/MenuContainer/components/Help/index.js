import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { getLanguage } from '../../../../utils';

let cardsLocale = getLanguage();

let imgPath = `images`;
let cardsPath = `${imgPath}/cards/${cardsLocale}`;
let interfacePath = `${imgPath}/help/${cardsLocale}`;

let cardsPathSoldier = `${cardsPath}/soldier.svg`;
let cardsPathClown = `${cardsPath}/clown.svg`;
let cardsPathGeneral = `${cardsPath}/general.svg`;
let cardsPathKnight = `${cardsPath}/knight.svg`;
let cardsPathMinister = `${cardsPath}/minister.svg`;
let cardsPathPriest = `${cardsPath}/priestess.svg`;
let cardsPathSorcerer = `${cardsPath}/sorcerer.svg`;
let cardsPathPrincesse = `${cardsPath}/princess.svg`;

let interfacePathClown = `${interfacePath}/Clown.png`;
let interfacePathPerdu = `${interfacePath}/Perdu.png`;
let interfacePathSelect = `${interfacePath}/Select.png`;
let interfacePathCreation = `${interfacePath}/Creation.png`;
let interfacePathPlateauJeu = `${interfacePath}/Plateau_Jeu.png`;
let interfacePathRejoindre = `${interfacePath}/Rejoindre.png`;

export class Help extends Component {
  render() {
    let { formatMessage } = this.props.intl;
    var styleHelp = {
      height: '70vh',
      widht: '100vw',
      overflowY: 'auto',

      div_style: {
        marginLeft: '5vw',
        marginRight: '5vw',
      },

      image: {
        height: '45vh',
        marginTop: '3vh',
        marginBottom: '3vh',
        marginLeft: '1.5vw',
        marginRight: '1.5vw',
      },

      image_inter: {
        height: '45vh',
        marginTop: '3vh',
        marginBottom: '3vh',
        marginLeft: '1.5vw',
        marginRight: '1.5vw',
        borderCollapse: 'collapse',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: '1px',
      },

      title: {
        t1: {
          textAlign: 'center',
          fontSize: '1.8em',
        },
        t2: {
          fontSize: '1.5em',
          marginLeft: '1vw',
          marginTop: '3vh',
          marginBottom: '3vh',
        },
        t3: {
          fontSize: '1.2em',
          marginLeft: '4vw',
          marginTop: '2vh',
          marginBottom: '2vh',
        },
        t4: {
          fontSize: '1.1em',
          marginLeft: '6vw',
          marginTop: '1vh',
          marginBottom: '1vh',
        }
      },

      p_style: {
        textAlign: 'justify',
      },

      table: {
        margin: '1vh',
        borderCollapse: 'collapse',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: '1px',
      },

      cellule: {
        borderCollapse: 'collapse',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: '1px',
        padding: '2.5vh',
        textAlign: 'center',
      },

      ul: {
        listStyleType: 'circle',
        marginLeft: '2vw',
      },
    };
    return (
      <div style={styleHelp}>
        <h1 style={styleHelp.title.t1}>
          <FormattedMessage id="Help.title" />
        </h1>
        <div style={styleHelp.div_style}>
          <h2 style={styleHelp.title.t2}>
            <FormattedMessage id="Help.gameRules.title" />
          </h2>
          <h3 style={styleHelp.title.t3}>
            <FormattedMessage id="Help.gameRules.gameGoal.title" />
          </h3>
          <p style={styleHelp.p_style}>
            <FormattedMessage id="Help.gameRules.gameGoal.text" />
          </p>

          <h3 style={styleHelp.title.t3}>
            <FormattedMessage id="Help.gameRules.overviewGame.title" />
          </h3>
          <p style={styleHelp.p_style}>
            <FormattedMessage id="Help.gameRules.overviewGame.text.t1" />
            <br />
            <FormattedMessage id="Help.gameRules.overviewGame.text.t2" />
            <br />
            <FormattedMessage id="Help.gameRules.overviewGame.text.t3" />
            <br />
            <br />
            <FormattedMessage id="Help.gameRules.overviewGame.text.t4" />
          </p>
          <img
            src={cardsPathSoldier}
            style={styleHelp.image}
            alt={formatMessage({
              id: 'Help.gameRules.overviewGame.cards.alt.soldier',
            })}
          />
          <img
            src={cardsPathClown}
            style={styleHelp.image}
            alt={formatMessage({
              id: 'Help.gameRules.overviewGame.cards.alt.clown',
            })}
          />
          <img
            src={cardsPathKnight}
            style={styleHelp.image}
            alt={formatMessage({
              id: 'Help.gameRules.overviewGame.cards.alt.knight',
            })}
          />
          <img
            src={cardsPathPriest}
            style={styleHelp.image}
            alt={formatMessage({
              id: 'Help.gameRules.overviewGame.cards.alt.priest',
            })}
          />
          <img
            src={cardsPathSorcerer}
            style={styleHelp.image}
            alt={formatMessage({
              id: 'Help.gameRules.overviewGame.cards.alt.sorcerer',
            })}
          />
          <img
            src={cardsPathGeneral}
            style={styleHelp.image}
            alt={formatMessage({
              id: 'Help.gameRules.overviewGame.cards.alt.general',
            })}
          />
          <img
            src={cardsPathMinister}
            style={styleHelp.image}
            alt={formatMessage({
              id: 'Help.gameRules.overviewGame.cards.alt.minister',
            })}
          />
          <img
            src={cardsPathPrincesse}
            style={styleHelp.image}
            alt={formatMessage({
              id: 'Help.gameRules.overviewGame.cards.alt.princess',
            })}
          />

          <h3 style={styleHelp.title.t3}>
            <FormattedMessage id="Help.gameRules.gameProgress.title" />
          </h3>
          <p style={styleHelp.p_style}>
            <FormattedMessage id="Help.gameRules.gameProgress.text.t1" />
          </p>
          <table style={styleHelp.table}>
            <thead>
              <tr>
                <th style={styleHelp.cellule}>
                  <FormattedMessage id="Help.gameRules.gameProgress.table.nb_player" />
                </th>
                <th style={styleHelp.cellule}>
                  <FormattedMessage id="Help.gameRules.gameProgress.table.nb_points" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styleHelp.cellule}> 4 </td>
                <td style={styleHelp.cellule}> 4 </td>
              </tr>
              <tr>
                <td style={styleHelp.cellule}> 3 </td>
                <td style={styleHelp.cellule}> 5 </td>
              </tr>
              <tr>
                <td style={styleHelp.cellule}> 2 </td>
                <td style={styleHelp.cellule}> 7 </td>
              </tr>
            </tbody>
          </table>
          <p style={styleHelp.p_style}>
            <br />
            <FormattedMessage id="Help.gameRules.gameProgress.text.t2.t" />
          </p>
          <ul style={styleHelp.ul}>
            <li>
              {' '}
              <FormattedMessage id="Help.gameRules.gameProgress.text.t2.list1" />{' '}
            </li>
            <li>
              {' '}
              <FormattedMessage id="Help.gameRules.gameProgress.text.t2.list2" />{' '}
            </li>
          </ul>
          <p style={styleHelp.p_style}>
            <br />
            <FormattedMessage id="Help.gameRules.gameProgress.text.t3" />
            <br />
            <FormattedMessage id="Help.gameRules.gameProgress.text.t4" />
            <br />
            <FormattedMessage id="Help.gameRules.gameProgress.text.t5" />
            <br />
            <FormattedMessage id="Help.gameRules.gameProgress.text.t6" />
          </p>

          <h2 style={styleHelp.title.t2}>
            <FormattedMessage id="Help.interface.title" />
          </h2>
            <h3 style={styleHelp.title.t3}>
              <FormattedMessage id="Help.interface.create.title" />
            </h3>
            <p style={styleHelp.p_style}>
              <FormattedMessage id="Help.interface.create.text" />
            </p>
            <img
              src={interfacePathCreation}
              style={styleHelp.image_inter}
              alt={formatMessage({
                id: 'Help.interface.create.alt',
              })}
            />
            <h3 style={styleHelp.title.t3}>
              <FormattedMessage id="Help.interface.join.title" />
            </h3>
            <p style={styleHelp.p_style}>
              <FormattedMessage id="Help.interface.join.text" />
            </p>
            <img
              src={interfacePathRejoindre}
              style={styleHelp.image_inter}
              alt={formatMessage({
                id: 'Help.interface.join.alt',
              })}
            />
            <h3 style={styleHelp.title.t3}>
              <FormattedMessage id="Help.interface.game.title" />
            </h3>
            <p style={styleHelp.p_style}>
              <FormattedMessage id="Help.interface.game.text" />
            </p>
            <img
              src={interfacePathPlateauJeu}
              style={styleHelp.image_inter}
              alt={formatMessage({
                id: 'Help.interface.game.alt',
              })}
            />
              <h4 style={styleHelp.title.t4}>
                <FormattedMessage id="Help.interface.game.lost.title" />
              </h4>
              <p style={styleHelp.p_style}>
                <FormattedMessage id="Help.interface.game.lost.text" />
              </p>
              <img
                src={interfacePathPerdu}
                style={styleHelp.image_inter}
                alt={formatMessage({
                  id: 'Help.interface.game.lost.alt',
                })}
              />
              <h4 style={styleHelp.title.t4}>
                <FormattedMessage id="Help.interface.game.clown.title" />
              </h4>
              <p style={styleHelp.p_style}>
                <FormattedMessage id="Help.interface.game.clown.text" />
              </p>
              <img
                src={interfacePathClown}
                style={styleHelp.image_inter}
                alt={formatMessage({
                  id: 'Help.interface.game.clown.alt',
                })}
              />
              <h4 style={styleHelp.title.t4}>
                <FormattedMessage id="Help.interface.game.select.title" />
              </h4>
              <p style={styleHelp.p_style}>
                <FormattedMessage id="Help.interface.game.select.text" />
              </p>
              <img
                src={interfacePathSelect}
                style={styleHelp.image_inter}
                alt={formatMessage({
                  id: 'Help.interface.game.select.alt',
                })}
              />
        </div>
      </div>
    );
  }
}

export default injectIntl(Help);
