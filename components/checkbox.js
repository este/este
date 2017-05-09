// // @flow
// import Button, { type ButtonProps } from './button';
// import SvgIcon from './svg-icon';
// import Text from './text';
//
// export type CheckboxProps = ButtonProps & {
//   label: string,
//   labelOnLeft?: boolean,
//   onChange?: ({ value: boolean }) => mixed,
//   value: boolean,
// };
//
// const Checkbox = ({
//   label,
//   labelOnLeft = false,
//   onChange,
//   value,
//   color,
//   size,
//   ...props
// }: CheckboxProps) => (
//   <Button
//     aria-checked={value}
//     onPress={() => onChange && onChange({ value: !value })}
//     role="checkbox"
//     style={(theme, mixStyles) => {
//       const {
//         marginVertical = 0,
//         paddingHorizontal = 0,
//         paddingVertical = 0,
//         ...restProps
//       } = mixStyles(props);
//       return {
//         ...restProps,
//         marginVertical,
//         paddingHorizontal,
//         paddingVertical,
//       };
//     }}
//   >
//     {labelOnLeft && <Text color={color} size={size}>{label}</Text>}
//     <SvgIcon
//       style={theme => ({
//         color,
//         size,
//         svg: value ? theme.checkbox.checkedIcon : theme.checkbox.uncheckedIcon,
//         [labelOnLeft ? 'marginLeft' : 'marginRight']: 0.5,
//       })}
//     />
//     {!labelOnLeft && <Text color={color} size={size}>{label}</Text>}
//   </Button>
// );
//
// export default Checkbox;
