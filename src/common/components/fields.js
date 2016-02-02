import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {deleteField, setField} from '../fields/actions';

// Higher order component for huge fast dynamic deeply nested universal forms.
export default function fields(Wrapped, options) {
  return class Fields extends Component {

    static contextTypes = {
      store: PropTypes.object // Redux store.
    };

    // Path can be string, array, or function for lazy path definition.
    static normalizePath(props) {
      const {path} = options;
      switch (typeof path) {
        case 'function': return path(props);
        case 'string': return [path];
        default: return path;
      }
    }

    static getFieldsValues(model) {
      return options.fields.reduce((values, field) => ({
        ...values,
        [field]: model && model.get(field) || ''
      }), Object.create(null));
    }

    constructor(props) {
      super(props);
      this.createFields();
    }

    createFields() {
      // http://www.devthought.com/2012/01/18/an-object-is-not-a-hash
      this.fields = Object.create(null);
      this.fields.$values = this.getFieldsValues.bind(this);
      this.fields.$reset = this.resetFields.bind(this);
      options.fields.forEach(field => {
        this.fields[field] = process.env.IS_REACT_NATIVE ? {
          onChangeText: text => {
            this.onChange(field, text);
          }
        } : {
          name: field,
          onChange: e => {
            this.onChange(field, e.target.value);
          }
        };
      });
    }

    getFieldsValues() {
      return Fields.getFieldsValues(this.getModel());
    }

    resetFields() {
      const path = Fields.normalizePath(this.props);
      const action = deleteField(path);
      this.context.store.dispatch(action);
    }

    onChange(field, value) {
      const path = Fields.normalizePath(this.props).concat(field);
      const action = setField(path, value);
      this.context.store.dispatch(action);
    }

    getModel() {
      const path = Fields.normalizePath(this.props);
      // Note fields are always read from store directly. It's design decision.
      return this.context.store.getState().fields.getIn(path);
    }

    render() {
      const model = this.getModel();
      const fieldsValues = Fields.getFieldsValues(model);
      // Just update fields values.
      options.fields.forEach(field => {
        this.fields[field].value = fieldsValues[field];
      });
      // Note component rerender is enforced via model property.
      return <Wrapped {...this.props} fields={this.fields} model={model} />;
    }

  };
}
