// @flow
/* eslint-env browser */
import * as React from 'react';
import { injectIntl, defineMessages, type IntlShape } from 'react-intl';
import throttle from 'lodash/throttle';
import { onChangeTextThrottle } from './core/TextInput';
import withMutation from './core/withMutation';
import withStore, { type Store } from './core/withStore';
import { pipe } from 'ramda';
import SetPostTextMutation, {
  type SetPostTextCommit,
} from '../mutations/SetPostTextMutation';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/PostText.graphql';
import { Editor } from 'slate-react';
import { Value, resetKeyGenerator } from 'slate';
import Block from './core/Block';
import Text from './core/Text';
import { View, findNodeHandle } from 'react-native';
import PostTextMenu from './PostTextMenu';

export const messages = defineMessages({
  placeholder: {
    defaultMessage: 'write',
    id: 'postText.textInput.placeholder',
  },
});

const schema = {
  document: {
    nodes: [{ types: ['paragraph'] }],
  },
  blocks: {
    paragraph: {
      nodes: [{ objects: ['text'] }],
    },
  },
};

const emptyText = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '',
              },
            ],
          },
        ],
      },
    ],
  },
};

type PostTextProps = {|
  data: generated.PostText,
  intl: IntlShape,
  commit: SetPostTextCommit,
  store: Store,
  disabled?: boolean,
|};

type PostTextState = {|
  value: Object,
  menuPosition: ?[number, number],
|};

class PostText extends React.PureComponent<PostTextProps, PostTextState> {
  throttleCommit = throttle(text => {
    const input = {
      id: this.props.data.id,
      text,
    };
    this.props.commit(input);
  }, onChangeTextThrottle);

  viewRef = React.createRef();
  editorRef = React.createRef();

  constructor(props) {
    super(props);
    const { text } = this.props.data;
    const json = text == null ? emptyText : JSON.parse(text);
    // https://docs.slatejs.org/slate-core/utils-1#resetkeygenerator
    resetKeyGenerator();
    const value = Value.fromJSON(json);
    this.state = { value, menuPosition: null };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      // I suppose it's OK. It properly sets menuPosition on focus.
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(state => {
        const menuPosition = this.getMenuPosition(state.value);
        if (!menuPosition) return;
        return { menuPosition };
      });
    }
  }

  static getSelectionRect() {
    return window
      .getSelection()
      .getRangeAt(0)
      .getBoundingClientRect();
  }

  getMenuPosition(value) {
    // isBlurred is must, otherwise getSelectionRect will fail.
    const hideMenu = value.isBlurred || value.isEmpty;
    if (hideMenu) return null;
    const { current } = this.viewRef;
    if (!current) return null;
    const node = findNodeHandle(current);
    if (
      node == null ||
      typeof node === 'number' ||
      typeof node.getBoundingClientRect !== 'function'
    ) {
      return null;
    }
    const viewRect = node.getBoundingClientRect();
    const selectionRect = PostText.getSelectionRect();
    const left = selectionRect.left - viewRect.left;
    const top = selectionRect.bottom - viewRect.top;
    return [left, top];
  }

  handleViewKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      // It's ok imho. It's just a selection.
      // https://docs.slatejs.org/guides/changes#4-from-outside-slate
      this.setState(state => ({
        value: state.value
          .change()
          .collapseToStart()
          .focus().value,
      }));
    }
  };

  handleEditorChange = ({ value }) => {
    this.setState({ value });
    if (value.document !== this.state.value.document) {
      const text = JSON.stringify(value.toJSON());
      this.throttleCommit(text);
    }
  };

  handleEditorFocus = (event, change) => {
    // https://github.com/ianstormtaylor/slate/issues/1989
    change.focus();
  };

  renderNode = props => {
    switch (props.node.type) {
      case 'paragraph':
        return (
          <Block>
            <Text {...props.attributes}>{props.children}</Text>
          </Block>
        );
    }
  };

  render() {
    return (
      <View ref={this.viewRef} onKeyDown={this.handleViewKeyDown}>
        <Editor
          ref={this.editorRef}
          // autoFocus
          value={this.state.value}
          onChange={this.handleEditorChange}
          renderNode={this.renderNode}
          placeholder={this.props.intl.formatMessage(messages.placeholder)}
          schema={schema}
          onFocus={this.handleEditorFocus}
        />
        {!this.state.value.isEmpty && (
          <PostTextMenu
            value={this.state.value}
            position={this.state.menuPosition}
          />
        )}
      </View>
    );
  }
}

export default createFragmentContainer(
  pipe(
    injectIntl,
    withStore,
    withMutation(SetPostTextMutation),
  )(PostText),
  graphql`
    fragment PostText on Post {
      id
      text
    }
  `,
);
