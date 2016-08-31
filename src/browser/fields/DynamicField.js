/* @flow */
import React from 'react';
import classnames from 'classnames';
import { fields } from '../../common/lib/redux-fields';

const DynamicField = ({ fields, item }) => {
  const isDirty = () => fields.name.value !== item.name;

  return (
    <div className={classnames('dynamic-field', { 'is-dirty': isDirty() })}>
      <input
        {...fields.name}
        maxLength={100}
        type="text"
      />
    </div>
  );
};

DynamicField.propTypes = {
  fields: React.PropTypes.object.isRequired,
  item: React.PropTypes.object.isRequired,
};

export default fields(DynamicField, {
  path: props => ['fieldsPage', 'dynamicFields', props.item.id],
  fields: ['name'],
  getInitialState: props => props.item,
});
