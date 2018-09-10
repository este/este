// @flow
import * as React from 'react';
import { View } from 'react-native';
import Button from './core/Button';
import withTheme, { type Theme } from './core/withTheme';
// import Text from './core/Text';
import Spacer from './core/Spacer';
import type { NodeType } from './Editor';
import clamp from 'lodash/clamp';
import getFocusableNodes from '../client/getFocusableNodes';

type Node = {|
  object: string,
  type: NodeType,
|};

type BreadcrumbButtonProps = {|
  node: Node,
  index: number,
  onFocus: (index: number) => void,
|};

type BreadcrumbButtonState = {|
  active: boolean,
|};

class BreadcrumbButton extends React.PureComponent<
  BreadcrumbButtonProps,
  BreadcrumbButtonState,
> {
  // TODO: Localize
  static renderLabel(node) {
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

  // handlePress = event => {
  //   // console.log(event.key);
  //   // console.log('f');
  // };

  handleFocus = () => {
    this.props.onFocus(this.props.index);
  };

  render() {
    const { node } = this.props;
    return (
      <Button
        color="gray"
        // onPress={this.handlePress}
        onFocus={this.handleFocus}
      >
        {BreadcrumbButton.renderLabel(node)}
      </Button>
    );
  }
}

type EditorBreadcrumbProps = {|
  // value: Object,
  document: Object,
  // String, to leverage pure shouldComponentUpdate.
  focusPathString: string,
  theme: Theme,
|};

type EditorBreadcrumbState = {|
  focusIndex: number,
|};

class EditorBreadcrumb extends React.PureComponent<
  EditorBreadcrumbProps,
  EditorBreadcrumbState,
> {
  state = {
    focusIndex: 0,
  };

  componentDidMount() {
    this.updateTabIndexesDirectly();
  }

  componentDidUpdate() {
    this.updateTabIndexesDirectly();
  }

  handleButtonFocus = index => {
    this.setState({ focusIndex: index });
  };

  handleViewKeyDown = event => {
    const isLeftRightArrow =
      event.key === 'ArrowLeft' || event.key === 'ArrowRight';
    if (!isLeftRightArrow) return;
    const els = getFocusableNodes(this);
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const index = clamp(this.state.focusIndex + offset, 0, els.length - 1);
    const el = els[index];
    if (el == null) return;
    el.focus();
  };

  // Handle tabIndex and focus directly without React. It's easier to implement.
  updateTabIndexesDirectly() {
    const els = getFocusableNodes(this);
    const focusIndex = clamp(this.state.focusIndex, 0, els.length - 1);
    els.forEach((el, index) => {
      // eslint-disable-next-line no-param-reassign
      el.tabIndex = focusIndex === index ? 0 : -1;
    });
  }

  render() {
    const { document, focusPathString, theme } = this.props;
    const ancestors = document.getAncestors(focusPathString.split(','));
    return (
      <View
        style={theme.styles.editorBreadcrumb}
        onKeyDown={this.handleViewKeyDown}
      >
        <Spacer rhythm={0.5}>
          {ancestors.map((node, index) => (
            <BreadcrumbButton
              node={node}
              index={index}
              key={node.key}
              onFocus={this.handleButtonFocus}
            />
          ))}
        </Spacer>
      </View>
    );
  }
}

export default withTheme(EditorBreadcrumb);
