import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import invariant from 'invariant';
import {resetFields, setField} from './actions';

// Higher order component for huge fast dynamic deeply nested universal forms.
export default function fields(Wrapped, options) {
  const {
    fields = [],
    path = ''
  } = options;

  invariant(Array.isArray(fields), 'Fields must be an array.');
  invariant((
    (typeof path === 'string') ||
    Array.isArray(path) ||
    (typeof path === 'function')
  ), 'Path must be string, array, or function.');
  if (typeof path === 'function')
    invariant(Array.isArray(path({})), 'Path function must return an array.');

  return class Fields extends Component {

    static contextTypes = {
      store: PropTypes.object // Redux store.
    };

    static getNormalizePath(props) {
      switch (typeof path) {
        case 'function': return path(props);
        case 'string': return [path];
        default: return path;
      }
    }

    static getFieldsValues(model) {
      // http://www.devthought.com/2012/01/18/an-object-is-not-a-hash
      const values = Object.create(null);
      options.fields.forEach(field => {
        values[field] = model && model.get(field) || '';
      });
      return values;
    }

    constructor(props) {
      super(props);
      this.createFields();
    }

    createFields() {
      this.fields = Object.create(null);
      this.fields.$values = () => Fields.getFieldsValues(this.getModel());
      this.fields.$reset = () => {
        const normalizedPath = Fields.getNormalizePath(this.props);
        this.context.store.dispatch(resetFields(normalizedPath));
      };
      options.fields.forEach(field => {
        // TODO: Detect in library somehow. Imho native propagates itself.
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

    onChange(field, value) {
      const normalizedPath = Fields.getNormalizePath(this.props).concat(field);
      this.context.store.dispatch(setField(normalizedPath, value));
    }

    getModel() {
      const normalizedPath = Fields.getNormalizePath(this.props);
      return this.context.store.getState().reduxFields.getIn(normalizedPath);
    }

    componentWillUnmount() {
      this.fields = null; // To help GC.
    }

    render() {
      const model = this.getModel();
      const fieldsValues = Fields.getFieldsValues(model);
      // Only update fields values.
      options.fields.forEach(field => {
        this.fields[field].value = fieldsValues[field];
      });
      // Note component rerender is enforced via model property.
      // TODO: Musi resit connect, model nemam co predavat, ok.
      return <Wrapped {...this.props} fields={this.fields} model={model} />;
    }

  };
}
