import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import theme from '../../../common/app/theme';
import { FormattedMessage, Text } from './';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
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
    color: '#fff',
    fontWeight: 'bold',
    margin: theme.fontSize * .75,
    textAlign: 'center',
  },
});

export default class Alert extends Component {

  static propTypes = {
    brand: PropTypes.string,
    duration: PropTypes.number.isRequired,
    hideTimeout: PropTypes.number.isRequired,
    message: PropTypes.oneOfType([
      // github.com/yahoo/react-intl/issues/549
      PropTypes.shape({
        defaultMessage: PropTypes.string.isRequired,
        description: PropTypes.string,
        id: PropTypes.string.isRequired,
      }),
      PropTypes.string,
    ]),
    values: PropTypes.object,
  };

  static defaultProps = {
    brand: theme.brandDanger,
    duration: 300,
    hideTimeout: 4000,
  };

  constructor() {
    super();
    this.onAlertLayout = this.onAlertLayout.bind(this);
    this.onPress = this.onPress.bind(this);
    this.state = {
      alertHeight: 0,
      animation: new Animated.Value(0),
    };
  }

  componentWillReceiveProps({ message }) {
    if (!message) return;
    const { hideTimeout } = this.props;
    this.animateTo(1, 0);
    clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => {
      this.animateTo(0);
    }, hideTimeout);
  }

  onAlertLayout({ nativeEvent: { layout } }) {
    const alertHeight = layout.height;
    this.setState({ alertHeight });
  }

  onPress() {
    this.animateTo(0);
  }

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

  render() {
    const { brand, message, values } = this.props;
    const { alertHeight, animation } = this.state;
    const containerStyle = {
      height: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, alertHeight],
      }),
      opacity: animation,
    };
    const alertStyle = {
      backgroundColor: brand,
      borderBottomColor: theme.lighten(brand),
    };

    if (!message) return null;

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <Animated.View style={[styles.container, containerStyle]}>
          <View style={[styles.alert, alertStyle]} onLayout={this.onAlertLayout}>
            {typeof message === 'object' ?
              <FormattedMessage
                {...message}
                values={values}
                style={styles.message}
              />
            :
              <Text style={styles.message}>{message}</Text>
            }
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

}
