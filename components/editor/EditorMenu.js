// @flow
/* eslint-env browser */
import React, { useState, useEffect, useRef, type Node } from 'react';
import { View } from 'react-native';
import useTheme from '../../hooks/useTheme';
import Portal from '../core/Portal';
import Button from '../core/Button';
import {
  useEditorDispatch,
  type MarkType,
  type Components,
  type EditorStyleSheets,
} from './Editor';
import type { ComponentType } from './__generated__/Editor.graphql';
import { FormattedMessage } from 'react-intl';
import EditorMenuComponentView from './EditorMenuComponentView';
import EditorMenuStylesView from './EditorMenuStylesView';
import useEscapeFix from '../../hooks/useEscapeFix';
import getFocusableNodes from '../../client/getFocusableNodes';

export function EditorMenuButton({
  children,
  isActive,
  onPress,
  onFocus,
  onBlur,
}: {|
  children: Node,
  isActive?: boolean,
  onPress: (event: Event) => void,
  onFocus?: () => void,
  onBlur?: () => void,
|}) {
  const theme = useTheme();
  return (
    <Button
      onPressIn={event => {
        event.preventDefault();
        onPress(event);
      }}
      color={isActive === true ? 'success' : 'gray'}
      bold
      style={theme.styles.editorMenuButton}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </Button>
  );
}

function EditorMenuMarkButton({
  type,
  label,
  activeMarks,
  onPress,
  onFocus,
  onBlur,
}: {|
  type: MarkType,
  label: string,
  activeMarks: Object,
  onPress: () => void,
  onFocus?: () => void,
  onBlur?: () => void,
|}) {
  function isMarkType(markType) {
    return activeMarks.some(mark => mark.type === markType);
  }
  return (
    <EditorMenuButton
      isActive={isMarkType(type)}
      onPress={onPress}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {label}
    </EditorMenuButton>
  );
}

function DefaultView({ activeMarks, setMenuView, components, selection }) {
  const dispatch = useEditorDispatch();
  const [escapeFixHandleFocus, escapeFixHandleBlur] = useEscapeFix(() => {
    dispatch({ type: 'moveToAnchor' });
  });
  const inlineComponents = components.filter(
    component => component.type === ('INLINE': ComponentType),
  );

  function handleStylesPress() {
    setMenuView({ type: 'styles' });
  }

  function toggleMark(mark) {
    return () => {
      dispatch({ type: 'toggleMark', mark });
      // Key navigation is must, but it steals focus from the selection, so we can't
      // update position. But closing after key action actually makes a sense.
      if (selection.isBlurred) dispatch({ type: 'moveToAnchor' });
    };
  }

  return (
    <>
      <EditorMenuButton
        onPress={handleStylesPress}
        onFocus={escapeFixHandleFocus}
        onBlur={escapeFixHandleBlur}
      >
        <FormattedMessage defaultMessage="styles" id="editorMenu.styles" />
      </EditorMenuButton>
      <EditorMenuMarkButton
        type="bold"
        label="b"
        activeMarks={activeMarks}
        onPress={toggleMark('bold')}
        onFocus={escapeFixHandleFocus}
        onBlur={escapeFixHandleBlur}
      />
      <EditorMenuMarkButton
        type="italic"
        label="i"
        activeMarks={activeMarks}
        onPress={toggleMark('italic')}
        onFocus={escapeFixHandleFocus}
        onBlur={escapeFixHandleBlur}
      />
      {inlineComponents.map(component => {
        return (
          <EditorMenuButton
            onPress={() =>
              setMenuView({
                type: 'component',
                componentId: component.id,
              })
            }
            onFocus={escapeFixHandleFocus}
            onBlur={escapeFixHandleBlur}
            key={component.id}
          >
            {component.name.toLowerCase()}
          </EditorMenuButton>
        );
      })}
    </>
  );
}

type MenuView =
  | {| type: 'default' |}
  | {| type: 'styles' |}
  | {| type: 'component', componentId: string |};
type Position = {| left: number, top: number |};

function EditorMenu({
  value,
  styleSheets,
  components,
}: {|
  value: Object,
  styleSheets: EditorStyleSheets,
  components: Components,
|}) {
  const theme = useTheme();
  const [position, setPosition] = useState<?Position>(null);
  const [menuView, setMenuView] = useState<MenuView>({ type: 'default' });
  const viewRef = useRef(null);

  function maybeComputeAndUpdatePosition() {
    // It's not reliable on blurred selection.
    if (value.selection.isBlurred) return;
    const rect = window
      .getSelection()
      .getRangeAt(0)
      .getBoundingClientRect();
    const left = rect.left;
    const top = window.pageYOffset + rect.bottom;
    setPosition({ left, top });
  }

  useEffect(
    () => {
      const { selection, fragment } = value;
      const hideMenu = selection.isCollapsed || fragment.text === '';
      if (hideMenu) {
        setMenuView({ type: 'default' });
        setPosition(null);
        return;
      }
      maybeComputeAndUpdatePosition();
    },
    [value.selection.isCollapsed, value.selection.isFocused, value.fragment],
  );

  if (position == null) return null;

  function focusFirst(ref) {
    if (!ref.current) return;
    const first = getFocusableNodes(ref.current)[0];
    if (first) first.focus();
  }

  function handleClose() {
    setMenuView({ type: 'default' });
    focusFirst(viewRef);
  }

  function renderMenuView() {
    switch (menuView.type) {
      case 'default':
        return (
          <DefaultView
            activeMarks={value.activeMarks}
            setMenuView={setMenuView}
            components={components}
            selection={value.selection}
          />
        );
      case 'styles':
        return (
          <EditorMenuStylesView
            styleSheets={styleSheets}
            blocks={value.blocks}
            onClose={handleClose}
            selection={value.selection}
          />
        );
      case 'component': {
        return (
          <EditorMenuComponentView
            componentId={menuView.componentId}
            components={components}
            onClose={handleClose}
          />
        );
      }
      default:
        // eslint-disable-next-line no-unused-expressions
        (menuView.type: empty);
        return null;
    }
  }

  return (
    <Portal>
      <View ref={viewRef} style={[theme.styles.editorMenu, position]}>
        {renderMenuView()}
      </View>
    </Portal>
  );
}

export default EditorMenu;

// import { findDOMNode } from 'slate-react';
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
