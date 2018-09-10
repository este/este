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
  onPress: (index: number) => void,
  isActive: boolean,
|};

class BreadcrumbButton extends React.PureComponent<BreadcrumbButtonProps> {
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

  handlePress = () => {
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
  activeIndex: ?number,
|};

class EditorBreadcrumb extends React.PureComponent<
  EditorBreadcrumbProps,
  EditorBreadcrumbState,
> {
  state = {
    focusIndex: 0,
    activeIndex: null,
  };

  componentDidMount() {
    this.updateTabIndexesDirectly();
  }

  componentDidUpdate() {
    this.updateTabIndexesDirectly();
  }

  handleButtonPress = activeIndex => {
    this.setState(state => {
      return {
        activeIndex: state.activeIndex === activeIndex ? null : activeIndex,
      };
    });
  };

  handleButtonFocus = focusIndex => {
    this.setState({ focusIndex });
  };

  handleViewKeyDown = (event: KeyboardEvent) => {
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
              onPress={this.handleButtonPress}
              onFocus={this.handleButtonFocus}
              isActive={this.state.activeIndex === index}
            />
          ))}
        </Spacer>
      </View>
    );
  }
}

export default withTheme(EditorBreadcrumb);
