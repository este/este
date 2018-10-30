// @flow
// $FlowFixMe
import React, { useState, memo } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import type { Editor as Data } from './__generated__/Editor.graphql';
import { Value, KeyUtils } from 'slate';
import { Editor as SlateEditor } from 'slate-react';
import { View, Text } from 'react-native';

// Map array to object for faster access by Id.
function mapArrayOfObjectsWithIdToObject(array) {
  return array.reduce((obj, item) => {
    return { ...obj, [item.id]: item };
  }, {});
}

function dbModelToSlateModel(pageElementId, elements) {
  function walk(id) {
    const element = elements[id];
    const { type } = element;
    const slateNode = {
      object: type.toLowerCase(),
      type: 'style',
      data: {
        style: {
          id: element.style?.id,
        },
      },
    };
    if (type === 'TEXT')
      return {
        ...slateNode,
        leaves: element.textLeaves,
      };
    return {
      ...slateNode,
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

type Page = $NonMaybeType<$ElementType<Data, 'page'>>;
type Web = $ElementType<Page, 'web'>;

type EditorWithDataProps = {|
  page: Page,
  borderValues: $NonMaybeType<$ElementType<Web, 'borderValues'>>,
  colorValues: $NonMaybeType<$ElementType<Web, 'colorValues'>>,
  dimensionValues: $NonMaybeType<$ElementType<Web, 'dimensionValues'>>,
  elements: $NonMaybeType<$ElementType<Web, 'elements'>>,
  styles: $NonMaybeType<$ElementType<Web, 'styles'>>,
|};

function EditorWithData({
  page,
  borderValues,
  colorValues,
  dimensionValues,
  elements,
  styles,
}: EditorWithDataProps) {
  const [editorValue, setEditorValue] = useState(() => {
    const elementsById = mapArrayOfObjectsWithIdToObject(elements);
    const model = dbModelToSlateModel(page.element.id, elementsById);
    // For SSR.
    KeyUtils.resetGenerator();
    return Value.fromJSON(model);
  });

  // console.log(colorValues);
  // console.log(styles.map(s => s.spreadStyles));

  function handleEditorChange({ value }) {
    setEditorValue(value);
  }

  function resolveStyle(styleId) {
    // const style = styles.find(style => style.id === styleId);
    // console.log(style.spreadStyles);
    // najdi styl, najdi vsechny predchozi, transformuj props, jakmile ma neco
    // isText, tak je to isText, kdyz odeberu styl s isText, tak co?
    // to nesmi jit odebrat, ledaze bych odebral children nebo detekovat, jestli
    // tam neni text.
    // console.log(styleId);

    return {
      style: {},
      isText: false,
    };
  }

  function renderNode(props) {
    const { node, attributes, children } = props;
    const data = node.data.get(node.type);
    const { style, isText } = resolveStyle(data.id);
    const Component = isText ? Text : View;
    return (
      <Component {...attributes} style={style}>
        {children}
      </Component>
    );
  }

  return (
    <SlateEditor
      autoCorrect={false}
      spellCheck={false}
      autoFocus
      value={editorValue}
      onChange={handleEditorChange}
      renderNode={renderNode}
      // renderMark={this.renderMark}
      // onKeyDown={this.handleEditorKeyDown}
    />
  );
}

type EditorProps = {|
  data: Data,
|};

// Looks like a pattern.
function Editor({ data: { page } }: EditorProps) {
  if (
    page == null ||
    page.web.borderValues == null ||
    page.web.colorValues == null ||
    page.web.dimensionValues == null ||
    page.web.elements == null ||
    page.web.styles == null
  ) {
    // TODO: Return error page and log missing data.
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
        title
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
              id
              index
            }
            nextStyle {
              id
            }
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
