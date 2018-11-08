// @flow
// $FlowFixMe
import React, { useRef, useState, useMemo, useContext, type Node } from 'react';
import Head from 'next/head';
import { createFragmentContainer, graphql } from 'react-relay';
import type { Editor as Data } from './__generated__/Editor.graphql';
import { Value, KeyUtils } from 'slate';
import { Editor as SlateEditor } from 'slate-react';
import { View, Text, StyleSheet } from 'react-native';
import EditorMenu from './EditorMenu';
import { isKeyHotkey } from 'is-hotkey';
import EditorBreadcrumb from './EditorBreadcrumb';

export type MarkType = 'bold' | 'italic';

export type EditorAction =
  | {| type: 'focus' |}
  | {| type: 'update', value: Object |}
  | {| type: 'toggleMark', mark: MarkType |}
  | {| type: 'setStyle', id: string |};

type EditorDispatch = (action: EditorAction) => void;

const EditorDispatchContext = React.createContext<?EditorDispatch>(null);

export function stylesSorter<S: { +name: string }>(a: S, b: S) {
  return a.name.localeCompare(b.name);
}

export function useEditorDispatch(): EditorDispatch {
  const dispatch = useContext(EditorDispatchContext);
  return dispatch;
}

const markStyles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
});

function arrayOfItemsWithIdToObject(array: $ReadOnlyArray<{ +id: string }>) {
  return array.reduce((obj, item) => {
    return { ...obj, [item.id]: item };
  }, {});
}

function elementsToSlateValue(pageElementId, elementsArray) {
  const elements = arrayOfItemsWithIdToObject(elementsArray);

  function walk(id) {
    const element = elements[id];
    const { type } = element;
    if (type === 'TEXT')
      return {
        object: 'text',
        leaves: element.textLeaves,
      };
    const styleId = element.style?.id;
    if (styleId == null)
      throw Error('The element has to have style or component ID.');
    return {
      object: type.toLowerCase(),
      type: styleId,
      nodes: element.children
        .map(child => elements[child.id])
        .sort((a, b) => a.index - b.index)
        .map(child => walk(child.id)),
    };
  }

  const node = walk(pageElementId);

  return {
    document: {
      nodes: [node],
    },
  };
}

