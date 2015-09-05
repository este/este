import Component from '../../components/component.react';
import FluxClass from './flux';
import React from 'react';
import invariant from 'invariant';

// https://developers.google.com/web/updates/2012/08/When-milliseconds-are-not-enough-performance-now?hl=en
function now() {
  const hasBrowserPerformanceNow =
    process.env.IS_BROWSER && window.performance && window.performance.now;
  return hasBrowserPerformanceNow
    ? window.performance.now()
    : Date.now();
}

export default function flux(store) {

  invariant(
    typeof store === 'function',
    `@flux(...): Store must be a pure function, ${typeof store} given`
  );

  return BaseComponent => class Flux extends Component {

    static propTypes = {
      initialState: React.PropTypes.object
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
      this.flux.removeListener('dispatch', this.onFluxDispatch);
    }

    fluxify() {
      if (this.flux) this.flux.removeListener('dispatch', this.onFluxDispatch);
      this.flux = new FluxClass(store, this.props.initialState);
      this.flux.on('dispatch', this.onFluxDispatch);
      this.onFluxDispatch();
    }

    onFluxDispatch() {
      const state = {...this.flux.state.toObject(), flux: this.flux};
      const start = now();
      this.setState(state, () => {
        const total = now() - start;
        this.flux.emit('render', total);
      });
    }

    componentWillReceiveProps() {
      this.ensureStoreAfterHotReload();
    }

    ensureStoreAfterHotReload() {
      this.flux.store = store;
    }

    render() {
      return <BaseComponent {...this.state} />;
    }

  };

}
