// @flow
import * as React from 'react';
import withTheme, { type Theme } from './withTheme';
import { View } from 'react-native';

type FormProps = {|
  children?: React.Node,
  theme: Theme,
|};

class Form extends React.PureComponent<FormProps> {
  render() {
    return (
      <View style={this.props.theme.styles.form}>{this.props.children}</View>
    );
  }
}

export default withTheme(Form);
