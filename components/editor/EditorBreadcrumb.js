// // @flow
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
//           {this.state.kebabMenuShown ? (
//             <EditorBreadcrumbButton onPress={this.handleToggleVerticalPosition}>
//               {verticalPosition === 'bottom' ? '↑' : '↓'}
//             </EditorBreadcrumbButton>
//           ) : (
//             ancestors.map((node, index) => (
//               <EditorBreadcrumbItem
//                 node={node}
//                 index={index}
//                 key={node.key}
//                 onPress={this.handleButtonPress}
//                 isActive={activeIndex === index}
//               />
//             ))
//           )}
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
