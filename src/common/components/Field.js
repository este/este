// @flow
import type { TextInputProps } from './TextInput';
import Box from './Box';
import TextInput from './TextInput';
import React from 'react';
import Text from './Text';

// Custom TextInput with label and error.
type FieldProps = TextInputProps & { label?: string, error?: string };

const Field = ({ label, error, size = 0, ...props }: FieldProps) => (
  <Box>
    {label && <Text bold size={size - 1}>{label}</Text>}
    <TextInput size={size} {...props} />
    <Text bold color="danger" size={size - 1}>
      {error || '\u00A0'/* Because we need to reserve real fontSize height. */}
    </Text>
  </Box>
);

export default Field;
