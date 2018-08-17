// @flow
import * as React from 'react';
import gravatar from 'gravatar';
import { Image } from 'react-native';

type GravatarProps = {|
  email: string,
  size?: number,
  rounded?: boolean,
|};

class Gravatar extends React.PureComponent<GravatarProps> {
  static url(email: string, size: number) {
    return gravatar.url(email, {
      d: 'retro',
      protocol: 'https',
      r: 'x',
      s: size.toString(),
    });
  }

  render() {
    const { email, size = 100, rounded } = this.props;
    const roundedStyle = rounded === true ? { borderRadius: size / 2 } : null;
    return (
      <Image
        source={Gravatar.url(email, size)}
        style={{
          height: size,
          width: size,
          ...roundedStyle,
        }}
        title={email}
      />
    );
  }
}

export default Gravatar;
