import Component from '../../components/component.react';
import Flux from './flux';
import React from 'react';
import Router from 'react-router';
import fetchData from '../fetchdata';

function now() {
  const hasBrowserPerformanceNow =
    process.env.IS_BROWSER && window.performance && window.performance.now;
  return hasBrowserPerformanceNow
    ? window.performance.now()
    : Date.now();
}

export default function decorate(store) {

  return BaseComponent => class Decorator extends Component {

    static propTypes = {
      initialState: React.PropTypes.object
    };

    static _flux = false;

    static run(container, routes, initialState) {
      Router.run(routes, Router.HistoryLocation, (Handler, routerState) => {
        let appState = (Decorator._flux && Decorator._flux.state.toJS()) || initialState;
        if (Decorator._flux)
          fetchData(routerState, appState).then(fullState => {
            if (fullState)
              Decorator._flux.load(fullState);
          });
        React.render(<Handler initialState={appState} />, container);
      });
    }

    constructor(props) {
      super(props);
      this.onFluxDispatch = ::this.onFluxDispatch;
    }

    componentWillMount() {
      this.fluxify();
    }

    // Always use componentWillUnmount where componentWillMount is used.
    componentWillUnmount() {
      Decorator._flux.removeListener('dispatch', this.onFluxDispatch);
    }

    fluxify() {
      if (Decorator._flux) Decorator._flux.removeListener('dispatch', this.onFluxDispatch);
      Decorator._flux = new Flux(store, this.props.initialState);
      Decorator._flux.on('dispatch', this.onFluxDispatch);
      this.onFluxDispatch();
    }

    onFluxDispatch() {
      const state = {...Decorator._flux.state.toObject(), flux: Decorator._flux};
      const start = now();
      this.setState(state, () => {
        const total = now() - start;
        Decorator._flux.emit('render', total);
      });
    }

    componentWillReceiveProps() {
      this.ensureStoreAfterHotReload();
    }

    ensureStoreAfterHotReload() {
      try {
        Decorator._flux.store = store;
      } catch(err) {
        this.fluxify();
      }
    }

    render() {
      return <BaseComponent {...this.state} />;
    }

  };

}
