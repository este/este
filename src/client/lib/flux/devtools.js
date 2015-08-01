import Component from '../../components/component.react';
import React from 'react';

export default function devTools(BaseComponent) {

  return class DevTools extends Component {

    static propTypes = {
      flux: React.PropTypes.object.isRequired
    }

    constructor(props) {
      super(props);
      this.history = [this.props.flux.state];
      this.onDocumentKeyPress = ::this.onDocumentKeyPress;
      this.onFluxDispatch = ::this.onFluxDispatch;
      this.onFluxRender = ::this.onFluxRender;
    }

    componentWillMount() {
      document.addEventListener('keypress', this.onDocumentKeyPress);
      this.props.flux.on('dispatch', this.onFluxDispatch);
      this.props.flux.on('render', this.onFluxRender);
    }

    componentWillUnmount() {
      document.removeEventListener('keypress', this.onDocumentKeyPress);
      this.props.flux.removeListener('dispatch', this.onFluxDispatch);
      this.props.flux.removeListener('render', this.onFluxRender);
    }

    onDocumentKeyPress({ctrlKey, shiftKey, keyCode}) {
      if (!ctrlKey || !shiftKey) return;
      switch (keyCode) {
      case 12: this.loadStateFromPrompt(); break; // eslint-disable-line no-undef
      case 19: this.saveStateToConsole(); break; // eslint-disable-line no-undef
      }
    }

    onFluxDispatch(state, action, payload, meta) {
      // TODO: Store only several last states on production.
      // if (process.env.NODE_ENV === 'production') ...
      this.history.push({state, action, payload, meta});
      this.logDispatch();
    }

    onFluxRender(total) {
      this.log(`render ${total.toFixed(2)}ms`);
    }

    logDispatch() {
      const last = this.history[this.history.length - 1];
      const {action, meta} = last;
      const feature = meta && meta.feature;
      const actionName = action && action.name;
      this.log(feature + '/' + actionName);
    }

    // ctrl+shift+l
    loadStateFromPrompt() {
      const stateStr = window.prompt('Paste the serialized state into the input.'); // eslint-disable-line no-alert
      if (!stateStr) return;
      const newState = JSON.parse(stateStr);
      this.props.flux.load(newState);
      this.log('App state loaded');
    }

    // ctrl+shift+s
    saveStateToConsole() {
      const appStateJson = this.props.flux.state.toJS();
      window._savedAppState = JSON.stringify(appStateJson);
      this.log('App state saved. Copy to clipboard: copy(_savedAppState)'); // eslint-disable-line no-console
      this.log(appStateJson); // eslint-disable-line no-console
    }

    log(msg) {
      // TODO: Add UI toggle, consider move logging to dev tools UI.
      console.log('[este]', msg); // eslint-disable-line no-console
    }

    render() {
      return <BaseComponent {...this.props} />;
    }

  };

}
