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
  path: Array<number>,
|};

class EditorElement extends React.Component<EditorElementProps> {
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

  shouldComponentUpdate(nextProps: EditorElementProps) {
    const shouldUpdate =
      this.props.element !== nextProps.element ||
      this.props.theme !== nextProps.theme;
    return shouldUpdate;
  }

  handleClick = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    // this.props.dispatch({ type: 'SET_FOCUS', path: this.props.path })
  };

  render() {
    const { theme, element, path } = this.props;
    const Component = EditorElement.getElementComponent(element.type);
    if (!Component) return null;

    const props = {
      onClick: this.handleClick,
      theme,
      style: element.props.style,
    };

    const children = element.props.children.map((child, i) => {
      if (typeof child === 'string') return child;
      return (
        <EditorElement element={child} theme={theme} path={path.concat(i)} />
      );
    });

    return React.createElement(Component, props, ...children);
  }
}

export default EditorElement;
