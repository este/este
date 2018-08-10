// @flow
import * as React from 'react';
import { TextInput } from 'react-native';
import withTheme, { type Theme } from './core/withTheme';
import { pipe } from 'ramda';

type PostTextActionsLinkProps = {|
  theme: Theme,
  onClose: (focusEditor: ?boolean) => void,
  onSubmit: (href: string) => void,
|};

type PostTextActionsLinkState = {|
  text: string,
|};

class PostTextActionsLink extends React.PureComponent<
  PostTextActionsLinkProps,
  PostTextActionsLinkState,
> {
  state = {
    text: '',
  };

  handleTextInputBlur = () => {
    this.props.onClose();
  };

  handleTextInputChangeText = (text: string) => {
    this.setState({ text });
  };

  handleTextInputSubmitEditing = () => {
    const text = this.state.text.trim();
    if (text.length === 0) {
      this.props.onClose(true);
    } else {
      this.props.onSubmit(text);
    }
  };

  render() {
    const { theme } = this.props;
    const { text } = this.state;
    return (
      <TextInput
        autoFocus
        onBlur={this.handleTextInputBlur}
        onChangeText={this.handleTextInputChangeText}
        keyboardType="url"
        value={text}
        onSubmitEditing={this.handleTextInputSubmitEditing}
        style={[
          theme.styles.postTextActionsLink,
          theme.typography.fontSizeWithLineHeight(-1),
        ]}
        blurOnSubmit={false}
        placeholder="example.com"
      />
    );
  }
}

export default pipe(withTheme)(PostTextActionsLink);
