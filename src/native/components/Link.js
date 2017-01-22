// @flow
import type { Theme } from '../../common/themes/types';
import type { ButtonProps } from '../../common/components/Button';
import React from 'react';
import { Button } from '../../common/components';
import { Match } from 'react-router';

type LinkProps = ButtonProps & {
  activeStyle?: (theme: Theme) => Object,
  exactly?: boolean,
  to: string | Object,
};

type LinkContext = {
  router: any,
};

const Link = ({
  activeStyle,
  boxStyle,
  exactly,
  onPress,
  to,
  ...props
}: LinkProps, {
  router,
}: LinkContext) => (
  <Match exactly={exactly} pattern={to}>
    {({ matched }) => (
      <Button
        onPress={() => {
          router.transitionTo(to);
          if (!onPress) return;
          onPress();
        }}
        boxStyle={theme => ({
          ...(boxStyle && boxStyle(theme)),
          ...(matched && activeStyle ? activeStyle(theme) : null),
        })}
        {...props}
      />
    )}
  </Match>
);

Link.contextTypes = {
  router: React.PropTypes.object,
};

export default Link;
