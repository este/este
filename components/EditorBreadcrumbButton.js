// @flow
import * as React from 'react';
import Button, { type ButtonProps } from './core/Button';

class EditorBreadcrumbButton extends React.PureComponent<ButtonProps> {
  handlePressIn = (event: Event) => {
    event.preventDefault();
  };

  render() {
    return (
      <Button color="gray" {...this.props} onPressIn={this.handlePressIn} />
    );
  }
}

export default EditorBreadcrumbButton;
