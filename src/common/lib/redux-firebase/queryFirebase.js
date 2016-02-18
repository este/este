// Higher order component for declarative Firebase queries.
// No more on / off madness.

import * as actions from './actions';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

export default function queryFirebase(Wrapped, mapPropsToQuery) {

  return class FirebaseQuery extends Component {

    static contextTypes = {
      store: PropTypes.object // Redux store.
    };

    dispatch(actionType, props, query) {
      const {store} = this.context;
      store.dispatch({
        type: actionType,
        payload: {component: this, props, query}
      });
    }

    // TODO: Add componentWillMount for server rendering.

    componentDidMount() {
      const query = mapPropsToQuery(this.props);
      this.dispatch(actions.REDUX_FIREBASE_ON_QUERY, this.props, query);
    }

    // componentDidUpdate(prevProps) {
    //   const prev = mapPropsToQuery(prevProps);
    //   const next = mapPropsToQuery(this.props);
    //   // TODO: Add check whether child has been changed.
    //   this.dispatch(actions.REDUX_FIREBASE_OFF_QUERY, prevProps, prevQuery);
    //   this.dispatch(actions.REDUX_FIREBASE_ON_QUERY, this.props, nextQuery);
    // }

    componentWillUnmount() {
      const query = mapPropsToQuery(this.props);
      this.dispatch(actions.REDUX_FIREBASE_OFF_QUERY, this.props, query);
    }

    render() {
      return <Wrapped {...this.props} />;
    }

  };
}
