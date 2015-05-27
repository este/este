import EventEmitter from 'eventemitter3';

export default class Atom extends EventEmitter {

  constructor(value) {
    super();
    this._value = value;
  }

  set(value) {
    if (this._value === value) return;
    const oldValue = this._value;
    this._value = value;
    this.emit('change', value, oldValue);
  }

  get() {
    return this._value;
  }

  toString() {return "Atom(" + this._value + ")";}
  toSource() {return this.toString();}
  inspect() {return this.toString();}
}
