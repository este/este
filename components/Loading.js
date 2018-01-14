// @flow
import * as React from 'react';
import Text, { type TextProps } from './Text';
import { defineMessages, injectIntl, type IntlShape } from 'react-intl';

const messages = defineMessages({
  loading: {
    defaultMessage: 'Loading',
    id: 'loading.loading',
  },
});

type Props = {
  intl: IntlShape,
} & TextProps;

type State = {
  messageShown: boolean,
};

class Loading extends React.Component<Props, State> {
  state = {
    messageShown: false,
  };

  componentDidMount() {
    this.timeoutID = setTimeout(() => {
      this.setState({ messageShown: true });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timeoutID) clearTimeout(this.timeoutID);
  }

  timeoutID: ?TimeoutID;

  render() {
    const { messageShown } = this.state;
    if (!messageShown) return null;
    const { intl, ...props } = this.props;

    return <Text {...props}>{intl.formatMessage(messages.loading)}</Text>;
  }
}

export default injectIntl(Loading);
