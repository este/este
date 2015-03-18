/* @flow */

import EventEmitter from 'eventemitter3'
import {Map, fromJS} from 'immutable'

let _emitter = new EventEmitter()
let _state   = Map()
let _savers  = Map()
let _loaders = Map()

export function save() {
  return get()
    .map((v, k) => (_savers.get(k) || (v => v.toJS()))(v))
    .toJS()
}

export function load(json) {
  set(Map(json)
    .map((v, k) => (_loaders.get(k) || (v => fromJS(v)))(v)))
}

export function set(state) {
  if (_state === state) return
  _state = state
  _emitter.emit('change')
}

export function get() {
  return _state
}

export function addChangeListener(listener:Function) {
  _emitter.on('change', listener)
}

export function removeChangeListener(listener:Function) {
  _emitter.removeEventListener('change', listener)
}

export function store({name, create, load, save}) {
  _savers  = _savers.set(name, save)
  _loaders = _loaders.set(name, load)

  set(_state.set(name, create()))

  return (update) => {
    if (update) {
      set(_state.update(name, update))
    } else {
      return _state.get(name)
    }
  }
}
