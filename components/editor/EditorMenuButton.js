// @flow
import * as React from 'react';
import Button, { type ButtonProps } from '../Button';
import { editorMenuItemProps, type SectionName } from './EditorMenu';
import type { Path } from './Editor';
import EditorDispatch from './EditorDispatch';
import * as RovingTabIndex from '../RovingTabIndex';

type EditorMenuButtonProps = {
  active?: boolean,
  path?: Path,
  section?: SectionName,
  back?: boolean,
} & ButtonProps;

// This is just an example how we can compose components to avoid nesting.
const DispatchWithRovingTabIndex = ({ children }) => (
  <EditorDispatch>
    {dispatch => (
      <RovingTabIndex.Consumer>
        {(tabIndex, onFocus, onKeyDown) =>
          children(dispatch, tabIndex, onFocus, onKeyDown)
        }
      </RovingTabIndex.Consumer>
    )}
  </EditorDispatch>
);

class EditorMenuButton extends React.PureComponent<EditorMenuButtonProps> {
  render() {
    const {
      onPress,
      path,
      section,
      back = false,
      paddingVertical = 0,
      paddingHorizontal = 0.25,
      autoFocus,
      active = false,
      children,
      ...restProps
    } = this.props;
    const buttonAutoFocus = back ? true : autoFocus;
    const buttonChildren = back ? '…' : children;
    return (
      <DispatchWithRovingTabIndex>
        {(dispatch, tabIndex, onFocus, onKeyDown) => (
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
            decoration={active ? 'underline' : 'none'}
            {...restProps}
          >
            {buttonChildren}
          </Button>
        )}
      </DispatchWithRovingTabIndex>
    );
  }
}

export default EditorMenuButton;
