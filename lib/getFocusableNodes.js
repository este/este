// @flow
import { findNodeHandle } from 'react-native';

// Note this is no-op in React Native. Maybe it should not, I don't know yet.
const getFocusableNodes = (instance: Object): Array<HTMLElement> => {
  const node = findNodeHandle(instance);
  if (node == null || typeof node === 'number') return [];
  if (typeof node.querySelectorAll !== 'function') return [];
  return [...node.querySelectorAll('[data-focusable="true"]')];
};

export default getFocusableNodes;
