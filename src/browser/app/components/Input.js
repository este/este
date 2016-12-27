/* @flow */
import type { Styled, InputTypes } from '../themes/types';
import type { TextProps } from './Text';
import Box from './Box';
import React from 'react';
import Text from './Text';
import styled from './styled';

export type InputProps = TextProps & {
  inline?: boolean,
  invalid?: boolean,
  maxLength?: number,
  name?: string,
  onChange?: (SyntheticEvent) => void,
  placeholder?: string,
  type?: InputTypes,
  value?: string,
};

// This is gold. Input looks like exactly as Text in all modern browsers.
// That's great for in place editing UI with vertical rhythm everywhere.
const enforceTextLook = {
  map: style => ({
    ...style,
    // This fixes a lot of issues and it's ok. Input can't be multiline.
    height: style.lineHeight,
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

const StyledInput: Styled<InputProps> = styled(() => ({
  $extends: Text,
  $map: enforceTextLook.map,
  ...enforceTextLook.style,
}), 'input', [
  'name',
  'onChange',
  'placeholder',
  'type',
  'value',
  'maxLength',
]);

const Input: Styled<InputProps> = ({
  invalid,
  // inline rendered input looks exactly as Text, ftw
  inline,
  // display flex 1 is like width 100%, but more configurable
  display = 'flex',
  flex = 1,
  ...props
}) => (
  <Box
    display={display}
    flex={flex}
    {...props}
    {...(inline ? {} : {
      border: 'bottom',
      borderColor: invalid ? 'danger' : 'gray', // TODO: primary on focus
      borderWidth: 1,
      paddingTop: 0.5,
      paddingBottom: 0.25,
      marginBottom: 1.25,
    })}
  >
    <StyledInput {...props} />
  </Box>
);

export default Input;
