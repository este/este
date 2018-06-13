// @flow
import * as React from 'react';
import withTheme, { type Theme } from './withTheme';
import { View } from 'react-native';

// TODO: Rename to Form.web.js, add native Form.js.

type FormProps = {|
  children?: React.Node,
  onSubmit?: () => void,
  theme: Theme,
|};

class Form extends React.PureComponent<FormProps> {
  static handleSubmit = (e: Event) => {
    e.preventDefault();
  };

  // Submit on any input key enter.
  handleKeyPress = (e: KeyboardEvent) => {
    // $FlowFixMe It's fine.
    if (e.target.tagName !== 'INPUT') return;
    if (e.key !== 'Enter') return;
    if (typeof this.props.onSubmit !== 'function') return;
    this.props.onSubmit();
    e.preventDefault();
  };

  render() {
    return (
      <View
        accessibilityRole="form"
        style={this.props.theme.styles.form}
        onSubmit={Form.handleSubmit}
        onKeyPress={this.handleKeyPress}
      >
        {this.props.children}
      </View>
    );
  }
}

export default withTheme(Form);
