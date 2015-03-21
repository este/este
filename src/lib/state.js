/* @flow */

import EventEmitter from 'eventemitter3'
import {Map, KeyedCollection} from 'immutable'
//import invariant from 'invariant'

class State {

  constructor() {
    this.state = Map()
    this.emitter = new EventEmitter()
  }

  toJS():Object {
    return this.state.map((v, k) => v.toJS())
  }

  fromJS(json:Object):Map {
    return Map(json).map((v, k) => this.state.get(k).fromJS(v))
  }

  set(state:KeyedCollection) {
    if (this.state === state) return
    this.state = state
    this.emitter.emit('change')
  }

  get():Map {
    return this.state
  }

  addChangeListener(listener:Function) {
    this.emitter.on('change', listener)
  }

  removeChangeListener(listener:Function) {
    this.emitter.removeEventListener('change', listener)
  }

  register(Store):Function {
    const store = new Store()
    const name = store.toString()
    //invariant(!this.state.get(name), 'Store name conflict')
    this.set(this.state.set(name, store))

    return (updater:Function) => {
      if (updater) {
        this.set(this.state.update(name, updater))
      } else {
        return this.state.get(name)
      }
    }
  }

}

export default new State()
