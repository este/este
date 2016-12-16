/* @flow */
import type { OpenColor } from './openColor';

// TODO: Import from /common/types
// Exact is temp workaround until native exact will fix spread and intersection.
// flowtype.org/docs/objects.html#exact-object-types
// github.com/facebook/flow/issues/2405#issuecomment-256339492
// github.com/facebook/flow/issues/2626
export type Exact<T> = T & $Shape<T>;

// Theme.

type Colors = {
  primary: string,
  info: string,
  success: string,
  warning: string,
  danger: string,
  black: string,
  white: string,
  gray: string,
};

export type Color = $Keys<Colors>;
export type Styled<Props> = (props: Exact<Props>) => React$Element<any>;
export type TopBottomLeftRight = 'top' | 'bottom' | 'left' | 'right';

export type Theme = {|
  typography: {|
    fontSize: (number) => number,
    lineHeight: number,
    rhythm: (number) => number,
  |},
  colors: Colors & { open: OpenColor },
  border: {|
    radius: number,
    width: number,
  |},
  states: {
    disabled: {|
      cursor: string,
      opacity: number,
    |},
  },
  container: {|
    maxWidths: {|
      small: number,
      medium: number,
      big: number,
      bigger: number,
    |},
  |},
  text: {|
    bold: number,
    fontFamily: string,
  |},
  heading: {|
    bold: number,
    fontFamily: string,
    marginBottom: number,
  |},
  paragraph: {|
    marginBottom: number,
    maxWidth: number | string,
  |},
|};

// Browser types. Taken from cssreference.io.

export type AlignContent =
    'center'
  | 'flex-end'
  | 'flex-start'
  | 'space-around'
  | 'space-between'
  | 'stretch'
  ;

export type AlignItems =
    'baseline'
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'stretch'
  ;

export type AlignSelf =
    'auto'
  | 'baseline'
  | 'center'
  | 'flex-end'
  | 'flex-start'
  | 'stretch'
  ;

export type Display =
    'block'
  | 'flex'
  | 'inline'
  | 'inline-block'
  | 'inline-flex'
  | 'list-item'
  | 'none'
  | 'table'
  | 'table-cell'
  | 'table-row'
  ;

export type FlexDirection =
    'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse'
  ;

export type FlexWrap =
    'nowrap'
  | 'wrap'
  | 'wrap-reverse'
  ;

export type FlexFlow =
    FlexDirection
  | FlexWrap
  ;

export type Float =
    'left'
  | 'none'
  | 'right'
  ;

export type FontWeight =
    'bold'
  | 'bolder'
  | 'lighter'
  | 'normal'
  | number
  ;

export type JustifyContent =
    'center'
  | 'flex-end'
  | 'flex-start'
  | 'space-around'
  | 'space-between'
  ;

export type TextAlign =
    'center'
  | 'justify'
  | 'left'
  | 'right'
  ;

export type TextDecoration =
    'line-through'
  | 'none'
  | 'overline'
  | 'underline'
  ;

export type TextTransform =
    'capitalize'
  | 'lowercase'
  | 'none'
  | 'uppercase'
  ;

export type BrowserStyle = {|
  // Custom API for Fela and Este.
  // TODO: Leverage flow-style asap.
  $extends?: Styled<any> | Array<Styled<any>>,
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
  borderWidth?: number | string,
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
  flex?: number,
  flexBasis?: number | string,
  flexDirection?: FlexDirection,
  flexFlow?: FlexFlow,
  flexGrow?: number,
  flexShrink?: number,
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
  height?: number | string,
  hyphens?: string,
  imageRendering?: string,
  imageResolution?: string,
  imageOrientation?: string,
  imeMode?: string,
  inherit?: string,
  initial?: string,
  inlineSize?: string,
  isolation?: string,
  justifyContent?: JustifyContent,
  left?: string,
  letterSpacing?: string,
  lineBreak?: string,
  lineHeight?: number | string,
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
  order?: number,
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
  width?: number | string,
  willChange?: string,
  wordBreak?: string,
  wordSpacing?: string,
  wordWrap?: string,
  writingMode?: string,
  zIndex?: number,
|};