// Eager approach is simple.
// TODO: Consider lazy resolving with a cache.
// TODO: Do not pass styles, stylesById are enough.
function stylesToStyleSheet(
  styles,
  borderValues,
  colorValues,
  dimensionValues,
  stylesById,
) {
  const borders = borderValues.reduce((borders, borderValue) => {
    const { unit, id, value } = borderValue;
    switch (unit) {
      case 'POINT': {
        return { ...borders, [id]: value };
      }
      default: {
        // eslint-disable-next-line no-unused-expressions
        (unit: empty);
        return borders;
      }
    }
  }, {});

  const colors = colorValues.reduce((colors, colorValue) => {
    const { r, g, b, a } = colorValue;
    const value =
      a == null ? `rgb(${r}, ${g}, ${b})` : `rgb(${r}, ${g}, ${b}, ${a})`;
    return { ...colors, [colorValue.id]: value };
  }, {});

  const dimensions = dimensionValues.reduce((dimensions, dimensionValue) => {
    const { unit, id, value } = dimensionValue;
    switch (unit) {
      case 'POINT': {
        return { ...dimensions, [id]: value };
      }
      case 'PERCENTAGE': {
        return { ...dimensions, [id]: `${value}%` };
      }
      case 'KEYWORD': {
        if (value !== 1) return dimensions;
        return { ...dimensions, [id]: 'auto' };
      }
      default: {
        // eslint-disable-next-line no-unused-expressions
        (unit: empty);
        return dimensions;
      }
    }
  }, {});

  const sheets = styles.reduce((sheets, value) => {
    const json = {};
    // Manually, because relay/unused-fields eslint check.
    // flat
    if (value.display != null) json.display = value.display.toLowerCase();
    if (value.position != null) json.position = value.position.toLowerCase();
    if (value.flexDirection != null)
      json.flexDirection = value.flexDirection.toLowerCase().replace('_', '-');
    if (value.flexWrap != null)
      json.flexWrap = value.flexWrap.toLowerCase().replace('_', '-');
    if (value.justifyContent != null)
      json.justifyContent = value.justifyContent
        .toLowerCase()
        .replace('_', '-');
    if (value.alignItems != null)
      json.alignItems = value.alignItems.toLowerCase().replace('_', '-');
    if (value.alignSelf != null)
      json.alignSelf = value.alignSelf.toLowerCase().replace('_', '-');
    if (value.alignContent != null)
      json.alignContent = value.alignContent.toLowerCase().replace('_', '-');
    if (value.overflow != null) json.overflow = value.overflow.toLowerCase();
    if (value.flex != null) json.flex = value.flex;
    if (value.flexGrow != null) json.flexGrow = value.flexGrow;
    if (value.flexShrink != null) json.flexShrink = value.flexShrink;
    // flexBasis can be number or 'auto', but Prisma doesn't support union types
    // yet. Therefore, -1 is considered to be 'auto'.
    if (value.flexBasis != null)
      json.flexBasis = value.flexBasis === -1 ? 'auto' : value.flexBasis;
    if (value.zIndex != null) json.zIndex = value.zIndex;
    if (value.direction != null) json.direction = value.direction.toLowerCase();
    if (value.opacity != null) json.opacity = value.opacity;
    if (value.fontFamily != null) json.fontFamily = value.fontFamily;
    if (value.fontSize != null) json.fontSize = value.fontSize;
    if (value.fontStyle != null) json.fontStyle = value.fontStyle.toLowerCase();
    if (value.fontWeight != null)
      json.fontWeight = value.fontWeight.toLowerCase().replace('INT_', '');
    if (value.fontVariant != null)
      json.fontVariant = value.fontVariant.toLowerCase().replace('_', '-');
    if (value.letterSpacing != null) json.letterSpacing = value.letterSpacing;
    if (value.lineHeight != null) json.lineHeight = value.lineHeight;
    if (value.textAlign != null) json.textAlign = value.textAlign.toLowerCase();
    if (value.textAlignVertical != null)
      json.textAlignVertical = value.textAlignVertical.toLowerCase();
    if (value.textDecorationLine != null)
      json.textDecorationLine = value.textDecorationLine
        .toLowerCase()
        .replace('_', '-');
    if (value.textTransform != null)
      json.textTransform = value.textTransform.toLowerCase();
    if (value.borderStyle != null)
      json.borderStyle = value.borderStyle.toLowerCase();
    // borders
    if (value.borderRadius != null)
      json.borderRadius = borders[value.borderRadius.id];
    if (value.borderBottomEndRadius != null)
      json.borderBottomEndRadius = borders[value.borderBottomEndRadius.id];
    if (value.borderBottomLeftRadius != null)
      json.borderBottomLeftRadius = borders[value.borderBottomLeftRadius.id];
    if (value.borderBottomRightRadius != null)
      json.borderBottomRightRadius = borders[value.borderBottomRightRadius.id];
    if (value.borderBottomStartRadius != null)
      json.borderBottomStartRadius = borders[value.borderBottomStartRadius.id];
    if (value.borderTopEndRadius != null)
      json.borderTopEndRadius = borders[value.borderTopEndRadius.id];
    if (value.borderTopLeftRadius != null)
      json.borderTopLeftRadius = borders[value.borderTopLeftRadius.id];
    if (value.borderTopRightRadius != null)
      json.borderTopRightRadius = borders[value.borderTopRightRadius.id];
    if (value.borderTopStartRadius != null)
      json.borderTopStartRadius = borders[value.borderTopStartRadius.id];
    if (value.borderWidth != null)
      json.borderWidth = borders[value.borderWidth.id];
    if (value.borderBottomWidth != null)
      json.borderBottomWidth = borders[value.borderBottomWidth.id];
    if (value.borderEndWidth != null)
      json.borderEndWidth = borders[value.borderEndWidth.id];
    if (value.borderLeftWidth != null)
      json.borderLeftWidth = borders[value.borderLeftWidth.id];
    if (value.borderRightWidth != null)
      json.borderRightWidth = borders[value.borderRightWidth.id];
    if (value.borderStartWidth != null)
      json.borderStartWidth = borders[value.borderStartWidth.id];
    if (value.borderTopWidth != null)
      json.borderTopWidth = borders[value.borderTopWidth.id];
    // colors
    if (value.color != null) json.color = colors[value.color.id];
    if (value.backgroundColor != null)
      json.backgroundColor = colors[value.backgroundColor.id];
    if (value.borderColor != null)
      json.borderColor = colors[value.borderColor.id];
    if (value.borderBottomColor != null)
      json.borderBottomColor = colors[value.borderBottomColor.id];
    if (value.borderEndColor != null)
      json.borderEndColor = colors[value.borderEndColor.id];
    if (value.borderLeftColor != null)
      json.borderLeftColor = colors[value.borderLeftColor.id];
    if (value.borderRightColor != null)
      json.borderRightColor = colors[value.borderRightColor.id];
    if (value.borderStartColor != null)
      json.borderStartColor = colors[value.borderStartColor.id];
    if (value.borderTopColor != null)
      json.borderTopColor = colors[value.borderTopColor.id];
    // dimensions
    if (value.width != null) json.width = dimensions[value.width.id];
    if (value.height != null) json.height = dimensions[value.height.id];
    if (value.bottom != null) json.bottom = dimensions[value.bottom.id];
    if (value.end != null) json.end = dimensions[value.end.id];
    if (value.left != null) json.left = dimensions[value.left.id];
    if (value.right != null) json.right = dimensions[value.right.id];
    if (value.start != null) json.start = dimensions[value.start.id];
    if (value.top != null) json.top = dimensions[value.top.id];
    if (value.minWidth != null) json.minWidth = dimensions[value.minWidth.id];
    if (value.maxWidth != null) json.maxWidth = dimensions[value.maxWidth.id];
    if (value.minHeight != null)
      json.minHeight = dimensions[value.minHeight.id];
    if (value.maxHeight != null)
      json.maxHeight = dimensions[value.maxHeight.id];
    if (value.margin != null) json.margin = dimensions[value.margin.id];
    if (value.marginBottom != null)
      json.marginBottom = dimensions[value.marginBottom.id];
    if (value.marginEnd != null)
      json.marginEnd = dimensions[value.marginEnd.id];
    if (value.marginHorizontal != null)
      json.marginHorizontal = dimensions[value.marginHorizontal.id];
    if (value.marginLeft != null)
      json.marginLeft = dimensions[value.marginLeft.id];
    if (value.marginRight != null)
      json.marginRight = dimensions[value.marginRight.id];
    if (value.marginStart != null)
      json.marginStart = dimensions[value.marginStart.id];
    if (value.marginTop != null)
      json.marginTop = dimensions[value.marginTop.id];
    if (value.marginVertical != null)
      json.marginVertical = dimensions[value.marginVertical.id];
    if (value.padding != null) json.padding = dimensions[value.padding.id];
    if (value.paddingBottom != null)
      json.paddingBottom = dimensions[value.paddingBottom.id];
    if (value.paddingEnd != null)
      json.paddingEnd = dimensions[value.paddingEnd.id];
    if (value.paddingHorizontal != null)
      json.paddingHorizontal = dimensions[value.paddingHorizontal.id];
    if (value.paddingLeft != null)
      json.paddingLeft = dimensions[value.paddingLeft.id];
    if (value.paddingRight != null)
      json.paddingRight = dimensions[value.paddingRight.id];
    if (value.paddingStart != null)
      json.paddingStart = dimensions[value.paddingStart.id];
    if (value.paddingTop != null)
      json.paddingTop = dimensions[value.paddingTop.id];
    if (value.paddingVertical != null)
      json.paddingVertical = dimensions[value.paddingVertical.id];
    // $FlowFixMe
    const sheet = StyleSheet.create({ json }).json;
    return { ...sheets, [value.id]: sheet };
  }, {});

  // No circular check. It's the server and UI responsibility.
  function resolveStyle(styleId) {
    const style = stylesById[styleId];
    let { isText } = style;
    let spreadStyles = [];
    style.spreadStyles
      // Clone first, because sort mutates array.
      .slice()
      .sort((a, b) => a.index - b.index)
      .forEach(item => {
        const resolved = resolveStyle(item.style.id);
        if (resolved.isText) isText = true;
        spreadStyles = [...resolved.style, ...spreadStyles];
      });
    return { isText, style: [...spreadStyles, sheets[styleId]] };
  }

  const styleSheet = styles.reduce((styleSheet, { id, name }) => {
    const { isText, style } = resolveStyle(id);
    return { ...styleSheet, [id]: { name, isText, style } };
  }, {});

  return styleSheet;
}

