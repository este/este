// @flow
/* eslint-env browser */
import { defineMessages } from 'react-intl';
import useIntl from './useIntl';

const messages = defineMessages({
  areYouSure: {
    defaultMessage: 'Are you sure?',
    id: 'confirm.areYouSure',
  },
});

export default function useConfirm() {
  const intl = useIntl();

  function confirm() {
    return (window.confirm(intl.formatMessage(messages.areYouSure)): boolean);
  }

  return confirm;
}
