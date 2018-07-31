// @flow
/* eslint-env browser */

// From ianstormtaylor/is-hotkey. It's nice lib but we don't need it I think.
const isMac =
  typeof window !== 'undefined' &&
  /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

const hotKey = (
  event: KeyboardEvent,
): {|
  mod: boolean,
  alt: boolean,
  key: string,
  code: number,
|} => {
  const mod = isMac ? event.metaKey : event.ctrlKey;
  const alt = event.altKey;
  const key = event.key;
  const code = event.keyCode;
  return { mod, alt, key, code };
};

export default hotKey;
