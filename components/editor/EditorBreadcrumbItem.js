// @flow
import * as React from 'react';
import EditorBreadcrumbButton from './EditorBreadcrumbButton';

type Node = {|
  object: string,
  type: string,
  // TODO: Immutable Map.
  data: { get: string => string },
|};

type EditorBreadcrumbItemProps = {|
  node: Node,
  index: number,
  onPress: (index: number) => void,
  isActive: boolean,
|};

class EditorBreadcrumbItem extends React.PureComponent<
  EditorBreadcrumbItemProps,
> {
  handlePress = () => {
    this.props.onPress(this.props.index);
  };

  render() {
    const { node, isActive } = this.props;
    return (
      <EditorBreadcrumbButton
        color={isActive ? 'primary' : 'gray'}
        onPress={this.handlePress}
      >
        {node.object}
        {node.type}
        {/* {node.data.style.name} */}
      </EditorBreadcrumbButton>
    );
  }
}

export default EditorBreadcrumbItem;
