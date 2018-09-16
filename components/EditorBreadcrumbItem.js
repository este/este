// @flow
import * as React from 'react';
import EditorBreadcrumbButton from './EditorBreadcrumbButton';
import type { NodeType } from './Editor';

type Node = {|
  object: string,
  type: NodeType,
  // TODO: Immutable Map.
  data: { get: string => string },
|};

type EditorBreadcrumbItemProps = {|
  node: Node,
  index: number,
  onFocus: (index: number) => void,
  onPress: (index: number) => void,
  isActive: boolean,
|};

class EditorBreadcrumbItem extends React.PureComponent<
  EditorBreadcrumbItemProps,
> {
  // TODO: Localize
  static renderLabel(node: Node) {
    if (node.object === 'document') {
      return 'document';
    }
    switch (node.type) {
      case 'paragraph':
        return 'paragraph';
      case 'headingOne':
        return 'heading 1';
      case 'headingTwo':
        return 'heading 2';
      case 'blockquote':
        return 'blockquote';
      case 'list':
        return 'list';
      case 'listItem':
        return 'item';
      case 'link':
        return 'link';
      case 'view':
        return (node.data != null && node.data.get('name')) || 'view';
      default:
        // eslint-disable-next-line no-unused-expressions
        (node.type: empty);
    }
  }

  handlePress = () => {
    this.props.onPress(this.props.index);
  };

  handleFocus = () => {
    this.props.onFocus(this.props.index);
  };

  render() {
    const { node, isActive } = this.props;
    return (
      <EditorBreadcrumbButton
        color={isActive ? 'primary' : 'gray'}
        onPress={this.handlePress}
        onFocus={this.handleFocus}
      >
        {EditorBreadcrumbItem.renderLabel(node)}
      </EditorBreadcrumbButton>
    );
  }
}

export default EditorBreadcrumbItem;
