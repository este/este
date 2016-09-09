/* @flow */
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Title, View } from './';

const messages = defineMessages({
  loadingText: {
    defaultMessage: 'Loading',
    id: 'loading.loadingText',
  },
  longLoadingText: {
    defaultMessage: 'Still loading, please check your connection',
    id: 'loading.longLoadingText',
  },
});

class Loading extends React.Component {

  constructor() {
    super();
    this.state = {
      currentText: null,
    };
  }

  state: {
    currentText: ?Object,
  };

  componentDidMount() {
    // www.nngroup.com/articles/response-times-3-important-limits
    this.timer = setTimeout(() => {
      this.setState({ currentText: messages.loadingText });
    }, 1000);
    this.longTimer = setTimeout(() => {
      this.setState({ currentText: messages.longLoadingText });
    }, 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.longTimer);
  }

  timer: number;
  longTimer: number;

  render() {
    const { currentText } = this.state;
    if (!currentText) return null;
    const { children } = this.props;

    return (
      <View>
        <Title message={currentText} />
        <FormattedMessage {...currentText} children={children} />
      </View>
    );
  }

}

Loading.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.node,
  ]),
};

export default Loading;
