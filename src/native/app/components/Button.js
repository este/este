/* @flow */
import React from 'react';
import theme from '../themes/initial';
import { TouchableOpacity, View } from 'react-native';

class Button extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
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

export default Button;
