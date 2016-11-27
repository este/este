/* @flow */
import React from 'react';
import { Base } from 'rebass';

type Props = {
  onSubmit?: () => void,
  small?: boolean,
  style?: any,
};

const maxWidth = 42;
const maxWidthSmall = 30;

const Form = ({ small, ...props }: Props) => {
  const style = {
    maxWidth: `${small ? maxWidthSmall : maxWidth}em`,
    ...props.style,
  };
  const onBaseSubmit = (e) => {
    e.preventDefault();
    if (!props.onSubmit) return;
    props.onSubmit(e);
  };
  return (
    <Base
      {...props}
      onSubmit={onBaseSubmit}
      style={style}
      is="form"
    />
  );
};

export default Form;
