// @flow
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

type AreYouSureConfirmProps = {|
  children: (() => boolean) => React.Node,
|};

const AreYouSureConfirm = ({ children }: AreYouSureConfirmProps) => (
  <FormattedMessage defaultMessage="Are you sure?" id="confirm.areYouSure">
    {message => children(() => window.confirm((message: any)))}
  </FormattedMessage>
);

export default AreYouSureConfirm;
