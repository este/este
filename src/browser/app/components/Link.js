/* @flow */
import React from 'react';
import pseudo from './pseudo';
import { Base } from 'rebass';
import { Link as RouterLink } from 'react-router';

const Link = ({ bold, index, inverted, pseudo, to, ...props }, { rebass }) => {
  // React Router does not support absolute paths.
  const isExternalLink = to.includes('://');
  const isActive = false;
  // TODO: Jak na aktivni? A funguje to?
  // const isActive = !isExternalLink && router.isActive(to, index);

  const baseStyle = {
    color: inverted ? rebass.inverted : rebass.link.color,
    ...(bold && rebass.link.bold),
    // Lord Vader's Former Handle Anakin.
    ...(rebass.link.link),
    ...(pseudo.hover && rebass.link.hover),
    ...(isActive && rebass.link.active),
  };

  const linkProps = {
    ...props,
    baseStyle,
    className: 'Link',
  };

  return isExternalLink ? (
    <Base
      {...linkProps}
      href={to}
      is="a"
    />
  ) : (
    <Base
      {...linkProps}
      is={RouterLink}
      to={to}
    />
  );
};

Link.propTypes = {
  bold: React.PropTypes.bool,
  index: React.PropTypes.bool, // TODO: Rename to RR4 terminology.
  inverted: React.PropTypes.bool,
  pseudo: React.PropTypes.object.isRequired,
  to: React.PropTypes.string.isRequired,
};

Link.contextTypes = {
  rebass: React.PropTypes.object,
};

export default pseudo(Link);
