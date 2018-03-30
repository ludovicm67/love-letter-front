import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { colors } from '../../utils';

export default class StyledLink extends Component {
  render () {
    var linkStyle = {
        textDecoration: 'none',
        color: colors.whiteColor,
        display: 'block',
    };

    return (
        <Link to={this.props.to} style={linkStyle}>
          <FormattedMessage id={this.props.msgId} />
        </Link>
    )
  }
}

StyledLink.propTypes = {
  to: PropTypes.string.isRequired,
  msgId: PropTypes.string.isRequired
};
