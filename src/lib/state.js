/* @flow */

import EventEmitter from 'eventemitter3'
import {Map} from 'immutable'
//import is from 'is_js'
//import invariant from 'invariant'

let state = new Map()
let emitter = new EventEmitter()

export function toJS():Object {
  return state.map((v, k) => v.toJS())
}

export function fromJS(json:Object):Map {
  return Map(json).map((v, k) => state.get(k).fromJS(v))
}

export function set(value:Map) {
  if (state === value) return
  state = value
  emitter.emit('change')
}

export function get():Map {
  return state
}

export function addChangeListener(listener:Function) {
  emitter.on('change', listener)
}

export function removeChangeListener(listener:Function) {
  emitter.removeEventListener('change', listener)
}

export function register(StoreRecord):Function {
  const store = new StoreRecord()
  const name = store._name || store.constructor.name

  //invariant(is.function(store.fromJS), 'Store missing fromJS')
  //invariant(!state.get(name), 'Store name conflict')

  this.set(state.set(name, store))

  return (updater:Function) => {
    if (updater) {
      this.set(state.update(name, updater))
    } else {
      return state.get(name)
    }
  }
}
