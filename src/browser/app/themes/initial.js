/* @flow */
import type { Theme } from './types';
import openColor from './openColor';

// All constants belong to the theme.

const createTypography = ({
  baseFontSize,
  baseLineHeight,
  scaleRatio,
}) => {
  const fontSize = number => Array.from(Array(Math.abs(number)))
    .reduce(
      size => number > 0 ? size * scaleRatio : size / scaleRatio,
      baseFontSize,
    );
  const baseLineHeightPx = baseFontSize * baseLineHeight;
  const scaleSize = number => baseLineHeightPx * number;

  return {
    baseLineHeightPx,
    // Modular scale
    //  - www.modularscale.com/
    //  - spencermortensen.com/articles/typographic-scale/
    //  - 24ways.org/2011/composing-the-new-canon
    fontSizes: {
      extraSmall: fontSize(-2),
      small: fontSize(-1),
      medium: fontSize(0),
      big: fontSize(1),
      extraBig: fontSize(2),
      superBig: fontSize(3),
    },
    // Vertical rhythm
    //  - inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
    //  - 24ways.org/2006/compose-to-a-vertical-rhythm
    //  - zellwk.com/blog/why-vertical-rhythms
    //  - scotch.io/tutorials/aesthetic-sass-3-typography-and-vertical-rhythm
    //  - basehold.it
    sizes: {
      extraSmall: scaleSize(1),
      small: scaleSize(2),
      medium: scaleSize(3),
      big: scaleSize(4),
      extraBig: scaleSize(5),
      superBig: scaleSize(6),
    },
  };
};

// 24ways.org/2011/composing-the-new-canon
const scales = {
  minorSecond: 1.067,
  majorSecond: 1.125,
  minorThird: 1.2,
  majorThird: 1.25,
  perfectFourth: 1.333,
  augFourth   : 1.414,
  perfectFifth: 1.5,
  minorSixth: 1.6,
  goldenSection: 1.618,
  majorSixth: 1.667,
  minorSeventh: 1.778,
  majorSeventh: 1.875,
  octave: 2,
  majorTenth: 2.5,
  majorEleventh: 2.667,
  majorTwelfth: 3,
  doubleOctave: 4,
};

const typography = createTypography({
  baseFontSize: 16,
  baseLineHeight: scales.perfectFifth,
  scaleRatio: scales.perfectFifth,
});

// optional border nebo padding, je to nutne kdyz mam size? imho je
const rhythm = (fontSize: number) => {
  // const multiplier = Math.ceil($font-size / $line-height-base);
  // const lineHeight = line-height:  $line-height-base * $multiplier;
};

const theme: Theme = {
  text: {
    // www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    lineHeight: typography.baseLineHeightPx,
    bold: 600,
  },
  fontSizes: typography.fontSizes,
  sizes: typography.sizes,
  colors: {
    primary: '#08e',
    secondary: '#888',
    info: '#08e',
    success: '#1c7',
    warning: '#f70',
    error: '#f52',
    black: openColor.gray8,
    white: '#fff',
    gray: openColor.gray4,
    open: openColor,
  },
  border: {
    radius: 2,
    width: 1,
  },
  states: {
    disabled: {
      cursor: 'default',
      opacity: 0.5,
    },
  },
  heading: {
    // TODO: Default marginBottom belongs here. paddingTop? hmm, no.
    // lineHeight: 1.25,
  },
};

export default theme;
