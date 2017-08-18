// @flow
import React from 'react';
import Text, { type TextProps } from './Text';
import { defineMessages, injectIntl, type IntlShape } from 'react-intl';

const messages = defineMessages({
  loading: {
    defaultMessage: 'Loading',
    id: 'loading.loading',
  },
});

type LoadingProps = TextProps & {
  intl: IntlShape,
};

type LoadingState = {
  messageShown: boolean,
};

class Loading extends React.Component<LoadingProps, LoadingState> {
  state = {
    messageShown: false,
  };

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ messageShown: true });
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  timer: number;

  render() {
    const { messageShown } = this.state;
    if (!messageShown) return null;
    const { intl, ...restProps } = this.props;

    return (
      <Text {...restProps}>
        {intl.formatMessage(messages.loading)}
      </Text>
    );
  }
}

export default injectIntl(Loading);
