// @flow
import React from 'react';
import { Provider as Fela } from 'react-fela';

// Enhance Fela provider for universal base components.
export default class FelaProvider extends React.Component {
  static propTypes = {
    Button: React.PropTypes.func.isRequired,
    Image: React.PropTypes.func.isRequired,
    Text: React.PropTypes.func.isRequired,
    TextInput: React.PropTypes.func.isRequired,
    View: React.PropTypes.func.isRequired,
    mountNode: React.PropTypes.object,
    renderer: React.PropTypes.object.isRequired,
  };

  static childContextTypes = {
    Button: React.PropTypes.func,
    Image: React.PropTypes.func,
    Text: React.PropTypes.func,
    TextInput: React.PropTypes.func,
    View: React.PropTypes.func,
  };

  getChildContext() {
    const { Button, Image, Text, TextInput, View } = this.props;
    return { Button, Image, Text, TextInput, View };
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
