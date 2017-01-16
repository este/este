// @flow
import type { ButtonProps } from '../../common/components/Button';
import React from 'react';
import { Button } from '../../common/components';
import { Match } from 'react-router';

type LinkProps = ButtonProps & {
  // TODO: activeStyle: React.PropTypes.any,
  exactly?: boolean,
  to: string | Object,
};

type LinkContext = {
  router: any,
};

const Link = ({
  // activeStyle,
  exactly,
  onPress,
  to,
  ...props
}: LinkProps, {
  router
}: LinkContext ) => (
  <Match exactly={exactly} pattern={to}>
    {({ matched }) => (
      <Button
        onPress={() => {
          console.warn(to);
          // router.transitionTo(to);
          // if (!onPress) return;
          // onPress();
        }}
        // TODO: Active on matched.
        {...props}
      />
    )}
  </Match>
);

Link.contextTypes = {
  router: React.PropTypes.object,
};

export default Link;
