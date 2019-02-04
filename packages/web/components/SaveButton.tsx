import React from 'react';
import { FormattedMessage } from 'react-intl';
import useSavedState from '../hooks/useSavedState';
import Button from './Button';

interface SaveButtonProps {
  disabled: boolean;
  onPress: () => void;
  saved: boolean;
}

const SaveButton: React.FunctionComponent<SaveButtonProps> = props => {
  const [disabled, saved] = useSavedState(props.disabled, props.saved);

  return (
    <Button type="primary" disabled={disabled} onPress={props.onPress}>
      {saved ? (
        <FormattedMessage id="button.saved" defaultMessage="Saved" />
      ) : (
        <FormattedMessage id="button.save" defaultMessage="Save" />
      )}
    </Button>
  );
};

export default SaveButton;
