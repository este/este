import state from './state'

export function toJS() {
  return state.save()
}

export function addChangeListener(listener) {
  state.on('change', listener)
}

export function removeChangeListener(listener) {
  state.removeEventListener('change', listener)
}

export default function(name, factory) {
  state.set(state.get().set(name, factory(process.env.IS_BROWSER
    ? window._appState[name]
    : null)))
  return state.cursor([name])
}
