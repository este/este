// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { pipe } from 'ramda';
// import withStore, { type Store } from './core/withStore';
import withStore from './core/withStore';
import withMutation from './core/withMutation';
import SetPageContentMutation, {
  type SetPageContentCommit,
} from '../mutations/SetPageContentMutation';
import type { Editor as Data } from './__generated__/Editor.graphql';
import slate from 'slate';
import { Editor as SlateEditor } from 'slate-react';
import Head from 'next/head';
import { View, Text } from 'react-native';
import invariant from 'invariant';

type EditorHeadProps = {|
  title: string,
|};

class EditorHead extends React.PureComponent<EditorHeadProps> {
  render() {
    return (
      <Head>
        <title>{this.props.title}</title>
      </Head>
    );
  }
}

type EditorProps = {|
  data: Data,
  commit: SetPageContentCommit,
|};

type EditorState = {|
  value: Object,
  // styles:
|};

class Editor extends React.PureComponent<EditorProps, EditorState> {
  static initialJSONValue = {
    document: {
      nodes: [
        {
          object: 'block',
          type: 'style',
          data: {
            style: { id: '1' },
          },
          nodes: [
            {
              object: 'text',
              leaves: [{ text: 'Ahoj svete' }],
            },
          ],
        },
      ],
    },
  };

  editorRef = React.createRef();

  constructor(props: EditorProps) {
    super(props);
    // const { page } = this.props.data;
    // const json = page?.content || Editor.initialJSONValue;
    const json = Editor.initialJSONValue;
    // console.log(JSON.stringify(json));
    // console.log(json);
    // Resets Slate's internal key generating for SSR.
    slate.KeyUtils.resetGenerator();
    const value = slate.Value.fromJSON(json);
    this.state = {
      value,
    };
  }

  getRenderStyle(style) {
    // nabrat view styly
    // nabrat text styly? pokud aspon jeden, ok // ma non null prop

    // jak? vsechny props do objektu, a moznat trans, ok
    // const {
    //   color,
    //   fontFamily,
    //   fontSize,
    //   fontStyle,
    //   fontWeight,
    //   fontVariant,
    //   letterSpacing,
    //   lineHeight,
    //   textAlign,
    //   textAlignVertical,
    //   textDecorationLine,
    //   textTransform,
    // } = style;

    // const isText = true;
    return {
      style: {
        color: 'red',
      },
      isText: true,
    };
  }

  handleEditorChange = change => {
    this.setState({ value: change.value });
    // const documentChanged = value.document !== this.state.value.document;
    // if (documentChanged) {
    //   const content = value.toJSON();
    //   this.throttleCommit(content);
    // }
  };

  handleEditorRenderNode = (props, next) => {
    const { node, attributes, children } = props;
    const typeData = node.data.get(node.type);
    // Remove invariant from production code, use it for dev only.
    if (process.env.NODE_ENV !== 'production')
      invariant(typeData != null, 'typeData must not be null');

    switch (node.type) {
      case 'style': {
        const { style, isText } = this.getRenderStyle(typeData);
        const StyleComponent = isText ? Text : View;
        return (
          <StyleComponent {...attributes} style={style}>
            {children}
          </StyleComponent>
        );
      }
      default:
        return next();
    }
  };

  change(callback: (change: Object) => void) {
    const { current: editor } = this.editorRef;
    if (!editor) return;
    editor.change(change => {
      callback(change);
    });
  }

  render() {
    const { page } = this.props.data;
    if (page == null) return null;
    // tohle nejak do state, ne?
    // if (
    //   page == null ||
    //   page.web.borderValues == null ||
    //   page.web.colorValues == null ||
    //   page.web.dimensionValues == null ||
    //   page.web.elements == null ||
    //   page.web.styles == null
    // ) {
    //   return null;
    // }
    const { value } = this.state;

    return (
      <>
        <EditorHead title={page.title} />
        <SlateEditor
          autoFocus
          autoCorrect={false}
          spellCheck={false}
          value={value}
          onChange={this.handleEditorChange}
          renderNode={this.handleEditorRenderNode}
          ref={this.editorRef}
          // renderMark={this.renderMark}
          // onFocus={this.handleEditorFocus}
          // onKeyDown={this.handleEditorKeyDown}
        />
      </>
    );
  }
}

export default createFragmentContainer(
  pipe(
    withStore,
    withMutation(SetPageContentMutation),
  )(Editor),
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
            parent {
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
