/* @flow */
import * as themes from './themes';
import React from 'react';
import { connect } from 'react-redux';

class Theme extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    currentTheme: React.PropTypes.string,
    defaultTheme: React.PropTypes.string.isRequired,
  };

  static defaultProps = {
    defaultTheme: 'initial',
  };

  // github.com/jxnblk/rebass#configuration
  static childContextTypes = {
    rebass: React.PropTypes.object,
  };

  getChildContext() {
    const { currentTheme, defaultTheme } = this.props;
    return {
      rebass: themes[currentTheme] || themes[defaultTheme],
    };
  }

  render() {
    const { children } = this.props;
    const {
      backgroundColor,
      color,
      fontFamily,
      fontSize,
      lineHeight,
    } = this.getChildContext().rebass;
    const style = {
      backgroundColor,
      color, // inherited
      fontFamily, // inherited
      fontSize, // inherited
      lineHeight, // inherited
    };
    return (
      <div style={style}>
        {children}
      </div>
    );
  }

}

export default connect(state => ({
  currentTheme: state.themes.currentTheme,
}))(Theme);
