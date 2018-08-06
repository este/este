// @flow
import * as React from 'react';
import { View, TextInput } from 'react-native';
import withTheme, { type Theme } from './core/withTheme';
import { pipe } from 'ramda';

type LinkProps = {|
  theme: Theme,
  onCancel: (focusEditor: ?boolean) => void,
  onSubmit: (href: string) => void,
|};

type LinkState = {|
  text: string,
|};

class Link extends React.PureComponent<LinkProps, LinkState> {
  state = {
    text: '',
  };

  handleTextInputBlur = () => {
    this.props.onCancel();
  };

  handleTextInputChangeText = (text: string) => {
    this.setState({ text });
  };

  handleTextInputSubmitEditing = () => {
    const text = this.state.text.trim();
    if (text.length === 0) {
      this.props.onCancel(true);
    } else {
      this.props.onSubmit(text);
    }
  };

  render() {
    const { theme } = this.props;
    const { text } = this.state;
    return (
      <View>
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
      </View>
    );
  }
}

export default pipe(withTheme)(Link);
