// @flow
// $FlowFixMe
import React, { memo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import useTheme from '../core/useTheme';
import Button from '../core/Button';
import Row from '../core/Row';
import withRovingTabIndex from '../core/withRovingTabIndex';

function EditorBreadcrumbButton({
  onPress,
  label,
  isActive,
}: {|
  onPress: () => void,
  label: string,
  isActive?: boolean,
|}) {
  function handlePressIn(event) {
    event.preventDefault();
    onPress();
  }
  return (
    <Button
      onPressIn={handlePressIn}
      color={isActive === true ? 'primary' : 'gray'}
    >
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  breadcrumb: {
    // RNW does not support position fixed style, because it's a workaround.
    // https://github.com/este/este/issues/1584
    // $FlowFixMe
    position: 'fixed',
  },
  bottom: { bottom: 0 },
  top: { top: 0 },
});

function EditorBreadcrumb({
  document,
  focusPath,
  stylesById,
}: {|
  document: Object,
  focusPath: Object,
  stylesById: Object,
|}) {
  const theme = useTheme();
  const [kebabMenuVisible, setKebabMenuVisible] = useState(false);
  const [breadcrumbPosition, setBreadcrumbPosition] = useState('bottom');
  const [activeNode, setActiveNode] = useState(null);

  // Remove first item (Slate document). We don't use it for styling etc.
  const ancestors = document.getAncestors(focusPath).shift();

  function handleKebabButtonPress() {
    setKebabMenuVisible(!kebabMenuVisible);
  }

  function handlePositionButtonPress() {
    setBreadcrumbPosition(breadcrumbPosition === 'bottom' ? 'top' : 'bottom');
  }

  function handleBreadcrumbItemPress(node) {
    return () => setActiveNode(activeNode === node ? null : node);
  }

  return (
    <View
      style={[
        theme.styles.editorBreadcrumb,
        styles.breadcrumb,
        styles[breadcrumbPosition],
      ]}
    >
      <Row rhythm={0.5} wrap>
        <EditorBreadcrumbButton
          label="⋮"
          isActive={kebabMenuVisible}
          onPress={handleKebabButtonPress}
        />
        {kebabMenuVisible ? (
          <EditorBreadcrumbButton
            label={breadcrumbPosition === 'bottom' ? '↑' : '↓'}
            onPress={handlePositionButtonPress}
          />
        ) : (
          ancestors.map(node => {
            return (
              <EditorBreadcrumbButton
                key={node.key}
                label={stylesById[node.type].name}
                isActive={activeNode === node}
                onPress={handleBreadcrumbItemPress(node)}
              />
            );
          })
        )}
      </Row>
    </View>
  );
}

export default memo(withRovingTabIndex(EditorBreadcrumb));

// import * as React from 'react';
// import { View } from 'react-native';
// import withTheme, { type Theme } from '../core/withTheme';
// import Row from '../core/Row';
// import EditorBreadcrumbButton from './EditorBreadcrumbButton';
// import EditorBreadcrumbItem from './EditorBreadcrumbItem';
// import EditorBreadcrumbOutline from './EditorBreadcrumbOutline';
// import EditorBreadcrumbDetail from './EditorBreadcrumbDetail';
// import { pipe } from 'ramda';
// import withRovingTabIndex from '../core/withRovingTabIndex';
// // import type { OnEditorAction } from './Editor';
// type OnEditorAction = any;
//
// type EditorBreadcrumbProps = {|
//   document: Object,
//   // String, to leverage pure shouldComponentUpdate.
//   focusPathString: string,
//   theme: Theme,
//   onEditorAction: OnEditorAction,
// |};
//
// export type VerticalPosition = 'bottom' | 'top';
//
// type EditorBreadcrumbState = {|
//   activeIndex: ?number,
//   verticalPosition: VerticalPosition,
//   kebabMenuShown: boolean,
// |};
//
// class EditorBreadcrumb extends React.PureComponent<
//   EditorBreadcrumbProps,
//   EditorBreadcrumbState,
// > {
//   static fixedPositionStyle = { position: 'fixed' };
//
//   state = {
//     activeIndex: null,
//     verticalPosition: 'bottom',
//     kebabMenuShown: false,
//   };
//
//   handleButtonPress = activeIndex => {
//     this.setState(state => {
//       return {
//         activeIndex: state.activeIndex === activeIndex ? null : activeIndex,
//       };
//     });
//   };
//
//   handleToggleVerticalPosition = (event: Event) => {
//     event.preventDefault();
//     this.setState(state => {
//       return {
//         verticalPosition: state.verticalPosition === 'top' ? 'bottom' : 'top',
//       };
//     });
//   };
//
//   handleKebabPress = () => {
//     this.setState(state => {
//       return { kebabMenuShown: !state.kebabMenuShown };
//     });
//   };
//
//   render() {
//     const { document, focusPathString, theme } = this.props;
//     const { activeIndex, verticalPosition, kebabMenuShown } = this.state;
//     const ancestors = document.getAncestors(focusPathString.split(','));
//     const activeNode = ancestors.get(activeIndex);
//     return (
//       <View
//         style={[
//           theme.styles.editorBreadcrumb,
//           EditorBreadcrumb.fixedPositionStyle,
//           { [verticalPosition]: 0 },
//         ]}
//       >
//         <Row rhythm={0.5} wrap>
//           <EditorBreadcrumbButton
//             color={kebabMenuShown ? 'primary' : 'gray'}
//             onPress={this.handleKebabPress}
//           >
//             ⋮
//           </EditorBreadcrumbButton>
// {this.state.kebabMenuShown ? (
//   <EditorBreadcrumbButton onPress={this.handleToggleVerticalPosition}>
//     {verticalPosition === 'bottom' ? '↑' : '↓'}
//   </EditorBreadcrumbButton>
// ) : (
//   ancestors.map((node, index) => (
//     <EditorBreadcrumbItem
//       node={node}
//       index={index}
//       key={node.key}
//       onPress={this.handleButtonPress}
//       isActive={activeIndex === index}
//     />
//   ))
// )}
//         </Row>
//         {activeNode != null && (
//           <>
//             <EditorBreadcrumbDetail
//               node={activeNode}
//               onEditorAction={this.props.onEditorAction}
//             />
//             <EditorBreadcrumbOutline node={activeNode} />
//           </>
//         )}
//       </View>
//     );
//   }
// }
//
// export default pipe(
//   withRovingTabIndex,
//   withTheme,
// )(EditorBreadcrumb);
