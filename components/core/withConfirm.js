// @flow
/* eslint-env browser */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export type Confirm = () => boolean;

const withConfirm = <Props: {}>(
  Component: React.ComponentType<Props>,
): React.ComponentType<$Diff<Props, { confirm: Confirm | void }>> => {
  type ConfirmProps = {
    ...Props,
    message: string,
  };

  class WithConfirm extends React.PureComponent<ConfirmProps> {
    confirm = () => {
      return window.confirm(this.props.message);
    };

    render() {
      const { message, ...props } = this.props;
      return <Component {...props} confirm={this.confirm} />;
    }
  }

  return props => (
    <FormattedMessage defaultMessage="Are you sure?" id="confirm.areYouSure">
      {// $FlowFixMe Wrong libdef.
      message => <WithConfirm {...props} message={message} />}
    </FormattedMessage>
  );
};

export default withConfirm;
