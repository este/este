// @flow
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import Button, { type ButtonProps } from '../core/Button';

const styles = StyleSheet.create({
  // outline is only for the web, React Native Web supports it.
  button:
    Platform.OS === 'web'
      ? // $FlowFixMe Nothing to fix, it's ok.
        {
          outline: 'none',
        }
      : {},
});

type EditorMarkdownActionsButtonProps = {|
  ...ButtonProps,
|};

type EditorMarkdownActionsButtonState = {
  hasFocus: boolean,
};

class EditorMarkdownActionsButton extends React.PureComponent<
  EditorMarkdownActionsButtonProps,
  EditorMarkdownActionsButtonState,
> {
  state = {
    hasFocus: false,
  };

  handleFocus = () => {
    this.setState({ hasFocus: true });
  };

  handleBlur = () => {
    this.setState({ hasFocus: false });
  };

  render() {
    const maybeColor = this.state.hasFocus
      ? { color: 'primary' }
      : { color: 'gray' };
    return (
      <Button
        inline
        bold={false}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        touchableStyle={styles.button}
        {...maybeColor}
        {...this.props}
      />
    );
  }
}

export default EditorMarkdownActionsButton;
