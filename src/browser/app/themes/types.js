/* @flow */
import type { OpenColor } from './openColor';

export type { Exact } from '../../../common/types';

export type Sizes = {
  extraSmall: number,
  small: number,
  medium: number,
  big: number,
  extraBig: number,
};

export type Size = $Keys<Sizes>;

type Colors = {
  primary: string,
  secondary: string,
  info: string,
  success: string,
  warning: string,
  error: string,
  black: string,
  white: string,
};

export type Color = $Keys<Colors>;

// Theme types.
// We can't use Exact<T> because it breaks autocomplete.
// We can't use native exact type because it doesn't support spread nor intersection.
// TODO: Wait for flow fix.
export type Theme = {
  fontFamily: string,
  fontSizes: Sizes,
  lineHeight: number,
  bold: number,
  sizes: Sizes,
  colors: Colors & { open: OpenColor },
  border: {
    radius: number,
    color: string,
  },
  states: {
    disabled: {
      cursor: string,
      opacity: number,
    },
  },
};

// Style types. Taken from cssreference.io.
// TODO: Improve it. Consider adding Fela custom syntax and moving to own file.

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

// Now Style can't check misspelled selectors like colour instead of color.
// Checking misspelled selectors is possible even with Fela, but only for known
// constants like `:hover`, not for '@media (min-height: 200px)'.
// type FelaStyleKey = ':active' | ':hover'; Then [FelaStyleKey]: Style,
// We have these options:
//  1) Remove magic strings from Fela
//  2) Use String('foo') syntax to bypass Flow checking, which is ugly.
//    [String('@media (min-height: 200px)')]: { textDecoration: 'line-through' },
// For now, we can live with plain Object checking, which is good enough.
export type Style = {
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
  borderRadius?: string,
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
};
