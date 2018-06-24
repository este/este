// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from './withTheme';

// Put some space between those components for God's sake!
// The most sane approach I guess. Can't believe CSS ignores this use case.

// https://reactjs.org/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored
const visible = value => !(value == null || typeof value === 'boolean');

type Props = {|
  children: React.Node,
  theme: Theme,
  rhythm?: number,
|};

class Spacer extends React.PureComponent<Props> {
  render() {
    const { children, theme, rhythm = 1 } = this.props;
    return React.Children.toArray(children)
      .filter(visible)
      .reduce((spaced, child, index, array) => {
        if (index === array.length - 1) return [...spaced, child];
        const spacer = (
          <View
            // eslint-disable-next-line react/no-array-index-key
            key={`spacer-${index}`}
            style={{ width: theme.typography.rhythm(rhythm) }}
          />
        );
        return [...spaced, child, spacer];
      }, []);
  }
}

export default withTheme(Spacer);
