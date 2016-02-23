import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';

export default function fetch(...actions) {
  return Wrapped => class Fetch extends Component {

    static contextTypes = {
      store: PropTypes.object // Redux store.
    };

    // Passed via react-router or can be passed manually in React Native.
    static propTypes = {
      location: PropTypes.object,
      params: PropTypes.object
    };

    // For server side fetching. Check frontend/render.js
    static fetchActions = actions;

    // For client side fetching.
    componentDidMount() {
      const { store: { dispatch } } = this.context;
      const { location, params } = this.props;
      actions.forEach(action => dispatch(action({ location, params })));
    }

    render() {
      return <Wrapped {...this.props} />;
    }

  };
}
