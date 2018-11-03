// @flow
/* eslint-env browser */
// $FlowFixMe
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import useTheme from '../core/useTheme';
import usePortal from '../core/usePortal';
import Button from '../core/Button';
import type { MarkType } from './Editor';

type EditorMenuButtonProps = {|
  children: string,
  isActive: boolean,
  onPress: () => void,
|};

function EditorMenuButton({
  children,
  isActive,
  onPress,
}: EditorMenuButtonProps) {
  const theme = useTheme();
  function handlePressIn(event) {
    event.preventDefault();
    onPress();
  }
  return (
    <Button
      onPressIn={handlePressIn}
      color={isActive ? 'success' : 'gray'}
      bold
      style={theme.styles.editorMenuButton}
    >
      {children}
    </Button>
  );
}

type MarkButtonProps = {|
  type: MarkType,
  text: string,
  activeMarks: Object,
|};

function MarkButton({ type, text, activeMarks }: MarkButtonProps) {
  function isMarkType(markType) {
    return activeMarks.some(mark => mark.type === markType);
  }
  return (
    <EditorMenuButton isActive={isMarkType(type)} onPress={() => {}}>
      {text}
    </EditorMenuButton>
  );
}

type EditorMenuProps = {|
  value: Object,
|};

export default function EditorMenu({ value }: EditorMenuProps) {
  const theme = useTheme();
  const portal = usePortal();

  const [position, setPosition] = useState(null);

  useEffect(
    () => {
      const { selection, fragment } = value;
      const hideMenu =
        selection.isBlurred || selection.isCollapsed || fragment.text === '';
      if (hideMenu) {
        setPosition(null);
        return;
      }
      const rect = window
        .getSelection()
        .getRangeAt(0)
        .getBoundingClientRect();
      const left = rect.left;
      const top = window.pageYOffset + rect.bottom;
      setPosition({ left, top });
    },
    [value],
  );

  if (portal == null || position == null) return null;

  return portal(
    <View style={[theme.styles.editorMenu, position]}>
      <MarkButton type="bold" text="b" activeMarks={value.activeMarks} />
      <MarkButton type="italic" text="i" activeMarks={value.activeMarks} />
    </View>,
  );
}

