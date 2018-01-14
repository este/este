// @flow
import * as React from 'react';
import Set, { type SetProps } from '../Set';

class EditorMenuSection extends React.PureComponent<SetProps> {
  render() {
    const { marginBottom = 0, ...props } = this.props;
    return <Set marginBottom={marginBottom} {...props} />;
  }
}

export default EditorMenuSection;
