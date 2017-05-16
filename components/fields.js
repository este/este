// @flow
import type { Fields, State } from '../types';
import PropTypes from 'prop-types';
import React from 'react';
import { setFields } from '../lib/fields/actions';

type Options = {|
  +fields: Array<$Keys<Fields>>,
|};

type StatelessComponent<P> = (props: P) => ?React$Element<any>;

// TODO: This is cheating. We should generate only selected fields types.
type WrappedComponent = StatelessComponent<{ fields: Fields }>;

const fields = (options: Options) => (WrappedComponent: WrappedComponent) =>
  class Fields extends React.Component {
    static contextTypes = {
      store: PropTypes.object, // Redux store.
    };

    state: { fields: Fields };

    unsubscribe: () => void;

    constructor(props: *, context: *) {
      super(props);
      this.state = {
        fields: context.store.getState().fields,
      };
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
      // TODO: Check via options.fields.
      return true;
    }

    componentDidMount() {
      const { store } = this.context;
      this.unsubscribe = store.subscribe(() => {
        this.setState({ fields: store.getState().fields });
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      // const fields = options.fields.reduce((props, fieldName) => ({
      //   ...props,
      //   [fieldName]:
      // }), {})

      // const { store } = this.context;
      // console.log(store.getState().fields);
      //     // const changed = state.fields.changed['1'];
      //     // const fields = [
      //     //   'userName',
      //     //   'userDescription',
      //     // ].reduce((props, fieldName) => {
      //     //   return {
      //     //     ...props,
      //     //     [fieldName]: (changed &&
      //     //       // proc? je to ok?
      //     //       typeof changed[fieldName] !== undefined &&
      //     //       changed[fieldName]) ||
      //     //       state.fields.initial[fieldName],
      //     //     // [fieldName]: changed && typeof changed[fieldName] !== undefined
      //     //     //   ? changed[fieldName]
      //     //     //   : state.fields.initial[fieldName],
      //     //   };
      //     // }, {});

      const props = {
        ...this.props,
      };
      return <WrappedComponent {...props} />;
    }
  };

export default fields;

// declare class HTMLButtonElement extends HTMLElement {
//   disabled: boolean;
//   form: HTMLFormElement | null;
//   name: string;
//   type: string;
//   value: string;
// }

// const NewUserForm = connect(
//   (state: State) => {
//   },
//   { setFields }
// )(UserForm);
