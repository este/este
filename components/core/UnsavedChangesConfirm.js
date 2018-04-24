// @flow
/* eslint-env browser */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

type UnsavedChangesConfirmProps = {|
  render: (() => boolean) => React.Node,
|};

const UnsavedChangesConfirm = ({ render }: UnsavedChangesConfirmProps) => (
  <FormattedMessage
    defaultMessage="You have unsaved changes. Are you sure?"
    id="confirm.unsavedChanges"
  >
    {message => render(() => window.confirm((message: any)))}
  </FormattedMessage>
);

export default UnsavedChangesConfirm;
