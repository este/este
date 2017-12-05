// @flow
import * as React from 'react';
import Box from '../Box';
import Set from '../Set';
import A from '../A';
import { ManageYourWebsMessage } from '../../pages';

const EditorMenuSectionHamburger = () => (
  <Box alignItems="flex-end">
    <Set marginBottom={0}>
      {/* autoFocus is good for UX. Every EditorMenuSection should set it. */}
      <A autoFocus href={{ pathname: '/' }}>
        <ManageYourWebsMessage />
      </A>
    </Set>
  </Box>
);

export default EditorMenuSectionHamburger;
