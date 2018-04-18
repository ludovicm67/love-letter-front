import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

export default class Credits extends Component {
  render() {
    var CreditsStyle = {
      title: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: '1.8em',
        marginBottom: '10vh'
      },

      list: {
        textAlign: 'center',
        fontSize: '1.3em'
      },

      linkContainer: {
        display: 'block',
        margin: '10px 0 20px 0'
      },

      links: {
        display: 'inline-block',
        fontSize: '1.3em',
        color: '#fff',
        textDecoration: 'none',
        margin: '0 5px'
      }
    };

    return (
      <div>
        <h1 style={CreditsStyle.title}>
          <FormattedMessage id="Credits.title" />
        </h1>

        <ul style={CreditsStyle.list}>
          <li>Ludovic Muller
            {/*<span style={CreditsStyle.linkContainer}>
              <a style={CreditsStyle.links} className="fa fa-globe" href="https://www.ludovic-muller.fr/"></a>
              <a style={CreditsStyle.links} className="fa fa-github" href="https://github.com/ludovicm67"></a>
              <a style={CreditsStyle.links} className="fa fa-twitter" href="https://twitter.com/ludovicm67"></a>
              <a style={CreditsStyle.links} className="fa fa-linkedin" href="https://www.linkedin.com/in/ludovicm67/"></a>
            </span>*/}
          </li>
          <li>Martin Heitz</li>
          <li>Méline Bour-Lang</li>
          <li>Morgane Ritter</li>
          <li>Pauline Capésius</li>
        </ul>
      </div>
    );
  }
}
