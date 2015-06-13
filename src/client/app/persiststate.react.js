import * as state from '../state';
import Component from '../components/component.react';
import React from 'react';

export default function persistState(BaseComponent) {

  class PersistState extends Component {

    componentDidMount() {
      document.addEventListener('keypress', (e) => {
        if (!e.ctrlKey || !e.shiftKey) return;
        switch (e.keyCode) {
          // ctrl+shift+s to save app state
          case 19:
            window._appState = state.state.save();
            window._appStateString = JSON.stringify(window._appState);
            /*eslint-disable no-console */
            console.log('App state saved.');
            console.log('To report error, type copy(_appStateString) and press enter.');
            console.log('To debug state, type _appState and press enter.');
            /*eslint-enable */
            break;
          // ctrl+shift+l to load app state
          case 12:
            const stateStr = window.prompt('Paste the serialized state into the input'); // eslint-disable-line no-alert
            const newState = JSON.parse(stateStr);
            if (!newState) return;
            state.state.load(newState);
            break;
        }
      });
    }

    render() {
      return <BaseComponent {...this.props} />;
    }

  }

  PersistState.displayName = `${BaseComponent.name}PersistState`;

  return PersistState;

}
