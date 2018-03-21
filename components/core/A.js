// @flow
import * as React from 'react';
import LocaleLink, { type LocaleLinkBaseProps } from './LocaleLink';
import Text, { type TextProps } from './Text';
import { withRouter } from 'next/router';

export type AProps = {
  ...TextProps,
  ...LocaleLinkBaseProps,
};

type AState = {|
  hover: boolean,
|};

// Not pure, because I am not sure how withRouter works.
class A extends React.Component<{ ...AProps, router: Object }, AState> {
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

    // jde to fixnout? imho ne, ok, tak explicit
    // ale, pak do textu neco pridam, a nebude fungovat
    // shit, ale to se tak casto nebude stavat
    // jinak explicit ale to by melo byt ok, imho
    // dale, co s custom props? je jich tuna...
    // predat dal?

    return null;
    // return (
    //   <LocaleLink href={href} prefetch={prefetch} replace={replace}>
    //     <Text
    //       // as="a"
    //       // render={}
    //       color={color}
    //       decoration={decoration}
    //       // onMouseEnter={this.handleMouseEnter}
    //       // onMouseLeave={this.handleMouseLeave}
    //       // {...foo}
    //     />
    //   </LocaleLink>
    // );
  }
}

const AWithRouter: React.ComponentType<AProps> = withRouter(A);

export default AWithRouter;
