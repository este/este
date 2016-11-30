/* @flow */
import React from 'react';
import pseudo from './pseudo';
import { Base } from 'rebass';
import { Link as RouterLink } from 'react-router';

const Link = ({ bold, exactly, inverted, pseudo, to, ...props }, { rebass }) => {
  const baseStyle = {
    color: inverted ? rebass.inverted : rebass.link.color,
    ...(bold && rebass.link.bold),
    ...(rebass.link.link),
    ...(pseudo.hover && rebass.link.hover),
  };
  const linkProps = {
    ...props,
    baseStyle,
    className: 'Link',
  };
  const isExternalLink = to.includes('://');
  return isExternalLink ? (
    <Base
      {...linkProps}
      href={to}
      is="a"
    />
  ) : (
    <Base
      {...linkProps}
      activeOnlyWhenExact={exactly}
      activeStyle={rebass.link.active}
      is={RouterLink}
      to={to}
    />
  );
};

Link.propTypes = {
  bold: React.PropTypes.bool,
  exactly: React.PropTypes.bool,
  inverted: React.PropTypes.bool,
  pseudo: React.PropTypes.object.isRequired,
  to: React.PropTypes.string.isRequired,
};

Link.contextTypes = {
  rebass: React.PropTypes.object,
};

export default pseudo(Link);
