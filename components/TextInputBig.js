// @flow
import React from 'react';
import Box from './Box';
import Text from './Text';
import TextInput, { type TextInputProps } from './TextInput';

const TextInputBig = (props: TextInputProps) => {
  const {
    borderBottomWidth = 1,
    borderColor = 'gray',
    borderStyle = 'solid',
    error,
    paddingVertical = 0.5,
    size = 1,
    ...restProps
  } = props;
  return (
    <Box>
      <TextInput
        borderBottomWidth={borderBottomWidth}
        borderColor={borderColor}
        borderStyle={borderStyle}
        paddingVertical={paddingVertical}
        size={size}
        {...restProps}
      />
      <Box minHeight={1}>
        {typeof error === 'string' ? (
          <Text color="danger" size={size - 1}>
            {error}
          </Text>
        ) : (
          error
        )}
      </Box>
    </Box>
  );
};

export default TextInputBig;