function EditorWithData({
  page,
  elements,
  styles,
  borderValues,
  colorValues,
  dimensionValues,
}) {
  const editorRef = useRef(null);
  const [value, setValue] = useState(() => {
    const model = elementsToSlateValue(page.element.id, elements);
    // For SSR.
    KeyUtils.resetGenerator();
    return Value.fromJSON(model);
  });
  const stylesById = useMemo(() => arrayOfItemsWithIdToObject(styles), [
    styles,
  ]);
  const styleSheet = useMemo(
    () =>
      stylesToStyleSheet(
        styles,
        borderValues,
        colorValues,
        dimensionValues,
        stylesById,
      ),
    [styles, borderValues, colorValues, dimensionValues, stylesById],
  );
  const ancestors = useMemo(
    () => value.document.getAncestors(value.selection.focus.path).shift(),
    [value.document, value.selection.focus.path],
  );

  function dispatch(action: EditorAction) {
    const { current: editor } = editorRef;
    if (!editor) return;

    switch (action.type) {
      case 'focus': {
        editor.focus();
        break;
      }
      case 'update': {
        setValue(action.value);
        break;
      }
      case 'toggleMark': {
        editor.toggleMark(action.mark);
        break;
      }
      case 'setStyle': {
        const type = action.id;
        editor.setBlocks(type);
        break;
      }
      default:
        // eslint-disable-next-line no-unused-expressions
        (action.type: empty);
    }
  }

  function handleKeyDown(event: KeyboardEvent, editor, next) {
    if (isKeyHotkey('mod+b')(event)) {
      event.preventDefault();
      dispatch({ type: 'toggleMark', mark: 'bold' });
      return;
    }

    if (isKeyHotkey('mod+i')(event)) {
      event.preventDefault();
      dispatch({ type: 'toggleMark', mark: 'italic' });
      return;
    }

    function getTextStyles() {
      return Object.keys(styleSheet)
        .map(id => {
          const { name, isText, style } = styleSheet[id];
          return { id, name, isText, style };
        })
        .filter(style => style.isText);
    }

    // Yep. Functions inside functions. It's handy and ok pattern.
    function tryGeyStyleHotkey(event) {
      if (!isKeyHotkey('cmd+opt', event)) return;
      const styleIndex = event.which - 49;
      const isStyleHotkey = styleIndex >= 0 && styleIndex <= 9;
      if (!isStyleHotkey) return;
      const styles = getTextStyles().sort(stylesSorter);
      const style = styles[styleIndex];
      if (style == null) return;
      return style.id;
    }

    const styleId = tryGeyStyleHotkey(event);
    if (styleId != null) {
      event.preventDefault();
      dispatch({ type: 'setStyle', id: styleId });
      return;
    }

    // By default, Slate splits blocks to the same type. That's fine for lists.
    // But for anything else, we want default text style instead (P after H1).
    // Convention over configuration by text styles names is the best IMHO.
    // 1) Try to find closest parent node related text.
    //    e.g. header-text, container-text, etc.
    // 2) Try to find node named 'text'.
    // 3) First isText without spread, for rare case the user renamed it.
    // 4) Throw an error. App must not allow to delete text style.
    function getDefaultTextStyleId() {
      const styles = getTextStyles();
      const ancestorWithTextStyle = ancestors.find(ancestor => {
        const { name } = stylesById[ancestor.type];
        const textName = `${name}-text`;
        return styles.find(style => style.name === textName);
      });
      if (ancestorWithTextStyle != null)
        return stylesById[ancestorWithTextStyle.get('type')].id;
      const named = styles.find(style => style.name === 'text');
      if (named != null) return named.id;
      const firstWithoutSpread = styles.find(s => s.style.length === 1);
      if (firstWithoutSpread != null) return firstWithoutSpread.id;
      throw Error('missing text style');
    }

    function handleKeyEnter() {
      const { value } = editor;
      const { selection } = value;
      const { start, end, isExpanded } = selection;
      if (isExpanded) return next();

      const { startBlock } = value;
      // if (start.offset == 0 && startBlock.text.length == 0)
      //   return this.onBackspace(event, editor, next);
      if (end.offset !== startBlock.text.length) return next();

      // TODO: Heuristic detection.
      const isItem = false;

      if (isItem) {
        // Default action is to split an element.
        return next();
      }

      // For headings, quotes, etc., we want to continue with a text.
      event.preventDefault();
      editor.splitBlock().setBlocks(getDefaultTextStyleId());
    }

    switch (event.key) {
      // case ' ':
      //   return handleKeySpace(event, change, next);
      // case 'Backspace':
      //   return handleKeyBackspace(event, change, next);
      case 'Enter':
        return handleKeyEnter();
    }

    return next();
  }

  function renderNode(props) {
    const { node, attributes, children } = props;
    const styleId = node.type;
    const { style, isText } = styleSheet[styleId];
    const Component = isText ? Text : View;
    // console.log(name, StyleSheet.flatten(style));
    return (
      <Component {...attributes} style={style}>
        {children}
      </Component>
    );
  }

  function renderMark(props, editor, next) {
    const { children, mark, attributes } = props;
    const type: MarkType = mark.type;
    switch (type) {
      case 'bold':
        return (
          <Text {...attributes} style={markStyles.bold}>
            {children}
          </Text>
        );
      case 'italic':
        return (
          <Text {...attributes} style={markStyles.italic}>
            {children}
          </Text>
        );
      default: {
        // eslint-disable-next-line no-unused-expressions
        (type: empty);
        return next();
      }
    }
  }

  // https://github.com/relayjs/eslint-plugin-relay/issues/35
  // eslint-disable-next-line no-unused-expressions
  page.title;

  return (
    <>
      <Head>
        <title>{page.draftTitle}</title>
      </Head>
      <SlateEditor
        autoCorrect={false}
        spellCheck={false}
        autoFocus
        ref={editorRef}
        value={value}
        // Emulate React Native View. We need it for the full available height.
        style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
        onChange={({ value }) => dispatch({ type: 'update', value })}
        // https://github.com/ianstormtaylor/slate/issues/2352
        onFocus={() => dispatch({ type: 'focus' })}
        onKeyDown={handleKeyDown}
        renderNode={renderNode}
        renderMark={renderMark}
      />
      <EditorDispatchContext.Provider value={dispatch}>
        <EditorMenu value={value} styleSheet={styleSheet} />
        <EditorBreadcrumb ancestors={ancestors} stylesById={stylesById} />
      </EditorDispatchContext.Provider>
    </>
  );
}

