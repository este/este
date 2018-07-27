// @flow
import * as React from 'react';
import { View } from 'react-native';
import Button from './core/Button';

type SlateObject = Object;

type PostTextMenuProps = {|
  value: SlateObject,
  position: ?[number, number],
|};

type PostTextMenuState = {|
  hasFocus: boolean,
|};

class PostTextMenu extends React.PureComponent<
  PostTextMenuProps,
  PostTextMenuState,
> {
  state = {
    hasFocus: false,
  };
  handleViewFocus = () => {
    this.setState({ hasFocus: true });
  };

  handleViewBlur = () => {
    this.setState({ hasFocus: false });
  };

  render() {
    const { value, position } = this.props;
    if (!position || value.isEmpty) return null;
    const [left, top] = position;
    // Opacity 0, so element is still tabable.
    const opacity = value.isBlurred && !this.state.hasFocus ? 0 : 1;
    return (
      <View
        style={{
          position: 'absolute',
          width: 100,
          height: 20,
          backgroundColor: 'red',
          left,
          top,
          opacity,
        }}
        onFocus={this.handleViewFocus}
        onBlur={this.handleViewBlur}
      >
        <Button>—</Button>
      </View>
    );
  }
}

export default PostTextMenu;
