/* @flow */
import type { Styled, InputTypes } from '../themes/types';
import type { TextProps } from './Text';
import React from 'react';
import Text from './Text';
import styled from './styled';
// import Box from './Box';
// import React from 'react';

export type InputProps = TextProps & {
  name?: string,
  label?: string, // or message, imho
  // labelSize?: string,
  placeholder?: string, // or message, imho
  maxLength?: number,
  type?: InputTypes,
  invalid?: boolean,
  onChange?: (SyntheticEvent) => void,
};

const StyledInput: Styled<InputProps> = styled(() => ({
  $extends: Text,
  // lineHeight: '16px',
  // display: props.display || 'block',
  // width: '100%', ?? check bootstrap, ale imho asi jo, ne?
  // color: props.color ? theme.colors[props.color] : theme.colors.black,
  // border: props.invalid ? theme.input.borderError : theme.input.border,
}), 'input', ['name', 'placeholder', 'type', 'onKeyDown']);

const Input: Styled<InputProps> = (props) => (
  <StyledInput
    {...props}
  />
);

export default Input;

//   return (
//     <Box marginBottom={'0.5em'}>
//       {props.label ? <Text size={props.labelSize
// ? props.labelSize : 0}>{props.label}</Text> : null}
//       <CustomInput {...props}/>
//     </Box>
//   )
// };
//
// export default Input;
