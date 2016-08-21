/* @flow */
import { defineMessages } from 'react-intl';

const confirmMessages = defineMessages({
  areYouSure: {
    defaultMessage: 'Are you sure?',
    id: 'app.confirm.areYouSure',
  },
  unsavedChanges: {
    defaultMessage: 'You have unsaved changes. Are you sure?',
    id: 'app.confirm.unsavedChanges',
  },
});

export default confirmMessages;
