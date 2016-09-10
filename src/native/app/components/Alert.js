/* @flow */
import React from 'react';
import errorToMessage from '../../../common/app/errorToMessage';
import theme from '../themes/initial';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { FormattedMessage } from './';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    height: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  alert: {
    borderBottomWidth: 1,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  message: {
    color: theme.bright(theme.inverseTextColor),
    fontWeight: 'bold',
    margin: theme.fontSize * 0.75,
    textAlign: 'center',
  },
});

class Alert extends React.Component {

  static propTypes = {
    brand: React.PropTypes.string,
    duration: React.PropTypes.number.isRequired,
    error: React.PropTypes.instanceOf(Error),
    hideTimeout: React.PropTypes.number.isRequired,
  };

  static defaultProps = {
    brand: theme.brandDanger,
    duration: 300,
    hideTimeout: 4000,
  };

  constructor() {
    super();
    this.state = {
      alertHeight: 0,
      animation: new Animated.Value(0),
    };
  }

  state: {
    alertHeight: number,
    animation: any,
  };

  componentWillReceiveProps({ error }) {
    if (!error) return;
    this.show();
  }

  onAlertLayout({ nativeEvent: { layout } }) {
    const alertHeight = layout.height;
    this.setState({ alertHeight });
  }

  onPress() {
    this.animateTo(0);
  }

  getAlertStyle() {
    const { brand } = this.props;
    return {
      backgroundColor: brand,
      borderBottomColor: theme.bright(brand),
    };
  }

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

  hideTimer: number;

  animateTo(toValue, fromValue) {
    const { duration } = this.props;
    const { animation } = this.state;
    if (fromValue !== undefined) {
      animation.setValue(fromValue);
    }
    Animated
      .timing(animation, { duration, toValue })
      .start();
  }

  show() {
    const { hideTimeout } = this.props;
    this.animateTo(1, 0);
    clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => {
      this.animateTo(0);
    }, hideTimeout);
  }

  render() {
    const { error } = this.props;
    if (!error) return null;

    const errorMessage = errorToMessage(error);
    if (!errorMessage || !errorMessage.message) return null;

    const alertStyle = this.getAlertStyle();
    const containerStyle = this.getContainerStyle();

    return (
      <TouchableWithoutFeedback onPress={() => this.onPress()}>
        <Animated.View style={[styles.container, containerStyle]}>
          <View
            style={[styles.alert, alertStyle]}
            onLayout={e => this.onAlertLayout(e)}
          >
            <FormattedMessage
              {...errorMessage.message}
              values={errorMessage.values || {}}
              style={styles.message}
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

}

export default connect(state => ({
  error: state.app.error,
}))(Alert);
