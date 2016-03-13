import Component from 'react-pure-render/component';

export const SET_CURRENT_LOCALE = 'SET_CURRENT_LOCALE';

const shouldComponentUpdate = Component.prototype.shouldComponentUpdate;

export function setCurrentLocale(locale) {
  // This is hideous but very practical hack.
  // Disable shouldComponentUpdate temporally to force rerender everything.
  // https://github.com/facebook/react/issues/2517
  delete Component.prototype.shouldComponentUpdate;
  setTimeout(() => {
    Component.prototype.shouldComponentUpdate = shouldComponentUpdate;
  }, 10);
  return {
    type: SET_CURRENT_LOCALE,
    payload: { locale }
  };
}
