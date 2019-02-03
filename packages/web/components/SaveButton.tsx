import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from './Button';

interface SaveButtonProps {
  disabled: boolean;
  onPress: () => void;
}

const SaveButton: React.FunctionComponent<SaveButtonProps> = ({
  disabled,
  onPress,
}) => {
  return (
    <Button type="primary" disabled={disabled} onPress={onPress}>
      <FormattedMessage id="saveButton" defaultMessage="Save" />
    </Button>
  );
};

export default SaveButton;
