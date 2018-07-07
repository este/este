// @flow
import * as React from 'react';
import { TextInput } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import { injectIntl, defineMessages, type IntlShape } from 'react-intl';
import PostMarkdownActions from './PostMarkdownActions';
import throttle from 'lodash/throttle';
import { onChangeTextThrottle } from '../core/TextInput';
import withMutation, { type Commit } from '../core/withMutation';
import { graphql } from 'react-relay';
import * as generated from './__generated__/PostMarkdownMutation.graphql';

const messages = defineMessages({
  placeholder: {
    defaultMessage: 'write',
    id: 'postMarkdown.textInput.placeholder',
  },
  // TODO: [Home](/) | [About](/)
  example: {
    defaultMessage: `
# Example

Markdown is a simple way to *format* text that looks **great** on any device.

* List
* List

1. One
2. Two

> Blockquote

made by [steida](https://twitter.com/steida)
`,
    id: 'postMarkdown.textInput.example',
  },
});

type PostMarkdownProps = {|
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  // tldr: For any piece of data, you need to pick a single component that owns
  // it as the source of truth, and avoid duplicating it in other components.
  // In the other words, it's the old "The single responsibility principle".
  defaultValue: string,
  theme: Theme,
  intl: IntlShape,
  id: string,
  commit: Commit<
    generated.SetPostContentTextInput,
    generated.PostMarkdownMutationResponse,
  >,
|};

type PostMarkdownState = {|
  selection: { start: number, end: number },
  actionsAreExpanded: boolean,
  value: string,
|};

class PostMarkdown extends React.PureComponent<
  PostMarkdownProps,
  PostMarkdownState,
> {
  inputRef = React.createRef();
  actionsRef = React.createRef();

  handleOnChangeTextThrottled = throttle(value => {
    const input = {
      id: this.props.id,
      contentText: value,
    };
    this.props.commit(input);
  }, onChangeTextThrottle);

  state = {
    selection: {
      start: this.props.defaultValue.length,
      end: this.props.defaultValue.length,
    },
    actionsAreExpanded: false,
    value: this.props.defaultValue,
  };

  componentDidMount() {
    this.adjustHeight();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.value !== this.state.value) {
      this.adjustHeight();
    }
  }

  handleTextInputChangeText = value => {
    this.setState({ value }, () => {
      this.adjustHeight();
    });
    this.handleOnChangeTextThrottled(value);
  };

  handleTextInputSelectionChange = ({ nativeEvent: { selection } }) => {
    this.setState({ selection });
  };

  handleTextInputFocus = () => {
    this.setState({ actionsAreExpanded: false });
  };

  handleActionsToggle = () => {
    this.setState(
      prevState => ({
        actionsAreExpanded: !prevState.actionsAreExpanded,
      }),
      () => {
        const { current } = this.actionsRef;
        if (!current) return;
        current.focusFirstIfExpanded();
      },
    );
  };

  focusTextInput = () => {
    const { current } = this.inputRef;
    if (!current || typeof current.focus !== 'function') return;
    current.focus();
  };

  handleActionsExample = () => {
    this.setState(prevState => {
      // Trim and \n for normalized lines.
      const example = this.props.intl.formatMessage(messages.example).trim();
      const value =
        prevState.value.length === 0
          ? example
          : `${prevState.value}\n${example}`;
      return { value: `${value}` };
    }, this.focusTextInput);
  };

  handleActionsReuse = () => {};

  handleActionsEscape = () => {
    this.focusTextInput();
  };

  adjustHeight() {
    const { current } = this.inputRef;
    if (!current) return;
    current.setNativeProps({
      style: { height: 0 },
    });
    current.setNativeProps({
      // eslint-disable-next-line no-underscore-dangle
      style: { height: current._node.scrollHeight },
    });
  }

  selectionIsCollapsed() {
    const { selection } = this.state;
    return selection.start === selection.end;
  }

  render() {
    const { theme, intl } = this.props;

    return (
      <>
        <TextInput
          multiline
          value={this.state.value}
          onChangeText={this.handleTextInputChangeText}
          onSelectionChange={this.handleTextInputSelectionChange}
          onFocus={this.handleTextInputFocus}
          placeholderTextColor={theme.placeholderTextColor}
          placeholder={intl.formatMessage(messages.placeholder)}
          ref={this.inputRef}
          // https://github.com/facebook/draft-js/issues/616#issuecomment-343596615
          // It breaks tab navigation.
          data-enable-grammarly="false"
          style={[
            theme.styles.postMarkdownTextInput,
            theme.typography.fontSizeWithLineHeight(0),
          ]}
          selection={this.state.selection}
        />
        <PostMarkdownActions
          expanded={this.state.actionsAreExpanded}
          selectionIsCollapsed={this.selectionIsCollapsed()}
          ref={this.actionsRef}
          onToggle={this.handleActionsToggle}
          onExample={this.handleActionsExample}
          onReuse={this.handleActionsReuse}
          onEscape={this.handleActionsEscape}
        />
      </>
    );
  }
}

export default withMutation(
  withTheme(injectIntl(PostMarkdown)),
  graphql`
    mutation PostMarkdownMutation($input: SetPostContentTextInput!) {
      setPostContentText(input: $input) {
        post {
          id
          contentText
        }
      }
    }
  `,
);
