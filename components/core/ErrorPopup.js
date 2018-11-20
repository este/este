// @flow
import React, { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage';
import useTheme from '../../hooks/useTheme';
import useAppError from '../../hooks/useAppError';

function runtimeErrorToMessageError(message) {
  switch (message) {
    case 'NOT_AUTHORIZED':
      return 'NOT_AUTHORIZED';
    case 'Failed to fetch':
      return 'NET_ERROR';
    default:
      return 'UNKNOWN';
  }
}

export default function ErrorPopup() {
  const theme = useTheme();
  const { appError } = useAppError();
  const [shown, setShown] = useState(false);
  useEffect(
    () => {
      if (!appError) return;
      setShown(true);
      const timeoutID = setTimeout(() => {
        setShown(false);
      }, 10000);
      return () => {
        clearTimeout(timeoutID);
      };
    },
    [appError],
  );

  if (!appError || !shown) return null;

  return (
    <ErrorMessage
      size={1}
      align="center"
      color="white"
      style={theme.styles.errorPopup}
      error={runtimeErrorToMessageError(appError.message)}
      originalErrorMessage={appError.message}
    />
  );
}
