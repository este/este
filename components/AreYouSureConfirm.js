// @flow
import React, { type Node } from 'react';
import { FormattedMessage } from 'react-intl';

type AreYouSureConfirmProps = {|
  render: (() => boolean) => Node,
|};

const AreYouSureConfirm = ({ render }: AreYouSureConfirmProps) => (
  <FormattedMessage defaultMessage="Are you sure?" id="confirm.areYouSure">
    {message =>
      render(() =>
        // eslint-disable-next-line no-alert, no-undef
        confirm((message: any)),
      )}
  </FormattedMessage>
);

export default AreYouSureConfirm;
