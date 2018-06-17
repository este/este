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
  focused: boolean,
  hovered: boolean,
};

class EditorMarkdownActionsButton extends React.PureComponent<
  EditorMarkdownActionsButtonProps,
  EditorMarkdownActionsButtonState,
> {
  state = {
    focused: false,
    hovered: false,
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = () => {
    this.setState({ focused: false });
  };

  handleMouseEnter = () => {
    this.setState({ hovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ hovered: false });
  };

  render() {
    const { focused, hovered } = this.state;
    const color = focused || hovered ? 'primary' : 'gray';
    return (
      <Button
        inline
        bold={false}
        color={color}
        touchableStyle={styles.button}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...this.props}
      />
    );
  }
}

export default EditorMarkdownActionsButton;
