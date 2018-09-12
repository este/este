// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from './core/withTheme';
import Spacer from './core/Spacer';
import clamp from 'lodash/clamp';
import getFocusableNodes from '../client/getFocusableNodes';
import EditorBreadcrumbButton from './EditorBreadcrumbButton';
import EditorBreadcrumbOutline from './EditorBreadcrumbOutline';

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
  static fixedPositionStyle = { position: 'fixed' };

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
    const { activeIndex } = this.state;
    const ancestors = document.getAncestors(focusPathString.split(','));
    const activeNode = ancestors.get(activeIndex);
    return (
      <View
        style={[
          theme.styles.editorBreadcrumb,
          EditorBreadcrumb.fixedPositionStyle,
        ]}
        onKeyDown={this.handleViewKeyDown}
      >
        <Spacer rhythm={0.5}>
          {ancestors.map((node, index) => (
            <EditorBreadcrumbButton
              node={node}
              index={index}
              key={node.key}
              onPress={this.handleButtonPress}
              onFocus={this.handleButtonFocus}
              isActive={activeIndex === index}
            />
          ))}
        </Spacer>
        {activeNode != null && <EditorBreadcrumbOutline node={activeNode} />}
      </View>
    );
  }
}

export default withTheme(EditorBreadcrumb);
