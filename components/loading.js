// @flow
import React from 'react';
import Text, { type TextProps } from './text';
import { defineMessages, injectIntl, type IntlShape } from 'react-intl';

type LoadingProps = TextProps & {
  intl: IntlShape,
};

const messages = defineMessages({
  loading: {
    defaultMessage: 'Loading',
    id: 'loading.loading',
  },
});

class Loading extends React.Component {
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
  props: LoadingProps;

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
