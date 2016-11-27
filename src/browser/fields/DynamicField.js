/* @flow */
import React from 'react';
import { Input, View } from '../app/components';
import { fields } from '../../common/lib/redux-fields';

type Props = {
  disabled?: boolean,
  fields: Object,
  item: Object,
};

const DynamicField = ({ disabled, fields, item }: Props) => (
  <View>
    <Input
      {...fields.name}
      // This is just an example of aria-invalid and changed value.
      aria-invalid={fields.name.value !== item.name}
      disabled={disabled}
      label=""
      maxLength={100}
      type="text"
    />
  </View>
);

export default fields({
  path: props => props.path,
  fields: ['name'],
  getInitialState: props => props.item,
})(DynamicField);
