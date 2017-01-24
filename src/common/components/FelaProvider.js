// @flow
import React from 'react';
import { Provider as Fela } from 'react-fela';

// Enhance Fela provider for universal base components.
export default class FelaProvider extends React.Component {
  static propTypes = {
    Button: React.PropTypes.func.isRequired,
    Text: React.PropTypes.func.isRequired,
    TextInput: React.PropTypes.func.isRequired,
    View: React.PropTypes.func.isRequired,
    renderer: React.PropTypes.object.isRequired,
    mountNode: React.PropTypes.object,
  };

  static childContextTypes = {
    Button: React.PropTypes.func,
    Text: React.PropTypes.func,
    TextInput: React.PropTypes.func,
    View: React.PropTypes.func,
  };

  getChildContext() {
    const { Button, Text, TextInput, View } = this.props;
    return { Button, Text, TextInput, View };
  }

  render() {
    const { children, mountNode, renderer } = this.props;
    return (
      <Fela mountNode={mountNode} renderer={renderer}>
        {React.Children.only(children)}
      </Fela>
    );
  }
}
