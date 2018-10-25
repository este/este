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
    // https://github.com/relayjs/eslint-plugin-relay/issues/35
    // eslint-disable-next-line no-unused-expressions
    page.title;
    const { value } = this.state;

    return (
      <>
        <EditorHead title={page.draftTitle} />
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
        title @__clientField(handle: "draft")
        draftTitle
        # content
        # document {
        #   elements
        # }
      }
    }
  `,
);
