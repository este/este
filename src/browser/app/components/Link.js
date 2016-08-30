import React, { Component, PropTypes } from 'react';
import { LinkBlock } from 'rebass';
import { Link as ReactRouterLink } from 'react-router';

const css = `
  .LinkBlock:hover:not(.active) {
    text-decoration: underline !important;
  }
`;

const styles = {
  active: {
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  link: {
    color: '#346392',
    display: 'inline-block',
    textDecoration: 'none',
  },
};

export default class Link extends Component {

  static propTypes = {
    activeStyle: PropTypes.object,
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    to: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]).isRequired,
  };

  render() {
    const { activeStyle, children, style, to, ...otherProps } = this.props;
    const isExternal = typeof to === 'string' && to.charAt(0) !== '/';

    if (isExternal) {
      return (
        <LinkBlock
          href={to}
          style={{ ...styles.link, ...style }}
          {...otherProps}
        >
          {children}
        </LinkBlock>
      );
    }

    return (
      <LinkBlock
        activeClassName="active"
        activeStyle={{ ...styles.active, ...activeStyle }}
        is={ReactRouterLink}
        style={{ ...styles.link, ...style }}
        to={to}
        {...otherProps}
      >
        <style dangerouslySetInnerHTML={{ __html: css }} />
        {children}
      </LinkBlock>
    );
  }

}
