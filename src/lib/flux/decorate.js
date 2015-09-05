import Flux from './flux';
import React from 'react-native';

export default function decorate(store) {

  return BaseComponent => class Decorator extends React.Component {

    static propTypes = {
      initialState: React.PropTypes.object
    }

    constructor(props) {
      super(props);
      this.onFluxDispatch = this.onFluxDispatch.bind(this);
    }

    componentWillMount() {
      this.fluxify();
    }

    componentWillUnmount() {
      this.flux.removeListener('dispatch', this.onFluxDispatch);
    }

    fluxify() {
      if (this.flux) this.flux.removeListener('dispatch', this.onFluxDispatch);
      this.flux = new Flux(store, this.props.initialState);
      this.flux.on('dispatch', this.onFluxDispatch);
      this.onFluxDispatch();
    }

    onFluxDispatch() {
      const state = {...this.flux.state.toObject(), flux: this.flux};
      this.setState(state);
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
