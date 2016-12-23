/* @flow */
import type { BoxProps } from './Box';
import type { Exact, Styled } from '../themes/types';
import Box from './Box';
import styled from './styled';
import React from 'react';

type FormProps = BoxProps & {
  onSubmit?: SyntheticEvent => void,
};

const onSubmitWithPreventDefault = onSubmit => event => {
  if (!onSubmit) return;
  event.preventDefault();
  onSubmit(event);
};

const StyledForm: Styled<FormProps> = styled(() => ({
  $extends: Box,
}), 'form', ['onSubmit']);

const Form = ({ onSubmit, ...props }: Exact<FormProps>) => (
  <StyledForm
    onSubmit={onSubmitWithPreventDefault(onSubmit)}
    {...props}
  />
);

export default Form;
