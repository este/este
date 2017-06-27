// @flow
import type { AppError, ValidationErrors } from '../types';
import React from 'react';

type AlertErrorsProps = {
  appError?: AppError,
  validationErrors?: ValidationErrors<*>,
};

// TODO: Compose AppError And ValidationError into popup.

class AlertErrors extends React.PureComponent {
  props: AlertErrorsProps;

  alert() {
    const { appError, validationErrors } = this.props;
    if (appError) {
      // eslint-disable-next-line no-alert, no-undef
      alert(JSON.stringify(appError));
    } else if (validationErrors) {
      // eslint-disable-next-line no-alert, no-undef
      alert(JSON.stringify(validationErrors));
    }
  }

  render() {
    // Using alert for now, but sure we can render nice animated whatver.
    this.alert();
    return null;
  }
}

export default AlertErrors;
