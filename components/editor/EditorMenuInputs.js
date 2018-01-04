// @flow
import * as React from 'react';
import { EditorMenuInput } from './EditorMenu';

type EditorMenuInputsProps = {|
  schema: Object,
  object: Object,
|};

class EditorMenuInputs extends React.PureComponent<EditorMenuInputsProps> {
  render() {
    const { schema, object } = this.props;
    return (
      Object.keys(schema.properties)
        // .filter(key => key in object)
        .map((key, index, array) => (
          <EditorMenuInput
            name={key}
            value={object[key].toString()}
            key={key}
            schema={schema.properties[key]}
            last={index === array.length - 1}
          />
        ))
    );
  }
}

export default EditorMenuInputs;
