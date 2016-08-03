import React, { Component, PropTypes } from 'react';
import theme from '../theme';
import { TouchableOpacity, View } from 'react-native';

export default class Button extends Component {

  static propTypes = {
    children: PropTypes.node,
    style: View.propTypes.style,
  };

  render() {
    const { children, style } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={theme.activeOpacity}
        style={style}
        {...this.props}
      >
        {children}
      </TouchableOpacity>
    );
  }

}
