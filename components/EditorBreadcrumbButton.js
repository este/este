// @flow
import * as React from 'react';
import Button from './core/Button';
import type { NodeType } from './Editor';

type Node = {|
  object: string,
  type: NodeType,
|};

type EditorBreadcrumbButtonProps = {|
  node: Node,
  index: number,
  onFocus: (index: number) => void,
  onPress: (index: number) => void,
  isActive: boolean,
|};

class EditorBreadcrumbButton extends React.PureComponent<
  EditorBreadcrumbButtonProps,
> {
  // TODO: Localize
  static renderLabel(node: Node) {
    if (node.object === 'document') {
      return 'document';
    }
    const type: NodeType = node.type;
    switch (type) {
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
      default:
        // eslint-disable-next-line no-unused-expressions
        (type: empty);
    }
  }

  handlePress = (event: Event) => {
    event.preventDefault();
    this.props.onPress(this.props.index);
  };

  handleFocus = () => {
    this.props.onFocus(this.props.index);
  };

  render() {
    const { node, isActive } = this.props;
    return (
      <Button
        color={isActive ? 'primary' : 'gray'}
        onPressIn={this.handlePress}
        onFocus={this.handleFocus}
      >
        {EditorBreadcrumbButton.renderLabel(node)}
      </Button>
    );
  }
}

export default EditorBreadcrumbButton;
