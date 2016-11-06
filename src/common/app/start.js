import React from 'react';
import { connect } from 'react-redux';
import { start as appStart } from './actions';

const start = (WrappedComponent: Function) => {
  let appStarted = false;

  class Start extends React.Component {

    static propTypes = {
      appStart: React.PropTypes.func.isRequired,
    };

    componentDidMount() {
      const { appStart } = this.props;
      // The appStart must be called after the initial render, because
      // componentDidMount is not called on the server. Because hot reloading,
      // we have to call appStart only once.
      if (appStarted) return;
      appStarted = true;
      appStart();
    }

    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }

  }

  Start = connect(null, { appStart })(Start);

  return Start;
};


export default start;
