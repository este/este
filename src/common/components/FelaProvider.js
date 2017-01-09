// @flow
import React from 'react';
import { Provider as Fela } from 'react-fela';

// Enhanced Fela provider for universal components.
// TODO: Send PR to Fela.

export default class FelaProvider extends React.Component {
  static propTypes = {
    Text: React.PropTypes.func.isRequired,
    View: React.PropTypes.func.isRequired,
    renderer: React.PropTypes.object.isRequired,
  };

  static childContextTypes = {
    Text: React.PropTypes.func.isRequired,
    View: React.PropTypes.func.isRequired,
  };

  getChildContext() {
    const { Text, View } = this.props;
    return { Text, View };
  }

  render() {
    const { children, renderer } = this.props;
    return (
      <Fela renderer={renderer}>
        {React.Children.only(children)}
      </Fela>
    );
  }
}
