import Component from '../components/component.react';
import EventEmitter from 'eventemitter3';
import React from 'react';

// That's all we need for hot reloadable atomic Flux.
// Thank you Samuel - https://github.com/vacuumlabs/vlux

class Flux extends EventEmitter {

  constructor(store, state) {
    super();
    this.store = store;
    this.state = store(state);
  }

  dispatch(action, payload) {
    this.state = this.store(this.state, action, payload);
    // console.log(this.state.toJS());
    this.emit('dispatch', this.state, action, payload);
  }

  load(state) {
    this.state = this.store(state);
    this.emit('dispatch', this.state);
  }

}

export default function flux(store) {

  return BaseComponent => class FluxDecorator extends Component {

    static propTypes = {
      initialState: React.PropTypes.object
    }

    componentWillMount() {
      this.fluxify();
    }

    componentWillUnmount() {
      this.flux.removeAllListeners();
    }

    fluxify() {
      if (this.flux) this.flux.removeAllListeners();
      this.flux = new Flux(store, this.props.initialState);
      this.flux.on('dispatch', ::this.setState);
      this.setState();
    }

    setState() {
      super.setState({...this.flux.state.toObject(), flux: this.flux});
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
