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
import { Value, KeyUtils } from 'slate';
import Block from './core/Block';
import Text from './core/Text';
import { View, findNodeHandle } from 'react-native';
import PostTextActions, { type PostTextAction } from './PostTextActions';
import isURL from 'validator/lib/isURL';
import { isKeyHotkey } from 'is-hotkey';

export const messages = defineMessages({
  placeholder: {
    defaultMessage: 'write',
    id: 'postText.textInput.placeholder',
  },
});

type BoldMark = { type: 'bold' };
type ItalicMark = { type: 'italic' };
export type Mark = BoldMark | ItalicMark;

type Schema = {
  document: Object,
  blocks: Object,
  marks: [BoldMark, ItalicMark],
};

const schema: Schema = {
  document: {
    nodes: [
      {
        match: [{ type: 'paragraph' }, { type: 'image' }],
      },
    ],
  },
  blocks: {
    paragraph: {
      nodes: [
        {
          match: { object: 'text' },
        },
      ],
    },
    image: {
      isVoid: true,
      data: {
        src: url => url && isURL(url),
      },
    },
  },
  marks: [{ type: 'bold' }, { type: 'italic' }],
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

const collapseToStartWithFocus = change => {
  change.collapseToStart().focus();
};

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');

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
    // Resets Slate's internal key generating function to its default state.
    // This is useful for server-side rendering.
    KeyUtils.resetGenerator();
    const value = Value.fromJSON(json);
    this.state = { value, menuPosition: null };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      // setState in componentDidUpdate is valid for tooltips.
      // https://reactjs.org/docs/react-component.html#componentdidmount
      this.setState(state => {
        const menuPosition = this.getMenuPosition(state.value);
        // Tab key blurs, but we still need the last menuPosition.
        if (!menuPosition) return;
        return { menuPosition };
      });
    }
  }

  getMenuPosition(value) {
    // isBlurred is must, otherwise getSelectionRect will fail.
    // isCollapsed is used instead of isEmpty as temp workaround.
    // https://github.com/ianstormtaylor/slate/issues/2004
    const hideMenu = value.isBlurred || value.isCollapsed;
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
    const selectionRect = window
      .getSelection()
      .getRangeAt(0)
      .getBoundingClientRect();
    const left = selectionRect.left - viewRect.left;
    const top = selectionRect.bottom - viewRect.top;
    return [left, top];
  }

  handleEditorFocus = (event, change) => {
    // https://github.com/ianstormtaylor/slate/issues/1989
    change.focus();
  };

  handleEditorChange = ({ value }) => {
    this.setState({ value });
    if (value.document !== this.state.value.document) {
      const text = JSON.stringify(value.toJSON());
      this.throttleCommit(text);
    }
  };

  // TODO: Merge handleEditorKeyDown and handlePostTextActionsAction somehow.

  handleEditorKeyDown = event => {
    const { current: editor } = this.editorRef;
    if (!editor) return;
    if (event.key === 'Escape') {
      editor.change(collapseToStartWithFocus);
      return;
    }

    let mark = null;
    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    }
    if (mark != null) {
      // It seems that preventDefault and return true are useless, but it's
      // used in examples. Wish it was described in docs.
      // OK, let's comment it and see.
      // event.preventDefault();
      editor.change(change => {
        change.toggleMark(mark);
      });
      // return true;
    }
  };

  handlePostTextActionsAction = (action: PostTextAction) => {
    const { current: editor } = this.editorRef;
    if (!editor) return;
    let mark = null;
    switch (action.type) {
      case 'ESCAPE':
        editor.change(collapseToStartWithFocus);
        break;
      case 'BOLD':
        mark = action.type.toLowerCase();
        break;
      case 'ITALIC':
        mark = action.type.toLowerCase();
        break;
      default:
        // eslint-disable-next-line no-unused-expressions
        (action.type: empty);
    }
    if (mark != null) {
      editor.change(change => {
        change.toggleMark(mark);
      });
    }
  };

  renderNode = props => {
    const { children, attributes } = props;
    switch (props.node.type) {
      case 'paragraph':
        return (
          <Block>
            <Text {...attributes}>{children}</Text>
          </Block>
        );
    }
  };

  renderMark = props => {
    const { children, mark, attributes } = props;
    switch (mark.type) {
      case 'bold':
        return (
          <Text bold {...attributes}>
            {children}
          </Text>
        );
      case 'italic':
        return (
          <Text italic {...attributes}>
            {children}
          </Text>
        );
    }
  };

  render() {
    return (
      <View ref={this.viewRef}>
        <Editor
          ref={this.editorRef}
          // autoFocus
          value={this.state.value}
          onChange={this.handleEditorChange}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          placeholder={this.props.intl.formatMessage(messages.placeholder)}
          schema={schema}
          onFocus={this.handleEditorFocus}
          onKeyDown={this.handleEditorKeyDown}
        />
        <PostTextActions
          value={this.state.value}
          position={this.state.menuPosition}
          onAction={this.handlePostTextActionsAction}
        />
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
