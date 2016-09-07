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
    // reflexbox: React.PropTypes.object,
  };

  getChildContext() {
    const { theme } = this.props;
    return {
      rebass: theme,
      // TODO: We are not there yet. github.com/este/este/issues/1120
      // reflexbox: {
      //   breakpoints: {
      //     // github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss#L126
      //     sm: '(min-width: 0)',
      //     md: '(min-width: 544px)',
      //     lg: '(min-width: 768px)'
      //   }
      // }
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }

}

export default ThemeProvider;
