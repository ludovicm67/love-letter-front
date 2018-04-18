import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { getLanguage } from '../../../../utils';

let cardsLocale = getLanguage();

let imgPath = `images`;
let cardsPath = `${imgPath}/cards/${cardsLocale}`;

let cardsPathSoldier = `${cardsPath}/soldier.svg`;
let cardsPathClown = `${cardsPath}/clown.svg`;
let cardsPathGeneral = `${cardsPath}/general.svg`;
let cardsPathKnight = `${cardsPath}/knight.svg`;
let cardsPathMinister = `${cardsPath}/minister.svg`;
let cardsPathPriest = `${cardsPath}/priestess.svg`;
let cardsPathSorcerer = `${cardsPath}/sorcerer.svg`;
let cardsPathPrincesse = `${cardsPath}/princess.svg`;

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
    }
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
                <br></br>
                <FormattedMessage id="Help.gameRules.overviewGame.text.t2" />
                <br></br>
                <FormattedMessage id="Help.gameRules.overviewGame.text.t3" />
                <br></br>
                <br></br>
                <FormattedMessage id="Help.gameRules.overviewGame.text.t4" />
              </p>
              <img
                src={cardsPathSoldier}
                style={styleHelp.image}
                alt={formatMessage({ id: 'Help.gameRules.overviewGame.cards.alt.soldier'})}
              />
              <img
                src={cardsPathClown}
                style={styleHelp.image}
                alt={formatMessage({ id: 'Help.gameRules.overviewGame.cards.alt.clown'})}
              />
              <img
                src={cardsPathKnight}
                style={styleHelp.image}
                alt={formatMessage({ id: 'Help.gameRules.overviewGame.cards.alt.knight'})}
              />
              <img
                src={cardsPathPriest}
                style={styleHelp.image}
                alt={formatMessage({ id: 'Help.gameRules.overviewGame.cards.alt.priest'})}
              />
              <img
                src={cardsPathSorcerer}
                style={styleHelp.image}
                alt={formatMessage({ id: 'Help.gameRules.overviewGame.cards.alt.sorcerer'})}
              />
              <img
                src={cardsPathGeneral}
                style={styleHelp.image}
                alt={formatMessage({ id: 'Help.gameRules.overviewGame.cards.alt.general'})}
              />
              <img
                src={cardsPathMinister}
                style={styleHelp.image}
                alt={formatMessage({ id: 'Help.gameRules.overviewGame.cards.alt.minister'})}
              />
              <img
                src={cardsPathPrincesse}
                style={styleHelp.image}
                alt={formatMessage({ id: 'Help.gameRules.overviewGame.cards.alt.princess'})}
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
              <br></br>
              <FormattedMessage id="Help.gameRules.gameProgress.text.t2.t" />
            </p>
            <ul style={styleHelp.ul}>
              <li> <FormattedMessage id="Help.gameRules.gameProgress.text.t2.list1" /> </li>
              <li> <FormattedMessage id="Help.gameRules.gameProgress.text.t2.list2" /> </li>
            </ul>
            <p style={styleHelp.p_style}>
              <br></br>
              <FormattedMessage id="Help.gameRules.gameProgress.text.t3" />
              <br></br>
              <FormattedMessage id="Help.gameRules.gameProgress.text.t4" />
              <br></br>
              <FormattedMessage id="Help.gameRules.gameProgress.text.t5" />
              <br></br>
              <FormattedMessage id="Help.gameRules.gameProgress.text.t6" />
            </p>
        </div>
      </div>
    );
  }
}

export default injectIntl(Help);
