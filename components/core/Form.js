// @flow
import * as React from 'react';
import Theme from './Theme';
import { View } from 'react-native';

// TODO: Rename to Form.web.js, add native Form.js.

type FormProps = {|
  children?: React.Node,
  onSubmit?: () => void,
|};

class Form extends React.PureComponent<FormProps> {
  static handleSubmit = (e: Event) => {
    e.preventDefault();
  };

  handleKeyPress = (e: KeyboardEvent) => {
    // Submit on any input key enter.
    if (e.target.tagName !== 'INPUT') return;
    if (e.key !== 'Enter') return;
    if (typeof this.props.onSubmit !== 'function') return;
    this.props.onSubmit();
  };

  render() {
    return (
      <Theme>
        {theme => (
          <View
            accessibilityRole="form"
            style={theme.styles.form}
            onSubmit={Form.handleSubmit}
            onKeyPress={this.handleKeyPress}
          >
            {this.props.children}
          </View>
        )}
      </Theme>
    );
  }
}

export default Form;
