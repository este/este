export default class Cursor {

  constructor(ref, path: Array<string>) {
    this._ref = ref
    this._path = path
  }

  set(value) {
    this._ref.set(this._ref.get().setIn(this._path, value))
  }

  get() {
    return this._ref.get().getIn(this._path)
  }

  toString() {return "Cursor(" + this._ref + ", " + this._path + ")";}
  toSource() {return this.toString();}
  inspect() {return this.toString();}
}
