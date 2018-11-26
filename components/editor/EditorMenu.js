// @flow
/* eslint-env browser */
import React, { useState, useEffect, useRef, type Node } from 'react';
import { View } from 'react-native';
import useTheme from '../../hooks/useTheme';
import Portal from '../core/Portal';
import Button from '../core/Button';
import {
  useEditorDispatch,
  stylesSorter,
  type MarkType,
  type Components,
} from './Editor';
import type { ComponentType } from './__generated__/Editor.graphql';
import { FormattedMessage } from 'react-intl';
import EditorMenuComponentView from './EditorMenuComponentView';
import useEscapeFix from '../../hooks/useEscapeFix';
import getFocusableNodes from '../../client/getFocusableNodes';

function EditorMenuButton({
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

  return (
    <>
      <EditorMenuMarkButton
        type="bold"
        label="b"
        activeMarks={activeMarks}
        onPress={() => dispatch({ type: 'toggleMark', mark: 'bold' })}
        onFocus={escapeFixHandleFocus}
        onBlur={escapeFixHandleBlur}
      />
      <EditorMenuMarkButton
        type="italic"
        label="i"
        activeMarks={activeMarks}
        onPress={() => dispatch({ type: 'toggleMark', mark: 'italic' })}
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
                selectionFocus: selection.focus,
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
      <EditorMenuButton
        onPress={handleStylesPress}
        onFocus={escapeFixHandleFocus}
        onBlur={escapeFixHandleBlur}
      >
        <FormattedMessage defaultMessage="styles" id="editorMenu.styles" />
      </EditorMenuButton>
    </>
  );
}

function StylesView({ styleSheet, blocks, onClose }) {
  const dispatch = useEditorDispatch();
  const [escapeFixHandleFocus, escapeFixHandleBlur] = useEscapeFix(onClose);
  const styles = Object.keys(styleSheet)
    .filter(id => styleSheet[id].isText)
    .map(id => {
      const { name } = styleSheet[id];
      return { id, name };
    })
    .sort(stylesSorter);
  return styles.map(style => {
    return (
      <EditorMenuButton
        onFocus={escapeFixHandleFocus}
        onBlur={escapeFixHandleBlur}
        isActive={blocks.some(node => {
          const props = node.data.get('props');
          return props.style?.valueStyle?.id === style.id;
        })}
        onPress={() => dispatch({ type: 'setTextStyle', styleId: style.id })}
        key={style.id}
      >
        {style.name}
      </EditorMenuButton>
    );
  });
}

type MenuView =
  | {| type: 'default' |}
  | {| type: 'styles' |}
  | {|
      type: 'component',
      componentId: string,
      selectionFocus: Object,
    |};
type Position = {| left: number, top: number |};

export default function EditorMenu({
  value,
  styleSheet,
  components,
}: {|
  value: Object,
  styleSheet: Object,
  components: Components,
|}) {
  const theme = useTheme();
  const [position, setPosition] = useState<?Position>(null);
  const [menuView, setMenuView] = useState<MenuView>({ type: 'default' });
  const viewRef = useRef(null);

  useEffect(
    () => {
      const { selection, fragment } = value;
      if (
        menuView.type === 'component' &&
        menuView.selectionFocus === selection.focus
      ) {
        return;
      }
      const hideMenu = selection.isCollapsed || fragment.text === '';
      if (hideMenu) {
        setMenuView({ type: 'default' });
        setPosition(null);
        return;
      }
      if (selection.isBlurred) return;
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

  if (position == null) return null;

  function handleClose() {
    setMenuView({ type: 'default' });
    if (!viewRef.current) return;
    const first = getFocusableNodes(viewRef.current)[0];
    if (first) first.focus();
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
          <StylesView
            styleSheet={styleSheet}
            blocks={value.blocks}
            onClose={handleClose}
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
