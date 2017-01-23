// @flow
import React from 'react';
import { Provider as Fela } from 'react-fela';

// Enhanced Fela provider for universal components.
// TODO: Send PR to Fela.

export default class FelaProvider extends React.Component {
  static propTypes = {
    Button: React.PropTypes.func.isRequired,
    Text: React.PropTypes.func.isRequired,
    TextInput: React.PropTypes.func.isRequired,
    View: React.PropTypes.func.isRequired,
    renderer: React.PropTypes.object.isRequired,
  };

  static childContextTypes = {
    Button: React.PropTypes.func.isRequired,
    Text: React.PropTypes.func.isRequired,
    TextInput: React.PropTypes.func.isRequired,
    View: React.PropTypes.func.isRequired,
  };

  getChildContext() {
    const { Button, Text, TextInput, View } = this.props;
    return { Button, Text, TextInput, View };
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
