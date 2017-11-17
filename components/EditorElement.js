// @flow
import * as React from 'react';
import EditorElementBox from './EditorElementBox';
import EditorElementText from './EditorElementText';
import type { Theme } from './Editor';

// Just a basic shape. We need a JSON Schema for validation.
// Doesn't make sense to use Flow for dynamic data.
// TODO: | 'TextInput' | 'Button',
type ElementType = 'Box' | 'Text';

export type Element = {|
  type: ElementType,
  props: {|
    children: Array<Element | string>,
    style?: Object,
    // browserStyle?: string,
    // iosStyle?: Object,
    // androidStyle?: Object,
  |},
|};

type EditorElementProps = {|
  element: Element,
  theme: Theme,
|};

class EditorElement extends React.PureComponent<EditorElementProps> {
  static getElementComponent(type: ElementType) {
    switch (type) {
      case 'Box':
        return EditorElementBox;
      case 'Text':
        return EditorElementText;
      default:
        // eslint-disable-next-line no-unused-expressions
        (type: empty);
        return null;
    }
  }

  render() {
    const { theme, element } = this.props;
    const Component = EditorElement.getElementComponent(element.type);
    if (!Component) return null;

    const children = element.props.children.map(child => {
      if (typeof child === 'string') return child;
      return <EditorElement element={child} theme={theme} />;
    });
    const props = { theme, style: element.props.style };

    // createElement with ...children, and we don't have to add artificial keys.
    return React.createElement(Component, props, ...children);
  }
}

export default EditorElement;
