// @flow
import * as React from 'react';
import { EditorMenuInput } from './EditorMenu';

type EditorMenuInputsProps<O> = {|
  schema: Object,
  object: O,
  onChange: (object: O) => void,
|};

class EditorMenuInputs extends React.PureComponent<EditorMenuInputsProps<*>> {
  handleChange = (value: string, name: string) => {
    this.props.onChange({ ...this.props.object, [name]: value });
  };

  render() {
    const { schema, object } = this.props;
    return Object.keys(schema.properties).map((key, index, array) => (
      <EditorMenuInput
        name={key}
        value={object[key].toString()}
        key={key}
        schema={schema.properties[key]}
        last={index === array.length - 1}
        onChange={this.handleChange}
      />
    ));
  }
}

export default EditorMenuInputs;
