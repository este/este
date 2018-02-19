// @flow
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import EditorMenuSection from './EditorMenuSection';
import EditorMenuA from './EditorMenuA';

class EditorMenuSectionHamburger extends React.PureComponent<{}> {
  render() {
    return (
      <EditorMenuSection justifyContent="flex-end">
        <EditorMenuA href={{ pathname: '/' }}>
          <FormattedMessage
            defaultMessage="Manage your webs"
            id="index.manageYourWebs"
          />
        </EditorMenuA>
      </EditorMenuSection>
    );
  }
}

export default EditorMenuSectionHamburger;
