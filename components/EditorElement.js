// @flow
import * as React from 'react';

// Just a basic shape. We need a JSON Schema for validation anyway.
// Doesn't make sense to use Flow checking for DB data.
export type Element = {|
  type: 'Box' | 'Text', // TODO: | 'Input' | 'Button',
  props: {|
    children: Array<Element | string>,
    style?: Object,
    // browserStyle?: Object,
    // iosStyle?: Object,
    // androidStyle?: Object,
  |},
|};

type EditorElementProps = {
  element: Element,
};

class EditorElement extends React.PureComponent<EditorElementProps> {
  render() {
    const { props: { children, style } } = this.props.element;
    const props = style ? { style } : null;
    const childrenComponents = children.map(child => {
      if (typeof child === 'string') return child;
      return <EditorElement element={child} />;
    });
    return React.createElement('div', props, ...childrenComponents);
  }
}

export default EditorElement;
