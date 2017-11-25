// @flow
import * as React from 'react';
import EditorElementBox from './EditorElementBox';
import EditorElementText from './EditorElementText';
import type { Theme, Dispatch, Path } from './Editor';
import arrayEqual from 'array-equal';

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
  path: Path,
  dispatch: Dispatch,
  activePath: Path,
|};

// React key prop has to be unique string. No cheating. But for arbitrary JSON,
// we don't have any unique id and JSON.stringify is too slow.
// Fortunately, we use immutable data, so we can leverage WeakMap.
export const getElementKey = (() => {
  const map = new WeakMap();
  let idx = 0;
  return (element: Element): string => {
    const maybeValue = map.get(element);
    if (typeof maybeValue === 'string') return maybeValue;
    const value = (idx++).toString();
    map.set(element, value);
    return value;
  };
})();

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
      nextProps.element !== this.props.element ||
      nextProps.theme !== this.props.theme ||
      nextProps.activePath !== this.props.activePath;
    return shouldUpdate;
  }

  handleClick = (e: Event) => {
    // To handle only the innermost element.
    e.preventDefault();
    e.stopPropagation();
    this.props.dispatch({ type: 'SET_ACTIVE_PATH', path: this.props.path });
  };

  render() {
    const { theme, element, path, dispatch, activePath } = this.props;
    const Component = EditorElement.getElementComponent(element.type);
    if (!Component) return null;

    const style = arrayEqual(activePath, path)
      ? { ...element.props.style, animation: 'activated 1s' }
      : element.props.style;

    const props = { onClick: this.handleClick, theme, style };

    const childrenElements = element.props.children.map((child, i) => {
      if (typeof child === 'string') return child;
      return (
        <EditorElement
          key={getElementKey(child)}
          element={child}
          theme={theme}
          path={path.concat(i)}
          dispatch={dispatch}
          activePath={activePath}
        />
      );
    });

    return <Component {...props}>{childrenElements}</Component>;
  }
}

export default EditorElement;
