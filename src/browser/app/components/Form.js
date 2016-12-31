// @flow
import type { BoxProps } from './Box';
import type { Styled } from '../themes/types';
import Box from './Box';
import styled from './styled';
import React from 'react';

type FormProps = BoxProps & {
  children?: any,
  onSubmit?: SyntheticEvent => void,
};

const onSubmitWithPreventDefault = onSubmit => event => {
  if (!onSubmit) return;
  event.preventDefault();
  onSubmit(event);
};

// Look
const StyledForm: Styled<FormProps> = styled((theme, {
  marginBottom = theme.block.marginBottom,
  maxWidth = theme.block.maxWidth,
}) => ({
  $extends: [Box, {
    marginBottom,
    maxWidth,
  }],
}), 'form', ['onSubmit']);

const invisibleSubmitToAllowSubmitOnInputEnterStyle = { display: 'none' };

// Feel
const Form: Styled<FormProps> = ({ children, onSubmit, ...props }) => (
  <StyledForm
    onSubmit={onSubmitWithPreventDefault(onSubmit)}
    {...props}
  >
    {/* This is hack allowing to submit form on enter keypress in input. */}
    {/* We need that because button is rendered as div. */}
    {/* Button is rendered as div to simplify text-like look styling. */}
    <input
      style={invisibleSubmitToAllowSubmitOnInputEnterStyle}
      type="submit"
    />
    {children}
  </StyledForm>
);

export default Form;
