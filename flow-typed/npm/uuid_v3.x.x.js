// flow-typed signature: f3dd531f52181bcacabc2c9b3ba77ee5
// flow-typed version: 902b1d58cb/uuid_v3.x.x/flow_>=v0.33.x

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
}
