// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuA } from './EditorMenu';
import { ManageYourWebsMessage } from '../../pages';

class EditorMenuSectionHamburger extends React.PureComponent<{}> {
  render() {
    return (
      <EditorMenuSection justifyContent="flex-end">
        <EditorMenuA href={{ pathname: '/' }}>
          <ManageYourWebsMessage />
        </EditorMenuA>
      </EditorMenuSection>
    );
  }
}

export default EditorMenuSectionHamburger;
