// flow-typed signature: 2741ab8bb4b6e3eaba6543ef6a55e131
// flow-typed version: ce740e088d/uuid_v2.x.x/flow_>=v0.33.x

declare module 'uuid' {
  declare function v1(options?: {|
    node?: number[],
    clockseq?: number,
    msecs?: number | Date,
    nsecs?: number,
  |}, buffer?: number[] | Buffer, offset?: number): string;
  declare function v4(options?: {|
    random?: number[],
    rng?: Function,
  |}, buffer?: number[] | Buffer, offset?: number): string;
  declare function parse(id: string, buffer?: number[] | Buffer, offset?: number): Buffer;
  declare function unparse(buffer?: number[] | Buffer, offset?: number): string;
}
