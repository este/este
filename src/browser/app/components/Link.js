/* @flow */
import React from 'react';
import pseudo from './pseudo';
import { Base } from 'rebass';
import { Link as RouterLink, withRouter } from 'react-router';
import { connect } from 'react-redux';

let Link = ({ bold, index, inverted, pseudo, router, to, ...props }, { rebass }) => {
  // TODO: Remove after RR4 release.
  delete props.dispatch;
  delete props.pathname;

  // React Router does not support absolute paths.
  const isExternalLink = to.includes('://');
  const isActive = !isExternalLink && router.isActive(to, index);

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
  dispatch: React.PropTypes.func.isRequired,
  index: React.PropTypes.bool,
  inverted: React.PropTypes.bool,
  pathname: React.PropTypes.string.isRequired,
  pseudo: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired,
  to: React.PropTypes.string.isRequired,
};

Link.contextTypes = {
  rebass: React.PropTypes.object,
};

Link = pseudo(Link);
Link = withRouter(Link);

export default connect(state => ({
  // Use state.routing.locationBeforeTransitions.pathname to enforce rerender.
  // TODO: Remove after update to RR4.
  // - github.com/reactjs/react-router/pull/3430
  // - github.com/taion/react-router-scroll/issues/28#issuecomment-244503918
  pathname: state.routing && state.routing.locationBeforeTransitions.pathname,
}))(Link);
