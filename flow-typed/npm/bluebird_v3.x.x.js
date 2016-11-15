// flow-typed signature: f7bf040869842c4af9aa8e5e72c252fa
// flow-typed version: e1ccfebf85/bluebird_v3.x.x/flow_>=v0.32.x

type Bluebird$RangeError = Error;
type Bluebird$CancellationErrors = Error;
type Bluebird$TimeoutError = Error;
type Bluebird$RejectionError = Error;
type Bluebird$OperationalError = Error;

type Bluebird$ConcurrencyOption = {
  concurrency: number,
};
type Bluebird$SpreadOption = {
  spread: boolean;
};
type Bluebird$MultiArgsOption = {
  multiArgs: boolean;
};
type Bluebird$BluebirdConfig = {
  warnings?: boolean,
  longStackTraces?: boolean,
  cancellation?: boolean,
  monitoring?: boolean
};

declare class Bluebird$PromiseInspection<T> {
  isCancelled(): bool;
  isFulfilled(): bool;
  isRejected(): bool;
  pending(): bool;
  reason(): any;
  value(): T;
}

type Bluebird$PromisifyOptions = {|
  multiArgs?: boolean,
  context: any
|};

declare type Bluebird$PromisifyAllOptions = {
  suffix?: string;
  filter?: (name: string, func: Function, target?: any, passesDefaultFilter?: boolean) => boolean;
  // The promisifier gets a reference to the original method and should return a function which returns a promise
  promisifier?: (originalMethod: Function) => () => Bluebird$Promise<any> ;
};

declare type Bluebird$Promisable<T> = Bluebird$Promise<T> | Promise<T> | T;

declare class Bluebird$Promise<R> {
  static Defer: Class<Bluebird$Defer>;
  static PromiseInspection: Class<Bluebird$PromiseInspection<*>>;

  static all<T, Elem: Bluebird$Promisable<T>>(Promises: Array<Elem>): Bluebird$Promise<Array<T>>;
  static props(input: Bluebird$Promisable<Object|Map<*,*>>): Bluebird$Promise<*>;
  static any<T, Elem: Bluebird$Promisable<T>>(Promises: Array<Elem>): Bluebird$Promise<T>;
  static race<T, Elem: Bluebird$Promisable<T>>(Promises: Array<Elem>): Bluebird$Promise<T>;
  static reject<T>(error?: any): Bluebird$Promise<T>;
  static resolve<T>(object?: Bluebird$Promisable<T>): Bluebird$Promise<T>;
  static some<T, Elem: Bluebird$Promisable<T>>(Promises: Array<Elem>, count: number): Bluebird$Promise<Array<T>>;
  static join<T, Elem: Bluebird$Promisable<T>>(...Promises: Array<Elem>): Bluebird$Promise<Array<T>>;
  static map<T, U, Elem: Bluebird$Promisable<T>>(
    Promises: Array<Elem>,
    mapper: (item: T, index: number, arrayLength: number) => U,
    options?: Bluebird$ConcurrencyOption
  ): Bluebird$Promise<Array<U>>;
  static mapSeries<T, U, Elem: Bluebird$Promisable<T>>(
    Promises: Array<Elem>,
    mapper: (item: T, index: number, arrayLength: number) => U
  ): Bluebird$Promise<Array<U>>;
  static reduce<T, U, Elem: Bluebird$Promisable<T>>(
    Promises: Array<Elem>,
    reducer: (total: U, current: T, index: number, arrayLength: number) => U,
    initialValue?: U
  ): Bluebird$Promise<U>;
  static filter<T, Elem: Bluebird$Promisable<T>>(
    Promises: Array<Elem>,
    filterer: (item: T, index: number, arrayLength: number) => Bluebird$Promisable<bool>,
    option?: Bluebird$ConcurrencyOption
  ): Bluebird$Promise<Array<T>>;
  static each<T, Elem: Bluebird$Promisable<T>>(
    Promises: Array<Elem>,
    iterator: (item: T, index: number, arrayLength: number) => Bluebird$Promisable<mixed>,
  ): Bluebird$Promise<Array<T>>;
  static try<T>(fn: () => Bluebird$Promisable<T>, args: ?Array<any>, ctx: ?any): Bluebird$Promise<T>;
  static attempt<T>(fn: () => Bluebird$Promisable<T>, args: ?Array<any>, ctx: ?any): Bluebird$Promise<T>;
  static delay<T>(value: Bluebird$Promisable<T>, ms: number): Bluebird$Promise<T>;
  static delay(ms: number): Bluebird$Promise<void>;
  static config(config: Bluebird$BluebirdConfig): void;

  static defer(): Bluebird$Defer;
  static setScheduler(scheduler: (callback: (...args: Array<any>) => void) => void): void;
  static promisify(nodeFunction: Function, receiver?: Bluebird$PromisifyOptions): Function;
  static promisifyAll(target: Object, options?: Bluebird$PromisifyAllOptions): void;

