// @flow
import * as React from 'react';
import Button, { type ButtonProps } from '../Button';
import { editorMenuItemProps, type SectionName } from './EditorMenu';
import type { Path } from './Editor';
import withDispatch from './withDispatch';
import * as RovingTabIndex from '../RovingTabIndex';

type EditorMenuButtonProps = {
  path?: Path,
  section?: SectionName,
  back?: boolean,
} & ButtonProps;

const EditorMenuButton = props => {
  const {
    dispatch,
    onPress,
    path,
    section,
    back = false,
    paddingVertical = 0,
    paddingHorizontal = 0.25,
    autoFocus,
    children,
    ...restProps
  } = props;
  const buttonAutoFocus = back ? true : autoFocus;
  const buttonChildren = back ? '…' : children;
  return (
    <RovingTabIndex.Consumer>
      {(tabIndex, onFocus, onKeyDown) => (
        <Button
          {...editorMenuItemProps}
          paddingVertical={paddingVertical}
          paddingHorizontal={paddingHorizontal}
          autoFocus={buttonAutoFocus}
          tabIndex={tabIndex}
          onPress={() => {
            if (path) dispatch({ type: 'SET_ACTIVE_PATH', path });
            if (section) dispatch({ type: 'SET_ACTIVE_SECTION', section });
            if (onPress) onPress();
          }}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          {...restProps}
        >
          {buttonChildren}
        </Button>
      )}
    </RovingTabIndex.Consumer>
  );
};

const EditorMenuButtonWithDispatch: React.ComponentType<
  EditorMenuButtonProps,
> = withDispatch(EditorMenuButton);

export default EditorMenuButtonWithDispatch;
