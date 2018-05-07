// @flow
import * as React from 'react';
import LocaleLink, { type LocaleLinkBaseProps } from './LocaleLink';
import Text, { type TextProps } from './Text';
import { withRouter } from 'next/router';

export type AProps = {|
  ...TextProps,
  ...LocaleLinkBaseProps,
|};

type AState = {|
  hover: boolean,
|};

class A extends React.PureComponent<AProps & { router: Object }, AState> {
  state = { hover: false };

  handleMouseEnter = () => {
    this.setState({ hover: true });
  };

  handleMouseLeave = () => {
    this.setState({ hover: false });
  };

  render() {
    const {
      color = 'primary',
      href,
      prefetch,
      replace,
      router,
      ...props
    } = this.props;
    const isActive =
      typeof href === 'object' && href.pathname === router.pathname;
    const decoration = this.state.hover || isActive ? 'underline' : 'none';

    return (
      <LocaleLink href={href} prefetch={prefetch} replace={replace}>
        <Text
          accessibilityRole="link"
          color={color}
          decoration={decoration}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          {...props}
        />
      </LocaleLink>
    );
  }
}

const AWithRouter: React.ComponentType<AProps> = withRouter(A);

export default AWithRouter;
