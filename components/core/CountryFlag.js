// @flow
const CountryFlag = ({ code }: { code: string }) =>
  code
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));

export default CountryFlag;
