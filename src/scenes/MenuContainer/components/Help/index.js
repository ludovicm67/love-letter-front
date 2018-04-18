import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { appLocale } from '../../../../';
let cardsLocale;

if (appLocale !== 'en' && appLocale !== 'fr') {
  cardsLocale = 'fr';
} else {
  cardsLocale = appLocale;
}

// console.log(appLocale);

let imgPath = `images`;
let cardsPath = `${imgPath}/cards/${cardsLocale}`;
let cardsPathSoldier = `${cardsPath}/soldier.svg`;
let cardsPathClown = `${cardsPath}/clown.svg`;
let cardsPathGeneral = `${cardsPath}/general.svg`;
let cardsPathKnight = `${cardsPath}/knight.svg`;
let cardsPathMinister = `${cardsPath}/minister.svg`;
let cardsPathPriest = `${cardsPath}/priest.svg`;
let cardsPathSorcerer = `${cardsPath}/sorcerer.svg`;
let cardsPathPrincesse = `${cardsPath}/princess.svg`;

export default class Help extends Component {
  render() {
    var styleHelp = {
      image: {
        height: '25vh',
      },
    }
    return (
      <div>
        <h1>
          <FormattedMessage id="Help.title" />
        </h1>
          <h2>
            <FormattedMessage id="Help.gameRules.title" />
          </h2>
            <h3>
              <FormattedMessage id="Help.gameRules.gameGoal.title" />
            </h3>
              <p>
                <FormattedMessage id="Help.gameRules.gameGoal.text" />
              </p>

            <h3>
              <FormattedMessage id="Help.gameRules.overviewGame.title" />
            </h3>
              <p>
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
                alt="Carte Princesse"
              />
              <img
                src={cardsPathClown}
                style={styleHelp.image}
                alt="Carte Princesse"
              />
              <img
                src={cardsPathKnight}
                style={styleHelp.image}
                alt="Carte Princesse"
              />
              <img
                src={cardsPathPriest}
                style={styleHelp.image}
                alt="Carte Princesse"
              />
              <img
                src={cardsPathSorcerer}
                style={styleHelp.image}
                alt="Carte Princesse"
              />
              <img
                src={cardsPathGeneral}
                style={styleHelp.image}
                alt="Carte Princesse"
              />
              <img
                src={cardsPathMinister}
                style={styleHelp.image}
                alt="Carte Princesse"
              />
              <img
                src={cardsPathPrincesse}
                style={styleHelp.image}
                alt="Carte Princesse"
              />

            <h3>
              <FormattedMessage id="Help.gameRules.gameProgress.title" />
            </h3>
            <p>
              <FormattedMessage id="Help.gameRules.gameProgress.text.t1" />
              <br></br>
              <FormattedMessage id="Help.gameRules.gameProgress.text.t2.t" />
            </p>
            <ul>
              <li> <FormattedMessage id="Help.gameRules.gameProgress.text.t2.list1" /> </li>
              <li> <FormattedMessage id="Help.gameRules.gameProgress.text.t2.list2" /> </li>
            </ul>
            <p>
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
    );
  }
}
