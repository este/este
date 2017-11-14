// @flow
import * as React from 'react';
import type { Typography } from './Editor';

// This is simplified components/Box.js
// - less props and logic
// - any color, it's up to the editor UI to build theme lazily
// - use style props instead of Box props

// TODO: Add rgb/rgba regex.
const colorType = { type: 'string' };

// Only React and React Native common styles.
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

    borderBottomColor: colorType,
    borderLeftColor: colorType,
    borderRightColor: colorType,
    borderTopColor: colorType,

    backgroundColor: colorType,
    opacity: { type: 'number' },
    overflow: { type: 'string', enum: ['visible', 'hidden', 'scroll'] },
  },
};

type EditorElementBoxProps = {|
  children?: React.Node,
  style?: Object,
  typography: Typography,
|};

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

const computeBoxStyle = (style, lineHeight) =>
  Object.keys(style).reduce((boxStyle, prop) => {
    let value = style[prop];
    // Use plain number for vertical and horizontal rhythm based on lineHeight.
    if (typeof value === 'number' && rhythmProps.indexOf(prop) !== -1) {
      value *= lineHeight;
    }
    return { ...boxStyle, [prop]: value };
  }, {});

// TODO: Check current react-native-web and reactxp implementation.
// http://facebook.github.io/react-native/releases/0.49/docs/layout-props.html#flex
// https://github.com/necolas/react-native-web
const restrictFlex = style => style;

const EditorElementBox = (props: EditorElementBoxProps) => {
  let { style } = props;

  if (style) style = computeBoxStyle(style, props.typography.lineHeight);
  if (style) style = restrictFlex(style);

  // TODO: tryToEnsureRhythmViaPaddingCompensation

  return (
    <div style={style}>
      {props.children}
      {/*
        Emulate React Native to ensure the same styling for all platforms.
        https://facebook.github.io/yoga
        https://github.com/Microsoft/reactxp
        https://github.com/necolas/react-native-web
        // TODO: Check current react-native-web and reactxp implementation.
      */}
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default EditorElementBox;
