// @flow
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

type AreYouSureConfirmProps = {|
  render: (() => boolean) => React.Node,
|};

const AreYouSureConfirm = ({ render }: AreYouSureConfirmProps) => (
  <FormattedMessage defaultMessage="Are you sure?" id="confirm.areYouSure">
    {message =>
      render(() =>
        // eslint-disable-next-line no-alert, no-undef
        window.confirm((message: any)),
      )}
  </FormattedMessage>
);

export default AreYouSureConfirm;
