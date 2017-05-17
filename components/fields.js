// @flow
import type { Fields, FunctionalComponent, State, Store } from '../types';
import PropTypes from 'prop-types';
import React from 'react';
import { setField } from '../lib/fields/actions';

type FieldNames = Array<$Keys<Fields>>;

type GetId = (props: Object) => string;

type WrappedComponent = FunctionalComponent<{
  // TODO: Restrict type Fields by passed fieldNames somehow.
  fields: {
    [$Keys<Fields>]: {
      name: $Keys<Fields>,
      value: any,
      onChange: any,
    },
  },
}>;

type FieldsContext = { store: Store };

const fields = (fieldNames: FieldNames, getId: GetId = props => '') => (
  WrappedComponent: WrappedComponent
) =>
  class Fields extends React.Component {
    static contextTypes = {
      store: PropTypes.object, // Redux store.
    };

    state: { fields: Object };

    unsubscribe: () => void;

    context: FieldsContext;

    static createFieldsProps = (props: Object, context: FieldsContext) => {
      const { initial, changed } = context.store.getState().fields;
      const id = getId(props);
      const idChanged = changed[id];
      return fieldNames.reduce((props, fieldName) => {
        const fieldValue = idChanged && idChanged.hasOwnProperty(fieldName)
          ? idChanged[fieldName]
          : initial[fieldName];
        return {
          ...props,
          [fieldName]: {
            name: fieldName,
            value: fieldValue,
            onChange: (e: Event & { currentTarget: { value: mixed } }) => {
              const action = setField(id, fieldName, e.currentTarget.value);
              context.store.dispatch(action);
            },
          },
        };
      }, {});
    };

    constructor(props: Object, context: FieldsContext) {
      super(props);
      this.state = {
        fields: Fields.createFieldsProps(props, context),
      };
    }

    componentDidMount() {
      const { store } = this.context;
      this.unsubscribe = store.subscribe(() => {
        // const changed = store.getState().fields.changed[getId];
        // if (!changed) return;
        // porovnat fieldNames se state vysledkem, pokud nesedi..
        // pokud ma id changed, a prop se nerovna initial...
        this.setState({
          fields: Fields.createFieldsProps(this.props, this.context),
        });
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      return <WrappedComponent {...this.props} fields={this.state.fields} />;
    }
  };

export default fields;
