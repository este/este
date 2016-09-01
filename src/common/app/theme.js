/* @flow */
import React from 'react';
import { connect } from 'react-redux';

const theme = (WrappedComponent: Function, themes: Object) => {
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
      const theme = themes[currentTheme] || themes[defaultTheme];
      return {
        rebass: { ...theme, pureRender: true }, // rebass pure render
      };
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }

  }

  return connect(state => ({
    currentTheme: state.themes.currentTheme,
  }))(Theme);
};

export default theme;
