// // @flow
// import Box from './box';
// import Text from './text';
// import TextInput, { type TextInputProps } from './text-input';
//
// // TextInput with label and error.
//
// type FieldProps = TextInputProps & {
//   error?: string,
//   label?: string,
// };
//
// const Field = ({
//   error = '\u00A0', // Preserve vertical space for an error.
//   label,
//   size = 0,
//   ...restProps
// }: FieldProps) => (
//   <Box>
//     {label && <Text bold size={size - 1}>{label}</Text>}
//     <TextInput size={size} {...restProps} />
//     <Text bold color="danger" size={size - 1}>{error}</Text>
//   </Box>
// );
//
// export default Field;
