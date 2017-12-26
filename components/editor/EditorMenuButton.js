// @flow
import * as React from 'react';
import Button, { type ButtonProps } from '../Button';
import { editorMenuItemProps, type SectionName } from './EditorMenu';
import type { Path } from './Editor';
import withDispatch from './withDispatch';

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
    back,
    paddingVertical = 0,
    paddingHorizontal = 0.25,
    ...restProps
  } = props;
  return (
    <Button
      {...editorMenuItemProps}
      paddingVertical={paddingVertical}
      paddingHorizontal={paddingHorizontal}
      tabIndex={Boolean(restProps.autoFocus) || back === true ? 0 : -1}
      onPress={() => {
        if (path) dispatch({ type: 'SET_ACTIVE_PATH', path });
        if (section) dispatch({ type: 'SET_ACTIVE_SECTION', section });
        if (onPress) onPress();
      }}
      {...(back === true ? { autoFocus: true, children: '…' } : null)}
      {...restProps}
    />
  );
};

const EditorMenuButtonWithDispatch: React.ComponentType<
  EditorMenuButtonProps,
> = withDispatch(EditorMenuButton);

export default EditorMenuButtonWithDispatch;
