/* @flow */
import type { Exact } from '../../../common/types';
import type { OpenColor } from './openColor';

type Colors = {
  primary: string,
  secondary: string,
  info: string,
  success: string,
  warning: string,
  error: string,
  black: string,
  white: string,
  gray: string,
};

type Sizes = {|
  extraSmall: number,
  small: number,
  medium: number,
  big: number,
  extraBig: number,
|};

export type Theme = {|
  fontFamily: string,
  fontSizes: Sizes,
  lineHeight: number,
  bold: number,
  sizes: Sizes,
  colors: Colors & { open: OpenColor },
  border: {|
    radius: number | string,
    width: number | string,
  |},
  states: {
    disabled: {|
      cursor: string,
      opacity: number,
    |},
  },
|};

export type Styled<Props> = (props: Exact<Props>) => React$Element<any>;
export type Color = $Keys<Colors>;
export type Size = $Keys<Sizes>;
export type TopBottomLeftRight = 'top' | 'bottom' | 'left' | 'right';

// Style types. Taken from cssreference.io.
// TODO: Improve it.

export type TextTransform =
    'none'
  | 'capitalize'
  | 'uppercase'
  | 'lowercase'
  ;

export type AlignContent =
    'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  ;

export type AlignItems =
    'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch'
  ;

export type AlignSelf =
    'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch'
  ;

export type Display =
    'none'
  | 'inline'
  | 'block'
  | 'inline-block'
  | 'list-item'
  | 'table'
  | 'table-cell'
  | 'table-row'
  | 'flex'
  | 'inline-flex'
  ;

export type FlexDirection =
    'row'
  | 'row-reverse'
  | 'column'
  | 'column-reverse'
  ;

export type FlexWrap =
    'nowrap'
  | 'wrap'
  | 'wrap-reverse'
  ;

export type Float =
    'none'
  | 'left'
  | 'right'
  ;

export type FontWeight =
    'normal'
  | 'bold'
  | 'lighter'
  | 'bolder'
  | number
  ;

export type TextAlign =
    'left'
  | 'right'
  | 'center'
  | 'justify'
  ;

export type TextDecoration =
    'none'
  | 'underline'
  | 'overline'
  | 'line-through'
  ;

