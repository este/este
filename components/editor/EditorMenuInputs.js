// @flow
import * as React from 'react';
import { EditorMenuInput } from './EditorMenu';

type EditorMenuInputsProps = {|
  schema: Object,
  object: Object,
|};

const EditorMenuInputs = ({ schema, object }: EditorMenuInputsProps) =>
  Object.keys(schema.properties)
    .filter(key => key in object)
    .map(key => (
      <EditorMenuInput
        name={key}
        value={object[key].toString()}
        key={key}
        schema={schema.properties[key]}
      />
    ));

export default EditorMenuInputs;
