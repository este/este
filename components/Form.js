// @flow
import * as React from 'react';
import Box, { type BoxProps } from './Box';
import Theme from './Theme';

// Render form as form in browser, because auth data or whatever pre-filling.
type BrowserFormProps = {
  onSubmit: () => void,
};

class BrowserForm extends React.PureComponent<BrowserFormProps> {
  static handleSubmit = (e: Event) => {
    e.preventDefault();
  };

  handleKeyPress = (e: KeyboardEvent) => {
    if (e.target.tagName !== 'INPUT') return;
    if (e.key !== 'Enter') return;
    if (typeof this.props.onSubmit !== 'function') return;
    this.props.onSubmit();
  };

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <form
        {...this.props}
        onKeyPress={this.handleKeyPress}
        onSubmit={BrowserForm.handleSubmit}
      />
    );
  }
}

type FormProps = {
  onSubmit?: () => any,
} & BoxProps;

class Form extends React.PureComponent<FormProps> {
  render() {
    return (
      <Theme>
        {theme => {
          const {
            as = BrowserForm,
            marginBottom = theme.form.marginBottom,
            maxWidth = theme.form.maxWidth,
            ...props
          } = this.props;
          return (
            <Box
              as={as}
              marginBottom={marginBottom}
              maxWidth={maxWidth}
              {...props}
            />
          );
        }}
      </Theme>
    );
  }
}

export default Form;
