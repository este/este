/* @flow weak */
import React from 'react';
import { Match } from 'react-router';
import { Text } from './';

const Link = ({
  activeStyle,
  children,
  exactly,
  onPress,
  style,
  to,
}, { router }) => (
  <Match exactly={exactly} pattern={to}>
    {({ matched }) => (
      <Text
        onPress={() => {
          router.transitionTo(to);
          if (!onPress) return;
          onPress();
        }}
        style={[style, matched && activeStyle]}
      >
        {children}
      </Text>
    )}
  </Match>
);

Link.contextTypes = {
  router: React.PropTypes.object,
};

Link.propTypes = {
  activeStyle: React.PropTypes.any,
  children: React.PropTypes.node.isRequired,
  exactly: React.PropTypes.bool,
  onPress: React.PropTypes.func,
  style: React.PropTypes.any,
  to: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
};

export default Link;
