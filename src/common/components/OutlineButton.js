// @flow
import type { ButtonProps } from './Button';
import React from 'react';
import Button from './Button';

const OutlineButton = (props: ButtonProps) => (
  <Button
    // TODO: Recheck after Flow 0.38
    {...{ gray: true, outline: true }}
    textStyle={theme => ({ color: theme.colors.black })}
    {...props}
  />
);

export default OutlineButton;
