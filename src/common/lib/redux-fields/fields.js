import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import invariant from 'invariant';
import {resetFields, setField} from './actions';

const isReactNative =
  typeof navigator === 'object' &&
  navigator.product === 'ReactNative';

// Higher order component for huge fast dynamic deeply nested universal forms.
export default function fields(Wrapped, options) {
  const {
    path = '',
    fields = [],
    getInitialState
  } = options;

  invariant(Array.isArray(fields), 'Fields must be an array.');
  invariant((
    (typeof path === 'string') ||
    (typeof path === 'function') ||
    Array.isArray(path)
  ), 'Path must be a string, function, or an array.');

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

    static getFieldValue(field, model, props) {
      if (model && model.has(field)) {
        return model.get(field);
      }
      const initialState = getInitialState && getInitialState(props);
      if (initialState && initialState.hasOwnProperty(field)) {
        return initialState[field];
      }
      return '';
    }

    static lazyJsonValuesOf(model, props) {
      // http://www.devthought.com/2012/01/18/an-object-is-not-a-hash
      return options.fields.reduce((fields, field) => ({
        ...fields,
        [field]: Fields.getFieldValue(field, model, props)
      }), Object.create(null));
    }

    static createFieldObject(field, onChange) {
      return isReactNative ? {
        onChangeText: text => {
          onChange(field, text);
        }
      } : {
        name: field,
        onChange: e => {
          onChange(field, e.target.value);
        }
      };
    }

    constructor(props) {
      super(props);
      this.state = {
        model: null
      };
      this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFieldChange(field, value) {
      const normalizedPath = Fields.getNormalizePath(this.props).concat(field);
      this.context.store.dispatch(setField(normalizedPath, value));
    }

    createFields() {
      const formFields = options.fields.reduce((fields, field) => ({
        ...fields,
        [field]: Fields.createFieldObject(field, this.onFieldChange)
      }), {});

      this.fields = {
        ...formFields,
        $values: () => this.values,
        $reset: () => {
          const normalizedPath = Fields.getNormalizePath(this.props);
          this.context.store.dispatch(resetFields(normalizedPath));
        }
      };
    }

    getModelFromState() {
      const normalizedPath = Fields.getNormalizePath(this.props);
      return this.context.store.getState().reduxFields.getIn(normalizedPath);
    }

    setModel(model) {
      this.values = Fields.lazyJsonValuesOf(model, this.props);
      options.fields.forEach(field => {
        this.fields[field].value = this.values[field];
      });
      this.fields = {...this.fields}; // Ensure rerender for pure components.
      this.setState({model});
    }

    componentWillMount() {
      this.createFields();
      this.setModel(this.getModelFromState());
    }

    componentDidMount() {
      const {store} = this.context;
      this.unsubscribe = store.subscribe(() => {
        const newModel = this.getModelFromState();
        if (newModel === this.state.model) return;
        this.setModel(newModel);
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
      this.fields = null;
    }

    render() {
      return <Wrapped {...this.props} fields={this.fields} />;
    }

  };
}
