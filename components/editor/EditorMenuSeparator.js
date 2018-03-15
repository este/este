// @flow
import * as React from 'react';
import { menuPadding, editorMenuItemProps } from './EditorMenu';
import Text from '../core/Text';

type EditorMenuSeparatorProps = {|
  type?: 'descendant' | 'sibling',
|};

class EditorMenuSeparator extends React.PureComponent<
  EditorMenuSeparatorProps,
> {
  render() {
    const { type = 'descendant' } = this.props;
    return (
      <Text
        {...editorMenuItemProps}
        color="gray"
        marginVertical={menuPadding}
        marginHorizontal={0.25}
      >
        {{ descendant: '▸', sibling: '|' }[type]}
      </Text>
    );
  }
}

export default EditorMenuSeparator;