export type BrowserStyle = {|
  // Custom API for Fela and Este.
  $spread?: Function, // TODO: Add more strict type.
  ':active'?: BrowserStyle,
  ':first-child'?: BrowserStyle,
  ':focus'?: BrowserStyle,
  ':hover'?: BrowserStyle,
  ':link'?: BrowserStyle,
  ':visited'?: BrowserStyle,

  /* DOM CSS Properties */

  alignContent?: AlignContent,
  alignItems?: AlignItems,
  alignSelf?: AlignSelf,
  // all?: string,
  // animation?: string,
  // animationDelay?: string,
  // animationDirection?: string,
  // animationDuration?: string,
  // animationFillMode?: string,
  // animationIterationCount?: string,
  // animationName?: string,
  // animationPlayState?: string,
  // animationTimingFunction?: string,
  backdropFilter?: string,
  webkitBackdropFilter?: string,
  backfaceVisibility?: string,
  background?: string,
  backgroundAttachment?: string,
  backgroundBlendMode?: string,
  backgroundClip?: string,
  backgroundColor?: string,
  backgroundImage?: string,
  backgroundOrigin?: string,
  backgroundPosition?: string,
  backgroundRepeat?: string,
  backgroundSize?: string,
  blockSize?: string,
  border?: string,
  borderBlockEnd?: string,
  borderBlockEndColor?: string,
  borderBlockEndStyle?: string,
  borderBlockEndWidth?: string,
  borderBlockStart?: string,
  borderBlockStartColor?: string,
  borderBlockStartStyle?: string,
  borderBlockStartWidth?: string,
  borderBottom?: string,
  borderBottomColor?: string,
  borderBottomLeftRadius?: string,
  borderBottomRightRadius?: string,
  borderBottomStyle?: string,
  borderBottomWidth?: string,
  borderCollapse?: string,
  borderColor?: string,
  borderImage?: string,
  borderImageOutset?: string,
  borderImageRepeat?: string,
  borderImageSlice?: string,
  borderImageSource?: string,
  borderImageWidth?: string,
  borderInlineEnd?: string,
  borderInlineEndColor?: string,
  borderInlineEndStyle?: string,
  borderInlineEndWidth?: string,
  borderInlineStart?: string,
  borderInlineStartColor?: string,
  borderInlineStartStyle?: string,
  borderInlineStartWidth?: string,
  borderLeft?: string,
  borderLeftColor?: string,
  borderLeftStyle?: string,
  borderLeftWidth?: string,
  borderRadius?: number | string,
  borderRight?: string,
  borderRightColor?: string,
  borderRightStyle?: string,
  borderRightWidth?: string,
  borderSpacing?: string,
  borderStyle?: string,
  borderTop?: string,
  borderTopColor?: string,
  borderTopLeftRadius?: string,
  borderTopRightRadius?: string,
  borderTopStyle?: string,
  borderTopWidth?: string,
  borderWidth?: string,
  bottom?: string,
  boxDecorationBreak?: string,
  boxShadow?: string,
  boxSizing?: string,
  breakAfter?: string,
  breakBefore?: string,
  breakInside?: string,
  captionSide?: string,
  clear?: string,
  clip?: string,
  clipPath?: string,
  color?: string,
  columns?: string,
  columnCount?: string,
  columnFill?: string,
  columnGap?: string,
  columnRule?: string,
  columnRuleColor?: string,
  columnRuleStyle?: string,
  columnRuleWidth?: string,
  columnSpan?: string,
  columnWidth?: string,
  contain?: string,
  content?: string,
  counterIncrement?: string,
  counterReset?: string,
  cursor?: string,
  direction?: string,
  display?: Display,
  emptyCells?: string,
  filter?: string,
  flex?: number | string,
  flexBasis?: string,
  flexDirection?: FlexDirection,
  flexFlow?: string,
  flexGrow?: number,
  flexShrink?: string,
  flexWrap?: FlexWrap,
  float?: Float,
  font?: string,
  fontFamily?: string,
  fontFeatureSettings?: string,
  fontKerning?: string,
  fontLanguageOverride?: string,
  fontSize?: number | string,
  fontSizeAdjust?: string,
  fontStretch?: string,
  fontStyle?: string,
  fontSynthesis?: string,
  fontVariant?: string,
  fontVariantAlternates?: string,
  fontVariantCaps?: string,
  fontVariantEastAsian?: string,
  fontVariantLigatures?: string,
  fontVariantNumeric?: string,
  fontVariantPosition?: string,
  fontWeight?: FontWeight,
  grad?: string,
  grid?: string,
  gridArea?: string,
  gridAutoColumns?: string,
  gridAutoFlow?: string,
  gridAutoPosition?: string,
  gridAutoRows?: string,
  gridColumn?: string,
  gridColumnStart?: string,
  gridColumnEnd?: string,
  gridRow?: string,
  gridRowStart?: string,
  gridRowEnd?: string,
  gridTemplate?: string,
  gridTemplateAreas?: string,
  gridTemplateRows?: string,
  gridTemplateColumns?: string,
  height?: string,
  hyphens?: string,
  imageRendering?: string,
  imageResolution?: string,
  imageOrientation?: string,
  imeMode?: string,
  inherit?: string,
  initial?: string,
  inlineSize?: string,
  isolation?: string,
  justifyContent?: string,
  left?: string,
  letterSpacing?: string,
  lineBreak?: string,
  lineHeight?: 'normal' | number | string,
  listStyle?: string,
  listStyleImage?: string,
  listStylePosition?: string,
  listStyleType?: string,
  margin?: number | string,
  marginBlockEnd?: string,
  marginBlockStart?: string,
  marginBottom?: number | string,
  marginInlineEnd?: string,
  marginInlineStart?: string,
  marginLeft?: number | string,
  marginRight?: number | string,
  marginTop?: number | string,
  marks?: string,
  mask?: string,
  maskType?: string,
  maxBlockSize?: string,
  maxHeight?: number | string,
  maxInlineSize?: string,
  maxWidth?: number | string,
  minBlockSize?: string,
  minHeight?: number | string,
  minInlineSize?: string,
  minWidth?: number | string,
  mixBlendMode?: string,
  mozTransform?: string,
  mozTransformOrigin?: string,
  mozTransitionDelay?: string,
  mozTransitionDuration?: string,
  mozTransitionProperty?: string,
  mozTransitionTimingFunction?: string,
  objectFit?: string,
  objectPosition?: string,
  offsetBlockEnd?: string,
  offsetBlockStart?: string,
  offsetInlineEnd?: string,
  offsetInlineStart?: string,
  opacity?: string,
  order?: string,
  orphans?: string,
  outline?: string,
  outlineColor?: string,
  outlineOffset?: string,
  outlineStyle?: string,
  outlineWidth?: string,
  overflow?: string,
  overflowWrap?: string,
  overflowX?: string,
  overflowY?: string,
  padding?: number | string,
  paddingBlockEnd?: string,
  paddingBlockStart?: string,
  paddingBottom?: number | string,
  paddingInlineEnd?: string,
  paddingInlineStart?: string,
  paddingLeft?: number | string,
  paddingRight?: number | string,
  paddingTop?: number | string,
  pageBreakAfter?: string,
  pageBreakBefore?: string,
  pageBreakInside?: string,
  perspective?: string,
  perspectiveOrigin?: string,
  pointerEvents?: string,
  position?: string,
  quotes?: string,
  rad?: string,
  resize?: string,
  right?: string,
  rubyAlign?: string,
  rubyMerge?: string,
  rubyPosition?: string,
  scrollBehavior?: string,
  scrollSnapCoordinate?: string,
  scrollSnapDestination?: string,
  scrollSnapPointsX?: string,
  scrollSnapPointsY?: string,
  scrollSnapType?: string,
  shapeImageThreshold?: string,
  shapeMargin?: string,
  shapeOutside?: string,
  tableLayout?: string,
  tabSize?: string,
  textAlign?: TextAlign,
  textAlignLast?: string,
  textCombineUpright?: string,
  textDecoration?: TextDecoration,
  textDecorationColor?: string,
  textDecorationLine?: string,
  textDecorationStyle?: string,
  textIndent?: string,
  textOrientation?: string,
  textOverflow?: string,
  textRendering?: string,
  textShadow?: string,
  textTransform?: TextTransform,
  textUnderlinePosition?: string,
  top?: string,
  touchAction?: string,
  transform?: string,
  transformOrigin?: string,
  transformStyle?: string,
  transition?: string,
  transitionDelay?: string,
  transitionDuration?: string,
  transitionProperty?: string,
  transitionTimingFunction?: string,
  turn?: string,
  unicodeBidi?: string,
  unicodeRange?: string,
  verticalAlign?: string,
  visibility?: string,
  webkitOverflowScrolling?: string,
  webkitTransform?: string,
  webkitTransformOrigin?: string,
  webkitTransitionDelay?: string,
  webkitTransitionDuration?: string,
  webkitTransitionProperty?: string,
  webkitTransitionTimingFunction?: string,
  whiteSpace?: string,
  widows?: string,
  width?: string,
  willChange?: string,
  wordBreak?: string,
  wordSpacing?: string,
  wordWrap?: string,
  writingMode?: string,
  zIndex?: number,
|};
