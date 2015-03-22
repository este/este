/* @flow */

import EventEmitter from 'eventemitter3'
import {Map} from 'immutable'
//import is from 'is_js'
//import invariant from 'invariant'

class State {

  constructor() {
    this._state = Map()
    this._emitter = new EventEmitter()
  }

  toJS():Object {
    return this._state.map((v, k) => v.toJS())
  }

  fromJS(json:Object):Map {
    return Map(json).map((v, k) => this._state.get(k).fromJS(v))
  }

  set(state:Map) {
    if (this._state === state) return
    this._state = state
    this._emitter.emit('change')
  }

  get():Map {
    return this._state
  }

  addChangeListener(listener:Function) {
    this._emitter.on('change', listener)
  }

  removeChangeListener(listener:Function) {
    this._emitter.removeEventListener('change', listener)
  }

  register(StoreRecord):Function {
    const store = new StoreRecord()
    const name  = store._name || store.constructor.name;

    //invariant(is.function(store.fromJS), 'Store missing fromJS')
    //invariant(!this._state.get(name), 'Store name conflict')

    this.set(this._state.set(name, store))

    return (updater:Function) => {
      if (updater) {
        this.set(this._state.update(name, updater))
      } else {
        return this._state.get(name)
      }
    }
  }

}

export default new State()
