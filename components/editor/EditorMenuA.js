// @flow
import * as React from 'react';
import A, { type AProps } from '../A';
import RovingTabIndex from '../RovingTabIndex';
import { editorMenuItemProps } from './EditorMenu';

class EditorMenuA extends React.PureComponent<AProps> {
  render() {
    return (
      <RovingTabIndex>
        {(tabIndex, onFocus, onKeyDown) => (
          <A
            {...editorMenuItemProps}
            tabIndex={tabIndex}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            {...this.props}
          />
        )}
      </RovingTabIndex>
    );
  }
}

export default EditorMenuA;
