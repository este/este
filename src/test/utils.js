import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

// To console.log stringified and pretty printed JSON. Useful for shallow
// rendered component for example.
export function log(value) {
  const str = JSON.stringify(value, null, 2);
  console.log(str); // eslint-disable-line no-console
}

// Helper for React components shallow rendering.
// https://facebook.github.io/react/docs/test-utils.html#shallow-rendering
export function render(Component) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(Component);
  return shallowRenderer.getRenderOutput();
}
