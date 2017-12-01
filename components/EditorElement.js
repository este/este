// @flow
import * as React from 'react';
import EditorElementBox from './EditorElementBox';
import EditorElementText from './EditorElementText';
import type { Theme, EditorDispatch, Path } from './Editor';
import Color from 'color';

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

const maxCssZIndex = 2147483647;

const getInheritedBackgroundColor = (elements, themeBackgroundColor) => {
  for (const { props } of elements.reverse()) {
    if (props.style && props.style.backgroundColor)
      return props.style.backgroundColor;
  }
  return themeBackgroundColor;
};

const FlashAnimation = ({ color, onEnd }) => (
  <div
    onAnimationEnd={onEnd}
    style={{
      animation: 'activated 0.5s',
      position: 'absolute',
      zIndex: maxCssZIndex,
      backgroundColor: color,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    }}
  >
    <style jsx global>{`
      @keyframes activated {
        0% {
          opacity: 0.5;
        }
        100% {
          opacity: 0;
        }
      }
    `}</style>
  </div>
);

type Props = {|
  element: Element,
  theme: Theme,
  path: Path,
  dispatch: EditorDispatch,
  parents: Array<Element>,
|};

type State = {|
  flashAnimationShown: boolean,
  flashAnimationColor: string,
|};

class EditorElement extends React.Component<Props, State> {
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

  constructor(props: Props) {
    super(props);
    this.state = {
      flashAnimationShown: false,
      flashAnimationColor: props.theme.colors.background,
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const shouldUpdate =
      nextProps.element !== this.props.element ||
      nextProps.theme !== this.props.theme ||
      nextState.flashAnimationShown !== this.state.flashAnimationShown;
    return shouldUpdate;
  }

  handleClick = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const backgroundColor = getInheritedBackgroundColor(
      [...this.props.parents, this.props.element],
      this.props.theme.colors.background,
    );
    this.setState({
      flashAnimationShown: true,
      flashAnimationColor: Color(backgroundColor)
        .grayscale()
        .negate(),
    });
    this.props.dispatch({ type: 'SET_ACTIVE_PATH', path: this.props.path });
  };

  handleFlashAnimationEnd = () => {
    this.setState({ flashAnimationShown: false });
  };

  render() {
    const { theme, element, path, dispatch, parents } = this.props;
    const Component = EditorElement.getElementComponent(element.type);
    if (!Component) return null;

    const componentProps = {
      style: element.props.style,
      theme,
      onClick: this.handleClick,
    };

    const componentChildren = element.props.children.map((child, i) => {
      if (typeof child === 'string') return child;
      return (
        <EditorElement
          key={getElementKey(child)}
          element={child}
          theme={theme}
          path={path.concat(i)}
          dispatch={dispatch}
          parents={parents.concat(element)}
        />
      );
    });

    return (
      <Component {...componentProps}>
        {componentChildren}
        {this.state.flashAnimationShown && (
          <FlashAnimation
            color={this.state.flashAnimationColor}
            onEnd={this.handleFlashAnimationEnd}
          />
        )}
      </Component>
    );
  }
}

export default EditorElement;
