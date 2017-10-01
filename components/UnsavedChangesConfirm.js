// @flow
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
    {message =>
      render(() =>
        // eslint-disable-next-line no-alert, no-undef
        confirm((message: any)),
      )}
  </FormattedMessage>
);

export default UnsavedChangesConfirm;
