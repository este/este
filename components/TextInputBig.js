// @flow
import Box from './Box';
import Text from './Text';
import TextInput, { type TextInputProps } from './TextInput';

const TextInputBig = (props: TextInputProps) => {
  // Note pattern for default dynamic typed props:
  // - we can't use defaultProps because often we need values from context theme
  // - props must be picked, Flow does not handle: height={1} {...props}
  // Therefore, this is the only correct way.
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
        {typeof error === 'string'
          ? <Text color="danger" size={size - 1}>
              {error}
            </Text>
          : error}
      </Box>
    </Box>
  );
};
export default TextInputBig;
