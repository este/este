// @flow
import type { Styled } from '../themes/types';
import type { TextProps } from './Text';
import Box from './Box';
import React from 'react';
import Text from './Text';
import styled from './styled';

// Only HTML5 text inputs. Checkbox and radio must be SVG to size scale.
type InputTypes =
    'color'
  | 'date'
  | 'datetime'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'month'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  ;

export type InputProps = TextProps & {
  disabled?: boolean,
  error?: string,
  field?: Object,
  label?: string,
  maxLength?: number,
  name?: string,
  onChange?: (SyntheticEvent) => void,
  placeholder: string,
  rows?: number,
  type?: InputTypes,
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

const create = (tag, passProps = []) => styled((theme, {
  disabled,
  rows,
}) => ({
  $extends: Text,
  $map: enforceTextLook.map(rows),
  ...enforceTextLook.style,
  ...(disabled ? theme.states.disabled : null),
}), tag, [
  'disabled',
  'name',
  'onChange',
  'placeholder',
  'type',
  'value',
  'maxLength',
  ...passProps,
]);

const StyledInput = create('input');
// TODO: Auto size by default and maxRows.
// github.com/callemall/material-ui/blob/master/src/TextField/EnhancedTextarea.js
const StyledTextarea = create('textarea', ['rows']);

const StyledInputOrTextArea: Styled<InputProps> = ({
  field,
  rows = 1,
  type = 'text',
  ...props
}) => {
  const InputOrTextArea = rows === 1 ? StyledInput : StyledTextarea;
  return (
    <InputOrTextArea
      {...props}
      {...field}
      rows={rows}
      type={type}
    />
  );
};

const Input: Styled<InputProps> = ({
  error,
  label,
  placeholder,
  size = 0,
  ...props
}) => (
  <Box {...props}>
    {label &&
      <Text bold display="block" size={size - 1}>
        {label}
      </Text>
    }
    <StyledInputOrTextArea
      placeholder={placeholder}
      size={size}
      {...props}
    />
    <Text
      bold
      color="danger"
      display="block"
      size={size - 1}
    >
      {error || '\u00A0'/* Because we need to reserve real fontSize height. */}
    </Text>
  </Box>
);

export default Input;
