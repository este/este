// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';

type AreYouSureConfirmProps = {|
  render: (() => boolean) => React$Element<any>,
|};

const AreYouSureConfirm = ({ render }: AreYouSureConfirmProps) =>
  <FormattedMessage defaultMessage="Are you sure?" id="confirm.areYouSure">
    {message =>
      render(() =>
        // eslint-disable-next-line no-alert, no-undef
        confirm(message),
      )}
  </FormattedMessage>;

export default AreYouSureConfirm;