// Note ": Node". From Flow 0.85, it's must to EditorWithData props be inferred.
function Editor({ data: { page } }: {| data: Data |}): Node {
  if (
    page == null ||
    page.web.borderValues == null ||
    page.web.colorValues == null ||
    page.web.dimensionValues == null ||
    page.web.elements == null ||
    page.web.styles == null
  ) {
    // No data? Just render nothing. Maybe a schema was updated.
    return null;
  }
  return (
    <EditorWithData
      page={page}
      borderValues={page.web.borderValues}
      colorValues={page.web.colorValues}
      dimensionValues={page.web.dimensionValues}
      elements={page.web.elements}
      styles={page.web.styles}
    />
  );
}

// TODO: Replace with useRelayFragmentContainer when available.
export default createFragmentContainer(
  Editor,
  graphql`
    fragment Editor on Query @argumentDefinitions(id: { type: "ID!" }) {
      page(id: $id) {
        id
        title @__clientField(handle: "draft")
        # This preloads
        draftTitle
        element {
          id
        }
        web {
          borderValues {
            id
            name
            unit
            value
          }
          colorValues {
            id
            name
            r
            g
            b
            a
          }
          dimensionValues {
            id
            name
            unit
            value
          }
          styles {
            id
            spreadStyles {
              index
              style {
                id
              }
            }
            isText
            name
            display
            width {
              id
            }
            height {
              id
            }
            bottom {
              id
            }
            end {
              id
            }
            left {
              id
            }
            right {
              id
            }
            start {
              id
            }
            top {
              id
            }
            minWidth {
              id
            }
            maxWidth {
              id
            }
            minHeight {
              id
            }
            maxHeight {
              id
            }
            margin {
              id
            }
            marginBottom {
              id
            }
            marginEnd {
              id
            }
            marginHorizontal {
              id
            }
            marginLeft {
              id
            }
            marginRight {
              id
            }
            marginStart {
              id
            }
            marginTop {
              id
            }
            marginVertical {
              id
            }
            padding {
              id
            }
            paddingBottom {
              id
            }
            paddingEnd {
              id
            }
            paddingHorizontal {
              id
            }
            paddingLeft {
              id
            }
            paddingRight {
              id
            }
            paddingStart {
              id
            }
            paddingTop {
              id
            }
            paddingVertical {
              id
            }
            position
            flexDirection
            flexWrap
            justifyContent
            alignItems
            alignSelf
            alignContent
            overflow
            flex
            flexGrow
            flexShrink
            flexBasis
            zIndex
            direction
            backgroundColor {
              id
            }
            borderColor {
              id
            }
            borderBottomColor {
              id
            }
            borderEndColor {
              id
            }
            borderLeftColor {
              id
            }
            borderRightColor {
              id
            }
            borderStartColor {
              id
            }
            borderTopColor {
              id
            }
            borderRadius {
              id
            }
            borderBottomEndRadius {
              id
            }
            borderBottomLeftRadius {
              id
            }
            borderBottomRightRadius {
              id
            }
            borderBottomStartRadius {
              id
            }
            borderTopEndRadius {
              id
            }
            borderTopLeftRadius {
              id
            }
            borderTopRightRadius {
              id
            }
            borderTopStartRadius {
              id
            }
            borderStyle
            borderWidth {
              id
            }
            borderBottomWidth {
              id
            }
            borderEndWidth {
              id
            }
            borderLeftWidth {
              id
            }
            borderRightWidth {
              id
            }
            borderStartWidth {
              id
            }
            borderTopWidth {
              id
            }
            opacity
            color {
              id
            }
            fontFamily
            fontSize
            fontStyle
            fontWeight
            fontVariant
            letterSpacing
            lineHeight
            textAlign
            textAlignVertical
            textDecorationLine
            textTransform
          }
          elements {
            id
            children {
              id
            }
            style {
              id
            }
            index
            type
            textLeaves
          }
        }
      }
    }
  `,
);
