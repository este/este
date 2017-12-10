// @flow
import * as React from 'react';
import { Section } from './EditorMenu';
import A from '../A';
import { ManageYourWebsMessage } from '../../pages';

const EditorMenuSectionHamburger = () => (
  <Section justifyContent="flex-end">
    <A href={{ pathname: '/' }}>
      <ManageYourWebsMessage />
    </A>
  </Section>
);

export default EditorMenuSectionHamburger;
