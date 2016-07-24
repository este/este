import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import theme from '../../../common/app/theme';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1,
  },
});

export default class Container extends Component {

  static propTypes = {
    children: PropTypes.node,
    style: View.propTypes.style,
  };

  render() {
    const { children, style } = this.props;
    return (
      <View {...this.props} style={[styles.container, style]}>
        {children}
      </View>
    );
  }

}
