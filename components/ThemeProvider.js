// @flow
import * as React from 'react';
import type { Theme } from '../themes/types';
import PropTypes from 'prop-types';

type Props = {
  theme: Theme,
  children?: React.Node,
};

class ThemeProvider extends React.Component<Props> {
  static childContextTypes = {
    theme: PropTypes.object,
  };

  getChildContext() {
    return { theme: this.props.theme };
  }

  render() {
    return this.props.children;
  }
}

export default ThemeProvider;
