// @flow
import type { State } from '../../common/types';
import React from 'react';
import errorToMessage from '../../common/app/errorToMessage';
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Box, Text } from '../../common/components';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

type AlertProps = {
  duration: number,
  error?: typeof Error,
  hideTimeout: number,
  intl: $IntlShape,
};

type AlertState = {
  alertHeight: number,
  animation: Object,
};

const styles = StyleSheet.create({
  container: {
    height: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
});

class Alert extends React.Component {
  static defaultProps = {
    duration: 300,
    hideTimeout: 4000,
  };

  state: AlertState = {
    alertHeight: 0,
    animation: new Animated.Value(0),
  };

  componentWillReceiveProps({ error }) {
    if (!error) return;
    this.show();
  }

  onAlertLayout({ nativeEvent: { layout } }) {
    const alertHeight = layout.height;
    this.setState({ alertHeight });
  }

  onPress = () => {
    this.animateTo(0);
  };

  getContainerStyle() {
    const { alertHeight, animation } = this.state;
    return {
      height: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, alertHeight],
      }),
      opacity: animation,
    };
  }

  props: AlertProps;

  animateTo(toValue, fromValue) {
    const { duration } = this.props;
    const { animation } = this.state;
    if (fromValue !== undefined) {
      animation.setValue(fromValue);
    }
    Animated.timing(animation, { duration, toValue }).start();
  }

  hideTimer: number;

  show() {
    const { hideTimeout } = this.props;
    this.animateTo(1, 0);
    clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(
      () => {
        this.animateTo(0);
      },
      hideTimeout,
    );
  }

  render() {
    const { error, intl: { formatMessage } } = this.props;
    if (!error) return null;

    const errorMessage = errorToMessage(error);
    if (!errorMessage || !errorMessage.message) return null;

    const containerStyle = this.getContainerStyle();

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <Animated.View style={[styles.container, containerStyle]}>
          <Box
            backgroundColor="danger"
            bottom={0}
            left={0}
            onLayout={e => this.onAlertLayout(e)}
            position="absolute"
            right={0}
          >
            <Text bold color="white" padding={0.5} paddingHorizontal={1}>
              {formatMessage(errorMessage.message, errorMessage.values || {})}
            </Text>
          </Box>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default compose(
  connect((state: State) => ({
    error: state.app.error,
  })),
  injectIntl,
)(Alert);
