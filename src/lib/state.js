import EventEmitter from 'eventemitter3';
import Immutable from 'immutable';

export default class State extends EventEmitter {

  constructor(state, reviver: ?Function) {
    super();
    this._state = null;
    this._reviver = reviver;
    this.load(state || {});
  }

  load(state: Object) {
    this.set(Immutable.Map.isMap(state)
      ? state
      : Immutable.fromJS(state, this._reviver)
    );
  }

  set(state) {
    if (this._state === state) return;
    this._state = state;
    this.emit('change', this._state);
  }

  get() {
    return this._state;
  }

  save(): Object {
    return this._state.toJS();
  }

  toConsole() {
    console.log(JSON.stringify(this.save())); // eslint-disable-line no-console
  }

  cursor(path: Array<string>) {
    return (arg) => {
      if (!arg)
        return this._state.getIn(path);
      if (Array.isArray(arg))
        return this._state.getIn(path.concat(arg));
      this.set(this._state.updateIn(path, arg), path);
    };
  }

}
