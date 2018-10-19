// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { pipe } from 'ramda';
import withStore, { type Store } from './core/withStore';
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
|};

class Editor extends React.PureComponent<EditorProps, EditorState> {
  static initialJSONValue = {
    document: {
      nodes: [
        {
          object: 'block',
          type: 'style',
          data: {
            style: {
              id: '1',
              color: 'red',
            },
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
    // Remove invariant from production code. We use it for dev only.
    if (process.env.NODE_ENV !== 'production')
      invariant(typeData != null, 'typeData must not be null');

    switch (node.type) {
      case 'style': {
        console.log(typeData);
        // musim ze stylu nacist real style, to je imho must
        // treba kesovat
        // zjistit, co mam renderovat
        // overit, ze zmena data vyvola rerender, co imho udela
        return <Text {...attributes}>{children}</Text>;

        // const { id } = typeData;
        // const { style, isText } = this.getStyle(id);
        // const NodeComponent = isText ? Text : View;
        // return (
        //   <NodeComponent {...attributes} style={style}>
        //     {children}
        //   </NodeComponent>
        // );
      }
      default:
        return next();
    }
  };

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
          // ref={this.editorRef}
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
