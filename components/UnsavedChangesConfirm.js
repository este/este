// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';

type UnsavedChangesConfirmProps = {|
  render: (() => boolean) => React$Element<any>,
|};

const UnsavedChangesConfirm = ({ render }: UnsavedChangesConfirmProps) =>
  <FormattedMessage
    defaultMessage="You have unsaved changes. Are you sure?"
    id="confirm.unsavedChanges"
  >
    {message =>
      render(() =>
        // eslint-disable-next-line no-alert, no-undef
        confirm(message),
      )}
  </FormattedMessage>;

export default UnsavedChangesConfirm;
