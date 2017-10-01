// @flow
import * as React from 'react';

// There is detect-emoji-support lib, but it does not work on the server.
// We don't need it, emoji is well supported.
// http://caniemoji.com

// TODO: Return string with React 16
const CountryFlag = ({ code }: { code: string }) => (
  <span style={{ verticalAlign: 'middle' }}>
    {code
      .toUpperCase()
      .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))}
  </span>
);

export default CountryFlag;
