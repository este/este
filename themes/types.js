// @flow

export type Bold =
  | 'normal'
  | 'bold'
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

type Colors = {
  primary: string,
  success: string,
  warning: string,
  danger: string,
  black: string,
  white: string,
  gray: string,
};

export type Color = $Keys<Colors>;

export type Theme = {|
  typography: {|
    fontSize: number => number,
    lineHeight: number,
    rhythm: number => number,
  |},
  colors: Colors,
  text: {|
    bold: Bold,
    color: Color,
    fontFamily: string,
    rawStyle: { fixFontSmoothing: boolean } | {}, // Browser | React Native
  |},
  heading: {|
    bold: Bold,
    fontFamily: string,
    marginBottom: number,
  |},
  p: {|
    marginBottom: number,
  |},
|};

// export type Color = $Keys<ColorProps>;
//
// export type Theme = {|
//   typography: {|
//     fontSize: (number) => number,
//     lineHeight: number,
//     rhythm: (number) => number,
//   |},
//   colors: {
//     [color: Color]: string,
//   },
//   states: {
//     active: {|
//       darken: number,
//       opacity: number,
//     |},
//     disabled: {|
//       opacity: number,
//     |},
//   },
//   container: {|
//     maxWidths: {|
//       small: number,
//       medium: number,
//       big: number,
//       bigger: number,
//     |},
//   |},
//   text: {|
//     bold:
//       | 'normal'
//       | 'bold'
//       | 100
//       | 200
//       | 300
//       | 400
//       | 500
//       | 600
//       | 700
//       | 800
//       | 900,
//     fontFamily: string,
//   |},
//   block: {|
//     marginBottom: number,
//     maxWidth: number,
//   |},
//   button: {|
//     borderRadius: number,
//   |},
//   heading: {|
//     fontFamily: string,
//     marginBottom: number,
//   |},
//   paragraph: {|
//     marginBottom: number,
//   |},
//   // input: {| In case someone needs that.
//   // |},
// |};
