// @flow
import * as React from 'react';
import { View } from 'react-native';
import Button from './core/Button';

type PostTextAction = {| type: 'ESCAPE' |};

type SlateObject = Object;

type PostTextActionsProps = {|
  value: SlateObject,
  position: ?[number, number],
  onAction: (action: PostTextAction) => void,
|};

type PostTextActionsState = {|
  hasFocus: boolean,
|};

class PostTextActions extends React.PureComponent<
  PostTextActionsProps,
  PostTextActionsState,
> {
  state = {
    hasFocus: false,
  };

  handleViewKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.props.onAction({ type: 'ESCAPE' });
    }
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
        onKeyDown={this.handleViewKeyDown}
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

export default PostTextActions;
