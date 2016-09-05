/* @flow */
import React from 'react';

// github.com/jxnblk/rebass
class ThemeProvider extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
    theme: React.PropTypes.object.isRequired,
  };

  static childContextTypes = {
    rebass: React.PropTypes.object,
  };

  getChildContext() {
    const { theme } = this.props;
    return {
      rebass: theme,
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }

}

export default ThemeProvider;