// import * as React from 'react';
// import ReactDOM from 'react-dom';
// import { View } from 'react-native';
// import withTheme, { type Theme } from '../core/withTheme';
// import { findDOMNode } from 'slate-react';
// import EditorMenuButtons from './EditorMenuButtons';
// import EditorMenuLink from './EditorMenuLink';
// import EditorMenuLinkPreview from './EditorMenuLinkPreview';
// // import type { OnEditorAction } from './Editor';
// type OnEditorAction = any;
//
// export type EditorMenuView = null | 'buttons' | 'link' | 'linkPreview';
//
// type EditorMenuProps = {|
//   value: Object,
//   onEditorAction: OnEditorAction,
//   theme: Theme,
// |};
//
// type EditorMenuState = {|
//   left: number,
//   top: number,
//   view: EditorMenuView,
//   hasLinks: boolean,
//   linkNode: ?Object,
// |};
//
// class EditorMenu extends React.PureComponent<EditorMenuProps, EditorMenuState> {
//   state = {
//     left: 0,
//     top: 0,
//     view: null,
//     hasLinks: false,
//     linkNode: null,
//   };
//
//   componentDidMount() {
//     this.el = window.document.createElement('div');
//     this.modalRoot = window.document.getElementById('__next');
//     if (this.modalRoot && this.el) this.modalRoot.appendChild(this.el);
//     this.maybeUpdateLeftTopState();
//   }
//
//   componentDidUpdate(prevProps) {
//     // https://reactjs.org/docs/react-component.html#componentdidmount
//     // setState in componentDidUpdate is valid for tooltips, but we have to wrap
//     // it in a condition.
//     // Without PureComponent, it would cause a loop. With PureComponent, it
//     // would cause double measuring of selection rect.
//     // We can't use ref with setNativeProps, because:
//     // 1) if this.el is set in componentDidMount, we can't set position because
//     //    ref is not available yet.
//     // 2) if this.el is set in constructor, server and client HTML would be
//     //    different.
//     // Therefore, this is the only right approach.
//     if (this.props.value !== prevProps.value) {
//       this.maybeUpdateLeftTopState();
//     }
//   }
//
//   componentWillUnmount() {
//     if (this.modalRoot && this.el) this.modalRoot.removeChild(this.el);
//   }
//
//   static getDerivedStateFromProps(
//     props: EditorMenuProps,
//     state: EditorMenuState,
//   ): $Shape<EditorMenuState> {
//     const ignoreViewWithFocus = state.view === 'link';
//     if (ignoreViewWithFocus) return null;
//     const { value } = props;
//     const { fragment, selection } = value;
//     const hasLinks = value.inlines.some(inline => inline.type === 'link');
//     const linkNode = value.inlines.find(inline => inline.type === 'link');
//     const newState = { hasLinks, linkNode };
//     if (selection.isFocused) {
//       if (selection.isCollapsed) {
//         const view = hasLinks ? 'linkPreview' : null;
//         return { ...newState, view };
//       }
//       if (fragment.text !== '') {
//         return { ...newState, view: 'buttons' };
//       }
//     }
//     return { ...newState, view: null };
//   }
//
//   handleActionsSelectView = view => {
//     this.setState({ view });
//   };
//
//   handleEditorMenuLinkClose = focusEditor => {
//     this.setState({ view: 'buttons' }, () => {
//       if (focusEditor === true) this.props.onEditorAction({ type: 'FOCUS' });
//     });
//   };
//
//   handleEditorMenuLinkSubmit = href => {
//     this.props.onEditorAction({ type: 'LINK', href });
//   };
//
//   handleKeyModK(change: Object) {
//     const { value } = this.props;
//     const { fragment, selection } = value;
//     if (selection.isCollapsed) {
//       const { linkNode } = this.state;
//       if (!linkNode) return;
//       const href = linkNode.data.get('href');
//       // TODO: Use router push for web links.
//       window.open(href);
//       return;
//     }
//     if (fragment.text === '') return;
//     if (this.state.hasLinks) {
//       this.props.onEditorAction({ type: 'LINK', href: null, change });
//     } else {
//       this.setState({ view: 'link' });
//     }
//   }
//
//   modalRoot: ?HTMLDivElement;
//   el: ?HTMLDivElement;
//
//   maybeUpdateLeftTopState() {
//     switch (this.state.view) {
//       case 'buttons': {
//         const rect = window
//           .getSelection()
//           .getRangeAt(0)
//           .getBoundingClientRect();
//         this.setState({
//           left: rect.left,
//           top: window.pageYOffset + rect.bottom,
//         });
//         break;
//       }
//       case 'link': {
//         break;
//       }
//       case 'linkPreview': {
//         const { linkNode } = this.state;
//         if (!linkNode) return;
//         // eslint-disable-next-line react/no-find-dom-node
//         const rect = findDOMNode(linkNode).getBoundingClientRect();
//         this.setState({
//           left: rect.left,
//           top: window.pageYOffset + rect.bottom,
//         });
//         break;
//       }
//       case null:
//         break;
//       default:
//         // eslint-disable-next-line no-unused-expressions
//         (this.state.view: empty);
//     }
//   }
//
//   renderView() {
//     const { value, onEditorAction } = this.props;
//     switch (this.state.view) {
//       case 'buttons':
//         return (
//           <EditorMenuButtons
//             value={value}
//             onEditorAction={onEditorAction}
//             onSelectView={this.handleActionsSelectView}
//             hasLinks={this.state.hasLinks}
//           />
//         );
//       case 'link':
//         return (
//           <EditorMenuLink
//             onClose={this.handleEditorMenuLinkClose}
//             onSubmit={this.handleEditorMenuLinkSubmit}
//           />
//         );
//       case 'linkPreview': {
//         const { linkNode } = this.state;
//         if (!linkNode) return;
//         const href = linkNode.data.get('href');
//         return <EditorMenuLinkPreview href={href} />;
//       }
//       case null:
//         return null;
//       default:
//         // eslint-disable-next-line no-unused-expressions
//         (this.state.view: empty);
//     }
//   }
//
//   render() {
//     const { el } = this;
//     if (el == null) return null;
//     const view = this.renderView();
//     if (view == null) return null;
//     const { left, top } = this.state;
//     return ReactDOM.createPortal(
//       <View style={[this.props.theme.styles.editorMenu, { left, top }]}>
//         {view}
//       </View>,
//       el,
//     );
//   }
// }
//
// // This is workaround for https://github.com/este/este/issues/1571
// export type EditorMenuType = typeof EditorMenu;
//
// export default withTheme(EditorMenu);
