// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from './core/withTheme';
import Row from './core/Row';
// TODO: Rethink for detail view.
// import clamp from 'lodash/clamp';
// import getFocusableNodes from '../client/getFocusableNodes';
import EditorBreadcrumbButton from './EditorBreadcrumbButton';
import EditorBreadcrumbItem from './EditorBreadcrumbItem';
import EditorBreadcrumbOutline from './EditorBreadcrumbOutline';
import EditorBreadcrumbDetail from './EditorBreadcrumbDetail';

type EditorBreadcrumbProps = {|
  // value: Object,
  document: Object,
  // String, to leverage pure shouldComponentUpdate.
  focusPathString: string,
  theme: Theme,
|};

export type VerticalPosition = 'bottom' | 'top';

type EditorBreadcrumbState = {|
  // TODO: Rethink for detail view.
  // focusIndex: number,
  activeIndex: ?number,
  verticalPosition: VerticalPosition,
  kebabMenuShown: boolean,
|};

class EditorBreadcrumb extends React.PureComponent<
  EditorBreadcrumbProps,
  EditorBreadcrumbState,
> {
  static fixedPositionStyle = { position: 'fixed' };

  state = {
    // TODO: Rethink for detail view.
    // focusIndex: 0,
    activeIndex: null,
    verticalPosition: 'bottom',
    kebabMenuShown: false,
  };

  // TODO: Rethink for detail view.
  // componentDidMount() {
  //   this.updateTabIndexesDirectly();
  // }
  //
  // TODO: Rethink for detail view.
  // componentDidUpdate() {
  //   this.updateTabIndexesDirectly();
  // }

  handleButtonPress = activeIndex => {
    this.setState(state => {
      return {
        activeIndex: state.activeIndex === activeIndex ? null : activeIndex,
      };
    });
  };

  // TODO: Rethink for detail view.
  handleButtonFocus = (/* focusIndex */) => {
    // this.setState({ focusIndex });
  };

  // TODO: Rethink for detail view.
  // handleViewKeyDown = (event: KeyboardEvent) => {
  //   const isLeftRightArrow =
  //     event.key === 'ArrowLeft' || event.key === 'ArrowRight';
  //   if (!isLeftRightArrow) return;
  //   const els = getFocusableNodes(this);
  //   const offset = event.key === 'ArrowRight' ? 1 : -1;
  //   const index = clamp(this.state.focusIndex + offset, 0, els.length - 1);
  //   const el = els[index];
  //   if (el == null) return;
  //   el.focus();
  // };

  handleToggleVerticalPosition = (event: Event) => {
    event.preventDefault();
    this.setState(state => {
      return {
        kebabMenuShown: false,
        verticalPosition: state.verticalPosition === 'top' ? 'bottom' : 'top',
      };
    });
  };

  handleKebabPress = () => {
    this.setState(state => {
      return { kebabMenuShown: !state.kebabMenuShown };
    });
  };

  // TODO: Rethink for detail view.
  // // Handle tabIndex and focus directly without React. It's easier to implement.
  // updateTabIndexesDirectly() {
  //   const els = getFocusableNodes(this);
  //   const focusIndex = clamp(this.state.focusIndex, 0, els.length - 1);
  //   els.forEach((el, index) => {
  //     // eslint-disable-next-line no-param-reassign
  //     el.tabIndex = focusIndex === index ? 0 : -1;
  //   });
  // }

  render() {
    const { document, focusPathString, theme } = this.props;
    const { activeIndex, verticalPosition, kebabMenuShown } = this.state;
    const ancestors = document.getAncestors(focusPathString.split(','));
    const activeNode = ancestors.get(activeIndex);
    return (
      <View
        style={[
          theme.styles.editorBreadcrumb,
          EditorBreadcrumb.fixedPositionStyle,
          { [verticalPosition]: 0 },
        ]}
        // TODO: Rethink for detail view.
        // onKeyDown={this.handleViewKeyDown}
      >
        <Row rhythm={0.5}>
          <EditorBreadcrumbButton
            color={kebabMenuShown ? 'primary' : 'gray'}
            onPress={this.handleKebabPress}
          >
            ⋮
          </EditorBreadcrumbButton>
          {this.state.kebabMenuShown ? (
            <EditorBreadcrumbButton onPress={this.handleToggleVerticalPosition}>
              {verticalPosition === 'bottom' ? '↑' : '↓'}
            </EditorBreadcrumbButton>
          ) : (
            ancestors.map((node, index) => (
              <EditorBreadcrumbItem
                node={node}
                index={index}
                key={node.key}
                onPress={this.handleButtonPress}
                onFocus={this.handleButtonFocus}
                isActive={activeIndex === index}
              />
            ))
          )}
        </Row>
        {activeNode != null && (
          <>
            <EditorBreadcrumbDetail node={activeNode} />
            <EditorBreadcrumbOutline node={activeNode} />
          </>
        )}
      </View>
    );
  }
}

export default withTheme(EditorBreadcrumb);
