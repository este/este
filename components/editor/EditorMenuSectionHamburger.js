// @flow
import * as React from 'react';
import { Section, EditorMenuA } from './EditorMenu';
import { ManageYourWebsMessage } from '../../pages';

const EditorMenuSectionHamburger = () => (
  <Section justifyContent="flex-end">
    <EditorMenuA href={{ pathname: '/' }}>
      <ManageYourWebsMessage />
    </EditorMenuA>
  </Section>
);

export default EditorMenuSectionHamburger;
