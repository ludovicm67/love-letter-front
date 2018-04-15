import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { colors } from '../../../../utils';

export default class Histori extends Component {
  render() {
    var historyStyle = {
      fontSize: '1em',
      lineHeight: '1.5',
      textColor: colors.blackColor,
      height: '55vh',

      title: {
        fontSize: '1.5em',
        textAlign: 'center',
      },
      p_style: {
        textAlign: 'center',
      },
      image: {
        widht: '100%',
        height: '70vh',
        marginLeft: '10vh',
      },
      div_style: {
        columnCount: '3',
        columnWidht: '25vh',
        columnGap: '5vh'
      }
    };

    let cardsPathPrincesse = `images/Princesse.svg`;
    let cardsPathPrince = `images/Prince.svg`;
    return (
      <div style={historyStyle}>
        <h1 style={historyStyle.title}>
          <FormattedMessage id="Histori.title" />
        </h1>

        <Link to="/">
          <FormattedMessage id="Histori.backToMenu" />
        </Link>
        <div style={historyStyle.div_style}>
        <img src={cardsPathPrincesse} style={historyStyle.image} alt="Princesse"></img>
          <p style={historyStyle.p_style}>
            <FormattedMessage id="Histori.text.text1" /> <br></br>
            <FormattedMessage id="Histori.text.text2" /> <br></br>
            <br></br>
            <FormattedMessage id="Histori.text.text3" /> <br></br>
            <FormattedMessage id="Histori.text.text4" /> <br></br>
            <br></br>
            <FormattedMessage id="Histori.text.text5" /> <br></br>
            <FormattedMessage id="Histori.text.text6" /> <br></br>
          </p>
          <img src={cardsPathPrince} style={historyStyle.image} alt="Prince"></img>
        </div>
      </div>
    );
  }
}
