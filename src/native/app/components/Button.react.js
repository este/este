import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { TouchableOpacity } from 'react-native';

export default class Button extends Component {

  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const { children } = this.props;
    return (
      <TouchableOpacity activeOpacity={.5} {...this.props}>
        {children}
      </TouchableOpacity>
    );
  }

}
