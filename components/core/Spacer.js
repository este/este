// @flow
import React, { type Node } from 'react';
import { View } from 'react-native';
import useTheme from './useTheme';

// Put some space between those components for God's sake!
// The most sane approach I guess. Can't believe CSS ignores this use case.

// https://reactjs.org/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored
const visible = value => !(value == null || typeof value === 'boolean');

export default function Spacer(props: {| children: Node, rhythm?: number |}) {
  const theme = useTheme();

  return React.Children.toArray(props.children)
    .filter(visible)
    .reduce((spaced, child, index, array) => {
      if (index === array.length - 1) return [...spaced, child];
      const spacer = (
        <View
          // eslint-disable-next-line react/no-array-index-key
          key={`spacer-${index}`}
          style={{ width: theme.typography.rhythm(props.rhythm ?? 1) }}
        />
      );
      return [...spaced, child, spacer];
    }, []);
}
