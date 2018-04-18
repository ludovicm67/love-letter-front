import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Radium from 'radium';
import PropTypes from 'prop-types';


import '../../../../../node_modules/font-awesome/css/font-awesome.min.css';
import { StyledLink } from '../../../../components/';

import { colors } from '../../../../utils';

class MainMenu extends Component {

  componentWillMount() {
    this.props.setHomeButton(true);
  }

  componentWillUnmount() {
    this.props.setHomeButton(false);
  }

  render() {
    var menuStyle = {
      marginTop: '15vh',
      textAlign: 'center',
      fontSize: '2em',
      lineHeight: '1.5',

      '@media (max-width: 992px)': {
        marginTop: '1em',
      },
      //phone
      '@media (max-width: 768px)': {
        marginTop: '1em',
        fontSize: '1.5em',
      },

      icon: {
        color: colors.whiteColor,
        fontSize: '1.5em',
        margin: '1em',
        '@media (max-width: 768px)': {
          margin: '0.5em',
        },
      },
      text: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '6em auto 0 auto',

        //laptop
        '@media (max-width: 1200px)': {
          margin: '4em auto 0 auto',
        },

        '@media (max-width: 768px)': {
          flexDirection: 'column',
          margin: '1em auto 0 auto',
        },
      },
    };

    return (
      <div style={menuStyle}>
        <StyledLink to="/jouer" msgId="MainMenu.linkToJouer" />
        <StyledLink to="/rejoindre" msgId="MainMenu.linkToRejoindre" />

        <Link to="/credits">
          <span style={menuStyle.icon} className="fa fa-list-ul" />
        </Link>

        <Link to="/aide">
          <span style={menuStyle.icon} className="fa fa-question" />
        </Link>

        <Link to="/histoire">
          <span style={menuStyle.icon} className="fa fa-book" />
        </Link>

        <div style={menuStyle.text}>
          <span>{localStorage.getItem('name')}</span>
          <span>
            {localStorage.getItem('points')}{' '}
            <FormattedMessage id="MainMenu.points" />
          </span>
        </div>
      </div>
    );
  }
}

MainMenu.propTypes = {
  setHomeButton: PropTypes.func.isRequired
};

export default Radium(MainMenu);
