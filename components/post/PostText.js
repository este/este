// @flow
import * as React from 'react';
import { TextInput } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import { injectIntl, defineMessages, type IntlShape } from 'react-intl';
import throttle from 'lodash/throttle';
import { onChangeTextThrottle } from '../core/TextInput';
import withMutation, { type Commit } from '../core/withMutation';
import { graphql } from 'react-relay';
import * as generated from './__generated__/PostTextMutation.graphql';

const messages = defineMessages({
  placeholder: {
    defaultMessage: 'write',
    id: 'postText.textInput.placeholder',
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
    id: 'postText.textInput.example',
  },
});

type Selection = { start: number, end: number };

type PostTextProps = {|
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
  // tldr: For any piece of data, you need to pick a single component that owns
  // it as the source of truth, and avoid duplicating it in other components.
  // In the other words, it's the old "The single responsibility principle".
  defaultValue: ?string,
  theme: Theme,
  intl: IntlShape,
  id: string,
  commit: Commit<
    generated.SetPostTextInput,
    generated.PostTextMutationResponse,
  >,
  disabled?: boolean,
  onSelectionChange?: (selection: Selection) => void,
|};

type PostTextState = {|
  selection: Selection,
  value: string,
|};

class PostText extends React.PureComponent<PostTextProps, PostTextState> {
  handleOnChangeTextThrottled = throttle(value => {
    const input = {
      id: this.props.id,
      text: value,
    };
    this.props.commit(input);
  }, onChangeTextThrottle);

  inputRef = React.createRef();

  constructor(props) {
    super(props);
    const value = this.props.defaultValue || '';
    this.state = {
      selection: {
        start: value.length,
        end: value.length,
      },
      value,
    };
  }

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
    const { onSelectionChange } = this.props;
    if (onSelectionChange) onSelectionChange(selection);
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

  render() {
    const { theme, intl } = this.props;

    return (
      <TextInput
        multiline
        value={this.state.value}
        onChangeText={this.handleTextInputChangeText}
        onSelectionChange={this.handleTextInputSelectionChange}
        placeholderTextColor={theme.placeholderTextColor}
        placeholder={intl.formatMessage(messages.placeholder)}
        ref={this.inputRef}
        // https://github.com/facebook/draft-js/issues/616#issuecomment-343596615
        // It breaks tab navigation.
        // TODO: Maybe we don't need it anymore. Grammarly is nice to have.
        // Update1: Still required.
        data-enable-grammarly="false"
        style={[
          theme.styles.postTextTextInput,
          theme.typography.fontSizeWithLineHeight(0),
          this.props.disabled === true && theme.styles.stateDisabled,
        ]}
        selection={this.state.selection}
      />
    );
  }
}

export default withMutation(
  withTheme(injectIntl(PostText)),
  graphql`
    mutation PostTextMutation($input: SetPostTextInput!) {
      setPostText(input: $input) {
        post {
          id
          text
        }
      }
    }
  `,
);
