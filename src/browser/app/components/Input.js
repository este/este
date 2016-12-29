// @flow
import type { Styled, InputTypes } from '../themes/types';
import type { TextProps } from './Text';
import Box from './Box';
import React from 'react';
import Text from './Text';
import styled from './styled';

export type InputProps = TextProps & {
  error?: string,
  label?: string,
  maxLength?: number,
  name?: string,
  onChange?: (SyntheticEvent) => void,
  placeholder?: string,
  rows?: number,
  type: InputTypes,
  value?: string,
};

// This is gold. Input looks like exactly as Text in all modern browsers.
// That's great for in place editing UI with vertical rhythm everywhere.
const enforceTextLook = {
  map: rows => style => ({
    ...style,
    height: rows * Number(style.lineHeight),
  }),
  // All these values are required. Otherwise, Edge or Firefox would break.
  style: {
    borderWidth: 0,
    display: 'block',
    margin: 0,
    outline: 'none', // Input doesn't need the outline, focus state is obvious.
    padding: 0,
    width: '100%',
  },
};

const createField = (type, passProps = []) => styled((theme, {
  rows,
}) => ({
  $extends: Text,
  $map: enforceTextLook.map(rows),
  ...enforceTextLook.style,
}), type, [
  'name',
  'onChange',
  'placeholder',
  'type',
  'value',
  'maxLength',
  ...passProps,
]);

const StyledInput: Styled<InputProps> = createField('input');
const StyledTextarea: Styled<InputProps> = createField('textarea', ['rows']);

const Input: Styled<InputProps> = ({
  error,
  label,
  rows = 1,
  size = 0,
  type = 'text',
  ...props
}) => (
  <Box {...props}>
    {label &&
      <Text bold display="block" size={size - 1}>
        {label}
      </Text>
    }
    {rows === 1 ?
      <StyledInput
        {...props}
        size={size}
        type={type}
      />
    :
      <StyledTextarea
        {...props}
        rows={rows}
        size={size}
        type={type}
      />
    }
    <Text
      bold
      color="danger"
      display="block"
      marginBottom={0.25}
      marginTop={-0.25}
      size={size - 1}
    >
      {error || '\u00A0'}
    </Text>
  </Box>
);

export default Input;
