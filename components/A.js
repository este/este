// @flow
import React from 'react';
import LocaleLink from './LocaleLink';
import Text, { type TextProps } from './Text';

type Props = {
  href: string,
  isActive?: boolean,
  prefetch?: boolean,
} & TextProps;

type State = {
  hover: boolean,
};

class A extends React.Component<Props, State> {
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
      isActive,
      prefetch,
      ...props
    } = this.props;
    const decoration = this.state.hover || isActive ? 'underline' : 'none';

    return (
      <LocaleLink href={href} prefetch={prefetch}>
        <Text
          as="a"
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

export default A;
