// @flow
import * as React from 'react';
import type { Theme } from './Editor';

// Simplified components/Box.js
// - less props and logic
// - any color, it's up to the editor UI to build theme lazily
// - use style prop for styling
// - JSON schema instead of Flow

// TODO: Add rgb/rgba regex or validate manually via Color lib.
export const colorSchemaType = { type: 'string' };

// TODO: Improve with JSON Schema draft 6 for full CSS compliance.
export const boxStyleSchema = {
  type: 'object',
  properties: {
    marginBottom: { type: ['number', 'string'] },
    marginLeft: { type: ['number', 'string'] },
    marginRight: { type: ['number', 'string'] },
    marginTop: { type: ['number', 'string'] },

    paddingBottom: { type: ['number', 'string'] },
    paddingLeft: { type: ['number', 'string'] },
    paddingRight: { type: ['number', 'string'] },
    paddingTop: { type: ['number', 'string'] },

    width: { type: ['number', 'string'] },
    minWidth: { type: ['number', 'string'] },
    maxWidth: { type: ['number', 'string'] },
    height: { type: ['number', 'string'] },
    minHeight: { type: ['number', 'string'] },
    maxHeight: { type: ['number', 'string'] },

    position: { type: 'string', enum: ['absolute', 'relative'] },
    zIndex: { type: 'number' },
    left: { type: ['number', 'string'] },
    top: { type: ['number', 'string'] },
    bottom: { type: ['number', 'string'] },
    right: { type: ['number', 'string'] },

    alignContent: {
      type: 'string',
      enum: [
        'flex-start',
        'flex-end',
        'center',
        'stretch',
        'space-between',
        'space-around',
      ],
    },
    alignItems: {
      type: 'string',
      enum: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
    },
    alignSelf: {
      type: 'string',
      enum: ['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
    },
    flex: { type: 'number' },
    flexBasis: { type: ['number', 'string'] },
    flexDirection: {
      type: 'string',
      enum: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    flexGrow: { type: 'number' },
    flexShrink: { type: 'number' },
    flexWrap: { type: 'string', enum: ['wrap', 'nowrap'] },
    justifyContent: {
      type: 'string',
      enum: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
      ],
    },

    borderStyle: { type: 'string', enum: ['solid', 'dotted', 'dashed'] },

    borderBottomWidth: { type: 'number' },
    borderLeftWidth: { type: 'number' },
    borderRightWidth: { type: 'number' },
    borderTopWidth: { type: 'number' },

    borderBottomLeftRadius: { type: 'number' },
    borderBottomRightRadius: { type: 'number' },
    borderTopLeftRadius: { type: 'number' },
    borderTopRightRadius: { type: 'number' },

    borderBottomColor: colorSchemaType,
    borderLeftColor: colorSchemaType,
    borderRightColor: colorSchemaType,
    borderTopColor: colorSchemaType,

    backgroundColor: colorSchemaType,
    opacity: { type: 'number' },
    overflow: { type: 'string', enum: ['visible', 'hidden', 'scroll'] },
  },
};

export type EditorElementBoxProps = {
  children?: React.Node,
  style?: Object,
  theme: Theme,
};

// Use plain number for vertical and horizontal rhythm based on lineHeight.
const rhythmProps = [
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'width',
  'minWidth',
  'maxWidth',
  'height',
  'minHeight',
  'maxHeight',
  'left',
  'top',
  'bottom',
  'right',
];

// Enforce React Native Flexbox behavior.
// https://microsoft.github.io/reactxp/docs/styles.html#flexbox-style-attributes
// https://github.com/Microsoft/reactxp/blob/master/src/web/Styles.ts
const computeFlex = value => {
  // p 1 auto
  if (value > 0) return [value, 1];
  // 0 -n auto
  if (value < 0) return [0, -value];
  // 0 0 auto
  return [0, 0];
};

export const computeBoxStyle = (theme: Theme, style: Object) =>
  Object.keys(style).reduce((computedStyle, prop) => {
    let value = style[prop];

    if (prop === 'flex') {
      const [grow, shrink] = computeFlex(value);
      const { flexGrow = grow, flexShrink = shrink } = style;
      return { ...computedStyle, flexGrow, flexShrink };
    }

    const isRhythmProp =
      typeof value === 'number' && rhythmProps.indexOf(prop) !== -1;
    if (isRhythmProp) {
      value *= theme.typography.lineHeight;
    }

    return { ...computedStyle, [prop]: value };
  }, {});

const EditorElementBox = ({
  style,
  theme,
  children,
  ...props
}: EditorElementBoxProps) => {
  const computedStyle = style && computeBoxStyle(theme, style);

  return (
    <div {...props} style={computedStyle}>
      {children}
      {/*
        Emulate React Native to ensure the same styling for all platforms.
        https://github.com/Microsoft/reactxp/blob/master/src/web/View.tsx
      */}
      <style jsx>{`
        div {
          position: relative;
          display: flex;
          flex-direction: column;
          flex-grow: 0;
          flex-shrink: 0;
          overflow: hidden; /* Because Android */
          align-items: stretch;
        }
      `}</style>
    </div>
  );
};

export default EditorElementBox;
