/* @flow */

export type Theme = {
  fontFamily: string,
  fontSizes: {
    // h1: number,
    // h2: number,
    // h3: number,
    text: number,
    smallText: number,
  },
  lineHeight: number,
  bold: number,
  scales: {
    small: number,
    medium: number,
    big: number,
    extraBig: number,
  },
  colors: {
    primary: string,
    secondary: string,
    info: string,
    success: string,
    warning: string,
    error: string,
    black: string,
    gray: string,
    white: string,
  },
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

const theme: Theme = {
  // www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  fontSizes: {
    // h1: 32,
    // h2: 24,
    // h3: 20,
    text: 16,
    smallText: 14,
  },
  lineHeight: 1.5,
  bold: 600,
  // Basic rhythm for paddings and margins.
  scales: {
    // extraSmall: 4,
    small: 8,
    medium: 16,
    big: 32,
    extraBig: 64,
  },
  colors: {
    // Semantic
    primary: '#08e',
    secondary: '#888',
    info: '#08e',
    success: '#1c7',
    warning: '#f70',
    error: '#f52',
    // Custom
    black: '#333',
    gray: '#ddd',
    white: '#fff',
  },
  border: {
    radius: 2,
    color: 'rgba(0, 0, 0, .25)',
  },
  states: {
    disabled: {
      cursor: 'default',
      opacity: 0.5,
    },
  },
};

export default theme;
