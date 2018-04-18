import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { colors } from '../../../../utils';
import Radium from 'radium';

export class Histori extends Component {
  render() {
    var historyStyle = {
      fontSize: '1em',
      lineHeight: '1.5',
      textColor: colors.blackColor,
      height: '100vh',

      title: {
        fontSize: '1.5em',
        textAlign: 'center',
      },
      p_style: {
        height: '65vh',
        textAlign: 'center',
        '@media (max-width: 1200px)': {
          width: '90vw',
          margin: 'auto',
        },
      },
      image: {
        height: '60vh',
        marginRight: '5vw',
        marginLeft: '5vw',
        '@media (max-width: 1200px)': {
          width: '90vw',
        },
      },
      div_style: {
        height: '65vh',
        '@media (min-width: 1201px)': {
          columnCount: '3',
        },
        '@media (max-width: 1200px)': {
          overflowY: 'auto',
        },
      },
    };

    let cardsPathPrincesse = `images/Princesse.svg`;
    let cardsPathPrince = `images/Prince.svg`;
    return (
      <div style={historyStyle}>
        <h1 style={historyStyle.title}>
          <FormattedMessage id="Histori.title" />
        </h1>

        <div style={historyStyle.div_style}>
          <img
            src={cardsPathPrincesse}
            style={historyStyle.image}
            alt="Princesse"
          />
          <p style={historyStyle.p_style}>
            <FormattedMessage id="Histori.text.text1" /> <br />
            <FormattedMessage id="Histori.text.text2" /> <br />
            <br />
            <FormattedMessage id="Histori.text.text3" /> <br />
            <FormattedMessage id="Histori.text.text4" /> <br />
            <br />
            <FormattedMessage id="Histori.text.text5" /> <br />
            <FormattedMessage id="Histori.text.text6" /> <br />
          </p>
          <img src={cardsPathPrince} style={historyStyle.image} alt="Prince" />
        </div>
      </div>
    );
  }
}
export default Radium(Histori);
