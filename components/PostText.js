// @flow
import * as React from 'react';
import { TextInput } from 'react-native';
import withTheme, { type Theme } from './core/withTheme';
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

export const messages = defineMessages({
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

type PostTextProps = {|
  data: generated.PostText,
  theme: Theme,
  intl: IntlShape,
  commit: SetPostTextCommit,
  store: Store,
  disabled?: boolean,
|};

class PostText extends React.PureComponent<PostTextProps> {
  throttleCommit = throttle(text => {
    const input = {
      id: this.props.data.id,
      text,
    };
    this.props.commit(input);
  }, onChangeTextThrottle);

  inputRef = React.createRef();

  componentDidMount() {
    this.adjustHeight();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.draftText !== prevProps.data.draftText) {
      this.adjustHeight();
      // Commit belongs to componentDidUpdate because it's reliable.
      // https://github.com/necolas/react-native-web/issues/1031
      this.throttleCommit(this.props.data.draftText);
    }
  }

  handleTextInputChangeText = (text: string) => {
    this.props.store(store => {
      const record = store.get(this.props.data.id);
      if (!record) return;
      record.setValue(text, 'draftText');
    });
  };

  handleTextInputSelectionChange = ({ nativeEvent: { selection } }) => {
    this.props.store(store => {
      const record = store.get(this.props.data.id);
      if (!record) return;
      record
        .setValue(selection.start, 'draftTextSelectionStart')
        .setValue(selection.end, 'draftTextSelectionEnd');
    });
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
    const { data, theme, intl } = this.props;
    return (
      <TextInput
        multiline
        value={data.draftText}
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
        selection={{
          start: data.draftTextSelectionStart,
          end: data.draftTextSelectionEnd,
        }}
      />
    );
  }
}

export default createFragmentContainer(
  pipe(
    injectIntl,
    withTheme,
    withStore,
    withMutation(SetPostTextMutation),
  )(PostText),
  // https://github.com/relayjs/eslint-plugin-relay/issues/35
  // eslint-disable-next-line relay/unused-fields
  graphql`
    fragment PostText on Post {
      id
      # @__clientField works as expected, draftText is set, but text field is
      # set to undefined for some reason.
      # https://github.com/facebook/relay/issues/2488
      text @__clientField(handle: "draft")
      # With text_ alias, we can get the original value.
      # We are not using it yet, but it's handy for saving state detection.
      # const unsaved = text_ !== draftText
      # text_: text
      draftText
      draftTextSelectionStart
      draftTextSelectionEnd
    }
  `,
);
