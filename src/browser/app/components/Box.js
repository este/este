/* @flow */
import type { Size } from '../themes/types';
import React from 'react';
import style from './style';

// co ma box umet?
// margin, padding, textAlign, co jeste?
// margin bere scale jako text, nebo number pro px, ok
//   fakt? px nesmim dovolit, protoze mensi displays, ok, fakt ne
// border
// width height, chci procenta pres 1/4? hmm
// flex
// bg color, co text color?
//   text color se nededi, prepisuje se, ok
//   patri do textu, ok
// display?

export type BoxProps = {
  margin?: Size,
};
// , props: BoxProps

const Box = style(() => ({
  // fontSize: theme.sizes.medium
}));

export default (props: BoxProps) => <Box {...props} />;

/* @flow */
// import type { Scale } from '../themes';
// import type { Theme } from '../themes';
// import React from 'react';
//
// type BoxProps = {
//   // margin: Scale,
// };
//
// const boxStyles = (props: TextProps & { theme: Theme }) => ({
//   color: props.inverted ? props.theme.colors.white : props.theme.colors.black,
//   fontFamily: props.theme.fontFamily,
//   fontSize: `${props.small ? props.theme.fontSizes.smallText : props.theme.fontSizes.text}px`,
//   fontWeight: props.bold ? props.theme.bold : 'normal',
//   lineHeight: props.theme.lineHeight,
// });
//
// const Box = (props: BoxProps) => (
//   <div {...props} />
// );
//
// const Text = createComponent(textStyles, 'span');
//
// <div><span>
// textAlign: props.align || 'left',
// export default Box;
// TODO: Align belongs to box.
// Jak na paragraphy? do boxu, ok
// Text vzdy P? pak kazdej odkaz? ne, hmm
// align?: 'left' | 'right' | 'center' | 'justify',