  static coroutine(generatorFunction: Function): Function;
  static spawn<T>(generatorFunction: Function): Promise<T>;

  // It doesn't seem possible to have type-generics for a variable number of arguments.
  // Handle up to 3 arguments, then just give up and accept 'any'.
  static method<T>(fn: () => T): () => Bluebird$Promise<T>;
  static method<T, A>(fn: (a: A) => T): (a: A) => Bluebird$Promise<T>;
  static method<T, A, B>(fn: (a: A, b: B) => T): (a: A, b: B) => Bluebird$Promise<T>;
  static method<T, A, B, C>(fn: (a: A, b: B, c: B) => T): (a: A, b: B, c: B) => Bluebird$Promise<T>;
  static method<T>(fn: (...args: any) => T): (...args: any) => Bluebird$Promise<T>;

  static cast<T>(value: Bluebird$Promisable<T>): Bluebird$Promise<T>;
  static bind(ctx: any): Bluebird$Promise<void>;
  static is(value: any): boolean;
  static longStackTraces(): void;

  static onPossiblyUnhandledRejection(handler: (reason: any) => any): void;
  static fromCallback<T>(resolver: (fn: (error: ?Error, value?: T) => any) => any, options?: Bluebird$MultiArgsOption): Bluebird$Promise<T>;

  constructor(callback: (
    resolve: (result?: Bluebird$Promisable<R>) => void,
    reject: (error?: any) => void
  ) => mixed): void;
  then<U>(onFulfill?: (value: R) => Bluebird$Promisable<U>, onReject?: (error: any) => Bluebird$Promisable<U>): Bluebird$Promise<U>;
  catch<U>(onReject?: (error: any) => ?Bluebird$Promisable<U>): Bluebird$Promise<U>;
  caught<U>(onReject?: (error: any) => ?Bluebird$Promisable<U>): Bluebird$Promise<U>;
  error<U>(onReject?: (error: any) => ?Bluebird$Promisable<U>): Bluebird$Promise<U>;
  done<U>(onFulfill?: (value: R) => mixed, onReject?: (error: any) => mixed): void;
  finally<T>(onDone?: (value: R) => mixed): Bluebird$Promise<T>;
  lastly<T>(onDone?: (value: R) => mixed): Bluebird$Promise<T>;
  tap<T>(onDone?: (value: R) => mixed): Bluebird$Promise<T>;
  delay(ms: number): Bluebird$Promise<R>;
  timeout(ms: number, message?: string): Bluebird$Promise<R>;
  cancel(): void;

  bind(ctx: any): Bluebird$Promise<R>;
  call(propertyName: string, ...args: Array<any>): Bluebird$Promise<any>;
  throw(reason: Error): Bluebird$Promise<R>;
  thenThrow(reason: Error): Bluebird$Promise<R>;
  all<T>(): Bluebird$Promise<Array<T>>;
  any<T>(): Bluebird$Promise<T>;
  some<T>(count: number): Bluebird$Promise<Array<T>>;
  race<T>(): Bluebird$Promise<T>;
  map<T, U>(mapper: (item: T, index: number, arrayLength: number) => Bluebird$Promisable<U>, options?: Bluebird$ConcurrencyOption): Bluebird$Promise<Array<U>>;
  mapSeries<T, U>(mapper: (item: T, index: number, arrayLength: number) => Bluebird$Promisable<U>): Bluebird$Promise<Array<U>>;
  reduce<T, U>(
    reducer: (total: T, item: U, index: number, arrayLength: number) => Bluebird$Promisable<T>,
    initialValue?: T
  ): Bluebird$Promise<T>;
  filter<T>(filterer: (item: T, index: number, arrayLength: number) => Bluebird$Promisable<bool>, options?: Bluebird$ConcurrencyOption): Bluebird$Promise<Array<T>>;
  each<T, U>(iterator: (item: T, index: number, arrayLength: number) => Bluebird$Promisable<U>): Bluebird$Promise<Array<T>>;
  asCallback<T>(callback: (error: ?any, value?: T) => any, options?: Bluebird$SpreadOption): void;
  return<T>(value: T): Bluebird$Promise<T>;

  reflect(): Bluebird$Promise<Bluebird$PromiseInspection<*>>;

  isFulfilled(): bool;
  isRejected(): bool;
  isPending(): bool;
  isResolved(): bool;

  value(): R;
  reason(): any;
}

declare class Bluebird$Defer {
  promise: Bluebird$Promise<*>;
  resolve: (value: any) => any;
  reject: (value: any) => any;
}

declare module 'bluebird' {
  declare var exports: typeof Bluebird$Promise;
}
