// @flow
import * as React from 'react';
import { View } from 'react-native';
import Button from './core/Button';

type SlateObject = Object;

type PostTextMenuProps = {|
  value: SlateObject,
  position: ?[number, number],
|};

class PostTextMenu extends React.PureComponent<PostTextMenuProps> {
  render() {
    const { position } = this.props;
    if (!position) return null;
    const [left, top] = position;
    return (
      <View
        style={{
          position: 'absolute',
          width: 100,
          height: 20,
          backgroundColor: 'red',
          left,
          top,
        }}
      >
        <Button>—</Button>
      </View>
    );
  }
}

export default PostTextMenu;
