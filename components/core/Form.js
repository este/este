// @flow
import * as React from 'react';
import Theme from './Theme';
import { View } from 'react-native';

// TODO: Rename to Form.web.js, add native Form.js.

// https://stackoverflow.com/questions/2781549/removing-input-background-colour-for-chrome-autocomplete/32505530#32505530
const DisableWebkitAutofillColor = () => (
  <style jsx global>{`
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
      -webkit-transition-delay: 9999s;
    }
  `}</style>
);

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
            style={theme.styles.form.view}
            onSubmit={Form.handleSubmit}
            onKeyPress={this.handleKeyPress}
          >
            <DisableWebkitAutofillColor />
            {this.props.children}
          </View>
        )}
      </Theme>
    );
  }
}

export default Form;
