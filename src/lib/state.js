/* @flow */

import EventEmitter from 'eventemitter3'
import {Map, fromJS, KeyedCollection} from 'immutable'

const emitter = new EventEmitter()
let   state   = Map()
let   savers  = Map()
let   loaders = Map()

export function save() {
  return get()
    .map((v, k) => (savers.get(k) || (v => v.toJS()))(v))
    .toJS()
}

export function load(json:Object) {
  set(Map(json)
    .map((v, k) => (loaders.get(k) || (v => fromJS(v)))(v)))
}

export function set(newState:KeyedCollection) {
  if (state === newState) return
  state = newState
  emitter.emit('change')
}

export function get() {
  return state
}

export function addChangeListener(listener:Function) {
  emitter.on('change', listener)
}

export function removeChangeListener(listener:Function) {
  emitter.removeEventListener('change', listener)
}

export function store({name, create, load, save}) {
  savers  = savers.set(name, save)
  loaders = loaders.set(name, load)

  set(state.set(name, create()))

  return (updater) => {
    if (updater) {
      set(state.update(name, updater))
    } else {
      return state.get(name)
    }
  }
}
