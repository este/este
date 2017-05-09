// // @flow
// import Button, { type ButtonProps } from './button';
// import SvgIcon from './svg-icon';
// import Text from './text';
//
// export type RadioProps = ButtonProps & {
//   label: string,
//   labelOnLeft?: boolean,
//   onChange?: ({ value: string }) => mixed,
//   select: string,
//   value: string,
// };
//
// const Radio = ({
//   label,
//   labelOnLeft = false,
//   onChange,
//   select,
//   value,
//   color,
//   size,
//   ...props
// }: RadioProps) => (
//   <Button
//     aria-checked={value === select}
//     onPress={() => onChange && onChange({ value: select })}
//     role="radio"
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
//         svg: value === select
//           ? theme.radio.checkedIcon
//           : theme.radio.uncheckedIcon,
//         [labelOnLeft ? 'marginLeft' : 'marginRight']: 0.5,
//       })}
//     />
//     {!labelOnLeft && <Text color={color} size={size}>{label}</Text>}
//   </Button>
// );
//
// export default Radio;
