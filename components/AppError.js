// @flow
import React from 'react';
import type { State as AppState } from '../types';
import Text from './Text';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { type AppError as AppErrorType } from '../lib/appError';

const getAppErrorMessage = error => {
  switch (error.name) {
    case 'failedToFetch':
      return (
        <FormattedMessage
          defaultMessage="Network error. Please check your connection."
          id="appError.failedToFetch"
        />
      );
    case 'insufficientPermissions':
      return (
        <FormattedMessage
          defaultMessage="Insufficient permissions."
          id="appError.insufficientPermissions"
        />
      );
    default:
      // https://flow.org/en/docs/react/redux/#toc-typing-redux-reducers
      // eslint-disable-next-line no-unused-expressions
      (error: empty);
      return null;
  }
};

type Props = {
  appError: ?AppErrorType,
};

type State = {
  shown: boolean,
};

class AppError extends React.Component<Props, State> {
  state = {
    shown: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.appError !== this.props.appError) {
      this.flashError();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.shownTimer);
  }

  flashError() {
    this.setState({ shown: true });
    clearTimeout(this.shownTimer);
    const timeToHide = 5000;
    this.shownTimer = setTimeout(() => {
      this.setState({ shown: false });
    }, timeToHide);
  }

  shownTimer: number;

  render() {
    const { appError } = this.props;
    if (!appError || !this.state.shown) return null;
    const message = getAppErrorMessage(appError);
    return (
      <Text
        backgroundColor="warning"
        bold
        color="white"
        display="inline"
        left="50%"
        margin="auto"
        paddingHorizontal={1}
        paddingVertical={0.25}
        style={{
          position: 'fixed',
          transform: 'translateX(-50%)',
        }}
        top={0}
        zIndex={1}
      >
        {message}
      </Text>
    );
  }
}

export default connect((state: AppState) => ({
  appError: state.app.error,
}))(AppError);
