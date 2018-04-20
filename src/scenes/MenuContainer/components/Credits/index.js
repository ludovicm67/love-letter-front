import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

export default class Credits extends Component {
  render() {
    var CreditsStyle = {
      title: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: '1.8em',
        marginBottom: '10vh',
      },

      list: {
        textAlign: 'center',
        fontSize: '1.3em',
      },

      linkContainer: {
        display: 'block',
        margin: '10px 0 20px 0',
      },

      links: {
        display: 'inline-block',
        fontSize: '1.3em',
        color: '#fff',
        textDecoration: 'none',
        margin: '0 5px',
      },
    };

    return (
      <div>
        <h1 style={CreditsStyle.title}>
          <FormattedMessage id="Credits.title" />
        </h1>

        <ul style={CreditsStyle.list}>
          <li>
            Ludovic Muller
            <span style={CreditsStyle.linkContainer}>
              <a
                style={CreditsStyle.links}
                aria-label="Site personnel"
                href="https://www.ludovic-muller.fr/"
              >
                <i className="fa fa-globe" aria-hidden="true" />
              </a>
              <a
                style={CreditsStyle.links}
                aria-label="Compte Github"
                href="https://github.com/ludovicm67"
              >
                <i className="fa fa-github" aria-hidden="true" />
              </a>
              <a
                style={CreditsStyle.links}
                aria-label="Compte twitter"
                href="https://twitter.com/ludovicm67"
              >
                <i className="fa fa-twitter" aria-hidden="true" />
              </a>
              <a
                style={CreditsStyle.links}
                aria-label="Compte Linkedin"
                href="https://www.linkedin.com/in/ludovicm67/"
              >
                <i className="fa fa-linkedin" aria-hidden="true" />
              </a>
            </span>
          </li>
          <li>
            Martin Heitz
            <span style={CreditsStyle.linkContainer}>
              <a
                style={CreditsStyle.links}
                aria-label="Compte Github"
                href="https://github.com/sylvestreee"
              >
                <i className="fa fa-github" aria-hidden="true" />
              </a>
              <a
                style={CreditsStyle.links}
                aria-label="Compte Linkedin"
                href="https://www.linkedin.com/in/martin-heitz-06978712b/"
              >
                <i className="fa fa-linkedin" aria-hidden="true" />
              </a>
            </span>
          </li>
          <li>
            Méline Bour-Lang
            <span style={CreditsStyle.linkContainer}>
              <a
                style={CreditsStyle.links}
                aria-label="Site personnel"
                href="http://meline-bourlang.fr/"
              >
                <i className="fa fa-globe" aria-hidden="true" />
              </a>
              <a
                style={CreditsStyle.links}
                aria-label="Compte Github"
                href="https://github.com/BourMel"
              >
                <i className="fa fa-github" aria-hidden="true" />
              </a>
              <a
                style={CreditsStyle.links}
                aria-label="Compte Linkedin"
                href="https://www.linkedin.com/in/m%C3%A9line-bour-lang/"
              >
                <i className="fa fa-linkedin" aria-hidden="true" />
              </a>
            </span>
          </li>
          <li>
            Morgane Ritter
            <span style={CreditsStyle.linkContainer}>
              <a
                style={CreditsStyle.links}
                aria-label="Compte Github"
                href="https://github.com/MorganeRitter"
              >
                <i className="fa fa-github" aria-hidden="true" />
              </a>
              <a
                style={CreditsStyle.links}
                aria-label="Compte Linkedin"
                href="https://www.linkedin.com/in/morgane-ritter/"
              >
                <i className="fa fa-linkedin" aria-hidden="true" />
              </a>
            </span>
          </li>
          <li>
            Pauline Capésius
            <span style={CreditsStyle.linkContainer}>
              <a
                style={CreditsStyle.links}
                aria-label="Compte Linkedin"
                href="https://www.linkedin.com/in/pauline-capésius-01a790161"
              >
                <i className="fa fa-linkedin" aria-hidden="true" />
              </a>
            </span>
          </li>
        </ul>
      </div>
    );
  }
}
