// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  boxStyleSchema,
  colorSchemaType,
  computeBoxStyle,
  type EditorElementBoxProps,
} from './EditorElementBox';
import colorLib from 'color';

// Simplified components/Text.js
// - less props and logic
// - any color, it's up to the editor UI to build theme lazily
// - use style prop for styling
// - JSON schema instead of Flow

// TODO: Improve with JSON Schema draft 6 for full CSS compliance.
export const textStyleSchema = {
  ...boxStyleSchema,
  properties: {
    ...boxStyleSchema.properties,
    fontFamily: { type: 'string' },
    fontSize: { type: ['number', 'string'] },
    fontStyle: { type: 'string', enum: ['normal', 'italic'] },
    fontWeight: {
      type: 'string',
      enum: [
        'normal',
        'bold',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
      ],
    },
    lineHeight: { type: 'number' },
    textAlign: { type: 'string', enum: ['left', 'right', 'center'] },
    textDecoration: {
      type: 'string',
      enum: ['none', 'underline', 'line-through'],
    },
    color: colorSchemaType,
  },
};

type EditorElementTextProps = EditorElementBoxProps;

const computeTextStyle = (hasParentText, theme, style) => {
  style = {
    // Set default styles only for not nested Text.
    ...(hasParentText
      ? null
      : {
          color: theme.colors.foreground,
          fontFamily: theme.typography.fontFamily,
          fontSize: 0,
          lineHeight: theme.typography.lineHeight,
        }),
    ...style,
    ...(hasParentText ? null : computeBoxStyle(theme, style || {})),
  };

  // Use modular scale for fontSize typeof number.
  if (typeof style.fontSize === 'number') {
    style.fontSize = `${theme.typography.fontSize *
      theme.typography.fontSizeScale ** -style.fontSize}px`;
  }

  // Set rhythm lineHeight by fontSize and theme.typography.lineHeight.
  // http://inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm
  if (style.fontSize) {
    const lines = Math.ceil(
      parseInt(style.fontSize, 10) / theme.typography.lineHeight,
    );
    style.lineHeight = lines * theme.typography.lineHeight;
  }

  // TODO: Consider fixBrowserFontSmoothing.

  return style;
};

class EditorElementText extends React.Component<EditorElementTextProps> {
  static childContextTypes = {
    hasParentText: PropTypes.bool,
  };

  static contextTypes = {
    hasParentText: PropTypes.bool,
  };

  getChildContext() {
    // Let descendant components know that their nearest ancestor is Text.
    return { hasParentText: true };
  }

  context: { hasParentText: boolean };

  render() {
    const { style, theme, children, ...props } = this.props;
    const { hasParentText } = this.context;
    const {
      color,
      fontFamily,
      fontSize,
      lineHeight,
      ...computedStyle
    } = computeTextStyle(hasParentText, theme, style);

    // http://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing
    // tldr; Fix font smoothing only for light text on a dark background.
    // We check only color luminosity for now. It's good enough. An ideal
    // solution would have to propagate backgroundColor from parents through
    // context. That's would allow to compare luminosities.
    const fixBrowserFontSmoothing = color && colorLib(color).luminosity() > 0.5;

    return (
      <div {...props} style={computedStyle}>
        {children}
        {/*
          Emulate React Native to ensure the same styling for all platforms.
          https://github.com/Microsoft/reactxp/blob/master/src/web/Text.tsx
        */}
        <style jsx>{`
          div {
            position: relative;
            display: inline;
            flex-grow: 0;
            flex-shrink: 0;
            overflow: hidden; /* Because Android */
            white-space: pre-wrap;
            overflow-wrap: break-word;
            hyphens: auto;
          }
        `}</style>
        {/*
          https://github.com/zeit/styled-jsx/issues/297#issuecomment-334986575
        */}
        <style jsx>{`
          div {
            ${color ? `color: ${color}` : ''};
            ${fontFamily ? `font-family: ${fontFamily}` : ''};
            ${fontSize ? `font-size: ${fontSize}` : ''};
            ${lineHeight ? `line-height: ${lineHeight}px` : ''};
            ${fixBrowserFontSmoothing
              ? `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
              : ''};
          }
        `}</style>
      </div>
    );
  }
}

export default EditorElementText;
