import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Seq} from 'immutable';
import {setField} from '../fields/actions';

// Higher order component for huge fast dynamic deeply nested universal forms.
export default function fields(Wrapped, options) {
  return class Fields extends Component {

    static contextTypes = {
      store: PropTypes.object // Redux store.
    };

    constructor(props) {
      super(props);
      this.fields = {
        toValues() {
          return Seq(this)
            .filter(field => typeof field !== 'function')
            .map(field => field.value)
            .toJS();
        }
      };
      options.fields.forEach(field => {
        this.fields[field] = {
          name: field,
          // TODO: Handle React Native custom events.
          onChange: (e) => this.onChange(field, e.target.value)
        };
      });
    }

    // Path can be string, array, function for lazy definition.
    normalizePath() {
      const {path} = options;
      switch (typeof path) {
        case 'function': return path(this.props);
        case 'string': return [path];
        default: return path;
      }
    }

    onChange(field, value) {
      const path = this.normalizePath().concat(field);
      const action = setField(path, value);
      this.context.store.dispatch(action);
    }

    render() {
      // Note fields are always read from store directly.
      // It's up to parent component to enforce child render via model property.
      // Example: <Todo model={fields.getIn(['todos', todo.id])} />
      // It's design decision. From top to bottom ftw.
      const path = this.normalizePath();
      const model = this.context.store.getState().fields.getIn(path);
      // Just update fields values. Rerender is enforced via model property.
      options.fields.forEach(field => {
        const value = model && model.get(field) || '';
        this.fields[field].value = value;
      });
      return <Wrapped {...this.props} fields={this.fields} model={model} />;
    }

  };
}
