import React, { PropTypes, PureComponent } from 'react';
import theme from '../../../common/app/theme';
import { TouchableOpacity, View } from 'react-native';

export default class Button extends PureComponent {

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
