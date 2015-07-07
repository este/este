import * as state from './state';

const isBrowser = process.env.IS_BROWSER;

export function measureRender(callback) {
  const measureRenderEnabled = isBrowser && window.este.measureRender;
  if (measureRenderEnabled)
    console.time('app render'); // eslint-disable-line no-console
  callback(() => {
    if (measureRenderEnabled)
      console.timeEnd('app render'); // eslint-disable-line no-console
  });
}

if (isBrowser) {

  window.este = {

    measureRender: false,

    loadState() {
      const stateStr = window.prompt('Paste the serialized state into the input.'); // eslint-disable-line no-alert
      if (!stateStr) return;
      const newState = JSON.parse(stateStr);
      state.appState.load(newState);
    },

    saveState() {
      window._appState = state.appState.save();
      window._appStateString = JSON.stringify(window._appState);
      console.log('App state saved. To copy app state into clipboard, type copy(_appStateString) and press enter.'); // eslint-disable-line no-console
      console.log(window._appState); // eslint-disable-line no-console
    }

  };

  document.addEventListener('keypress', e => {
    if (!e.ctrlKey || !e.shiftKey) return;
    switch (e.keyCode) {
      // ctrl+shift+l
      case 12: este.loadState(); break; // eslint-disable-line no-undef
      // ctrl+shift+s
      case 19: este.saveState(); break; // eslint-disable-line no-undef
    }
  });

}
