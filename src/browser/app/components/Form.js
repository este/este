/* @flow */
import type { BoxProps } from './Box';
import type { Styled } from '../themes/types';
import Box from './Box';
import styled from './styled';
import React from 'react';

type OnSubmit = SyntheticEvent => void;

type FormProps = BoxProps & {
  onSubmit?: OnSubmit,
};

const Form: Styled<FormProps> = styled(() => ({
  $extends: Box,
}), 'form', ['onSubmit']);

const onSubmitWithPreventDefault = (onSubmit: OnSubmit) => e => {
  if (!onSubmit) return;
  e.preventDefault();
  onSubmit(e);
};

const Wrapped: Styled<FormProps> = ({ onSubmit, ...props }) => (
  <Form
    onSubmit={onSubmitWithPreventDefault(onSubmit)}
    {...props}
  />
);

export default Wrapped;
