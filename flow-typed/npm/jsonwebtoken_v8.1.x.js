// flow-typed signature: a2d5ea66c7bcab10e48b4d9cf6fcbcb0
// flow-typed version: 40e00ed01a/jsonwebtoken_v8.1.x/flow_>=v0.56.x

declare module "jsonwebtoken" {
  declare module.exports: {
    sign: jwt$Sign,
    decode: jwt$Decode,
    verify: jwt$Verify,
    JsonWebTokenError: Class<jwt$WebTokenError>,
    NotBeforeError: Class<jwt$NotBeforeError>,
    TokenExpiredError: Class<jwt$TokenExpiredError>
  }
}

declare type jwt$Encodable = String | Buffer | Object;
declare type jwt$Key = { key: string | Buffer, passphrase: string | Buffer };
declare type jwt$Algorithm =
  'RS256'
  | 'RS384'
  | 'RS512'
  | 'ES256'
  | 'ES384'
  | 'ES512'
  | 'HS256'
  | 'HS384'
  | 'HS512'
  | 'none';

declare type jwt$Callback = (tokenOrError: Error | string) => void;
declare type jwt$SigningOptions<Headers> = $Shape<{
  algorithm: jwt$Algorithm,
  expiresIn: number | string,
  notBefore: number | string,
  audience: string | string[],
  issuer: string,
  jwtid: string,
  subject: string,
  noTimestamp: boolean,
  header: Headers,
  keyid: string
}>;

declare type jwt$SigningOptionsWithAlgorithm<H> = jwt$SigningOptions<H> & { algorithm: jwt$Algorithm };
declare type jwt$VerifyOptionsWithAlgorithm = jwt$VerifyOptions & { algorithms: Array<jwt$Algorithm> };

declare type jwt$VerifyOptions = $Shape<{
  algorithms: Array<jwt$Algorithm>,
  audience: string,
  issuer: string | string[],
  ignoreExpiration: boolean,
  ignoreNotBefore: boolean,
  subject: string | string[],
  clockTolerance: number,
  maxAge: string | number,
  clockTimestamp: number
}>;

declare type jwt$DecodingOptions = $Shape<{
  complete: boolean,
  json: boolean,
  encoding: string,
}>;

declare interface jwt$Sign {
  <P: jwt$Encodable>
  (payload: P, secretOrPrivateKey: string | Buffer): string;

  <P: jwt$Encodable>
  (payload: P, secretOrPrivateKey: string | Buffer, callback: jwt$Callback): string;

  <P: jwt$Encodable, H>
  (payload: P, secretOrPrivateKey: jwt$Key, options: jwt$SigningOptionsWithAlgorithm<H>): string;

  <P: jwt$Encodable, H>
  (payload: P, secretOrPrivateKey: string | Buffer, options: $Shape<jwt$SigningOptions<H>>): string;

  <P: jwt$Encodable, H>
  (payload: P, secretOrPrivateKey: string | Buffer, options: $Shape<jwt$SigningOptions<H>>, callback: jwt$Callback): string;

  <P: jwt$Encodable, H>
  (payload: P, secretOrPrivateKey: jwt$Key, options: jwt$SigningOptionsWithAlgorithm<H>, callback: jwt$Callback): string;
}

declare interface jwt$Decode {
  (jwt: string): mixed;

  (jwt: string, options: jwt$DecodingOptions): mixed;

  (jwt: string, options: jwt$DecodingOptions & { complete: true }): { header: Object, payload: mixed, signature: string };
}

declare interface jwt$Verify {
  (jwt: string, secretOrPrivateKey: string | Buffer): mixed;

  (jwt: string, secretOrPrivateKey: string | Buffer, options: jwt$VerifyOptions | jwt$Callback): mixed;

  (jwt: string, secretOrPrivateKey: string | Buffer, options: jwt$VerifyOptions, callback: jwt$Callback): mixed;

  (jwt: string, secretOrPrivateKey: jwt$Key, options: jwt$VerifyOptionsWithAlgorithm): mixed;

  (jwt: string, secretOrPrivateKey: jwt$Key, options: jwt$VerifyOptionsWithAlgorithm, callback: jwt$Callback): mixed;
}

declare class jwt$TokenExpiredError extends Error {
}

declare class jwt$WebTokenError extends Error {
}

declare class jwt$NotBeforeError extends Error {
}

