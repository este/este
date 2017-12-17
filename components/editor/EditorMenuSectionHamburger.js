// @flow
import * as React from 'react';
import { EditorMenuSection, EditorMenuA } from './EditorMenu';
import { ManageYourWebsMessage } from '../../pages';

const EditorMenuSectionHamburger = () => (
  <EditorMenuSection justifyContent="flex-end">
    <EditorMenuA href={{ pathname: '/' }}>
      <ManageYourWebsMessage />
    </EditorMenuA>
  </EditorMenuSection>
);

export default EditorMenuSectionHamburger;
