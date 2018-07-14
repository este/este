// @flow
import * as React from 'react';
import { TextInput } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import { injectIntl, defineMessages, type IntlShape } from 'react-intl';
import throttle from 'lodash/throttle';
import { onChangeTextThrottle } from '../core/TextInput';
import withMutation, { type Commit } from '../core/withMutation';
import withClientMutation, {
  type ClientCommit,
} from '../core/withClientMutation';
import { graphql } from 'react-relay';
import * as generated from './__generated__/PostTextMutation.graphql';
import { pipe } from 'ramda';

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
  text: ?string,
  clientText: ?string,
  theme: Theme,
  intl: IntlShape,
  id: string,
  commit: Commit<
    generated.SetPostTextInput,
    generated.PostTextMutationResponse,
  >,
  clientCommit: ClientCommit,
  disabled?: boolean,
  onSelectionChange?: (selection: Selection) => void,
|};

type PostTextState = {|
  selection: Selection,
|};

class PostText extends React.PureComponent<PostTextProps, PostTextState> {
  handleOnChangeTextThrottled = throttle(text => {
    const input = {
      id: this.props.id,
      text,
    };
    this.props.commit(input);
  }, onChangeTextThrottle);

  inputRef = React.createRef();

  state = {
    selection: {
      start: this.getDisplayText().length,
      end: this.getDisplayText().length,
    },
  };

  componentDidMount() {
    this.adjustHeight();
  }

  componentDidUpdate(prevProps) {
    if (this.getDisplayText() !== this.getDisplayText(prevProps)) {
      this.adjustHeight();
    }
  }

  getDisplayText(props = this.props) {
    if (props.clientText != null) return props.clientText;
    return props.text || '';
  }

  handleTextInputChangeText = (text: string) => {
    this.props.clientCommit(store => {
      const record = store.get(this.props.id);
      if (!record) return;
      record.setValue(text, 'clientText');
    });
    this.handleOnChangeTextThrottled(text);
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
        value={this.getDisplayText()}
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

export default pipe(
  injectIntl,
  withTheme,
  withClientMutation,
  withMutation(graphql`
    mutation PostTextMutation($input: SetPostTextInput!) {
      setPostText(input: $input) {
        post {
          id
          text
        }
      }
    }
  `),
)(PostText);
