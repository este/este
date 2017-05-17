// @flow
import type { FieldName, FunctionalComponent, State, Store } from '../types';
import PropTypes from 'prop-types';
import React from 'react';
import { setField } from '../lib/fields/actions';

type FieldNames = Array<FieldName>;

type GetId = (props: Object) => string;

type WrappedComponent = FunctionalComponent<{
  // TODO: Restrict FieldName by passed fieldNames somehow.
  fields: {
    [fieldName: FieldName]: { name: FieldName, value: any, onChange: any },
  },
}>;

type FieldsContext = { store: Store };

const createFieldsProps = (
  fieldNames: FieldNames,
  id: string,
  props: Object,
  context: FieldsContext
) => {
  const { store } = context;
  const { initial, changed } = store.getState().fields;
  const changedById = changed[id];
  return fieldNames.reduce((props, fieldName) => {
    const fieldValue = changedById && changedById.hasOwnProperty(fieldName)
      ? changedById[fieldName]
      : initial[fieldName];
    return {
      ...props,
      [fieldName]: {
        name: fieldName,
        value: fieldValue,
        onChange: (e: Event & { currentTarget: { value: mixed } }) => {
          const action = setField(id, fieldName, e.currentTarget.value);
          store.dispatch(action);
        },
      },
    };
  }, {});
};

const fields = (fieldNames: FieldNames, getId: GetId = props => '') => (
  WrappedComponent: WrappedComponent
) =>
  class Fields extends React.Component {
    static contextTypes = { store: PropTypes.object };

    state: { fields: Object };

    unsubscribe: () => void;

    context: FieldsContext;

    constructor(props: Object, context: FieldsContext) {
      super(props);
      this.state = {
        fields: createFieldsProps(fieldNames, getId(props), props, context),
      };
    }

    componentDidMount() {
      const { store } = this.context;
      this.unsubscribe = store.subscribe(() => {
        const { changed } = store.getState().fields;
        const changedById = changed[getId(this.props)];
        const stateFields = this.state.fields;
        const hasChange =
          changedById &&
          fieldNames.some(
            fieldName => stateFields[fieldName].value !== changedById[fieldName]
          );
        if (!hasChange) return;
        this.setState(prevState => {
          const newState = { ...prevState };
          fieldNames.forEach(fieldName => {
            if (!changedById.hasOwnProperty(fieldName)) return;
            newState.fields[fieldName].value = changedById[fieldName];
          });
          return newState;
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
