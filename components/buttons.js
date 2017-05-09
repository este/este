// // @flow
// import Box, { type BoxProps } from '../components/box';
//
// // Horizontal container for buttons.
//
// export type ButtonsProps = BoxProps & {
//   vertical?: boolean,
// };
//
// const Buttons = (props: ButtonsProps) => (
//   <Box
//     style={theme => {
//       const {
//         vertical,
//         flexDirection = vertical ? 'column' : 'row',
//         flexWrap = 'wrap',
//         marginBottom = 1,
//         marginHorizontal = -theme.button.marginHorizontal,
//         ...restProps
//       } = props;
//       return {
//         flexDirection,
//         flexWrap,
//         marginBottom,
//         marginHorizontal,
//         ...restProps,
//       };
//     }}
//   />
// );
//
// export default Buttons;
