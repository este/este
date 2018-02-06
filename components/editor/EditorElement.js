// @flow
import * as React from 'react';
import EditorElementBox from './EditorElementBox';
import EditorElementText from './EditorElementText';
import type { Element, Path, Theme } from './Editor';
import colorLib from 'color';
import { activeElementProp } from './Editor';
import EditorDispatch from './EditorDispatch';
import arrayEqual from 'array-equal';

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

const getInheritedBackgroundColor = (elements, themeBackgroundColor) => {
  for (const { props } of elements.reverse()) {
    if (props.style && props.style.backgroundColor)
      return props.style.backgroundColor;
  }
  return themeBackgroundColor;
};

class FlashAnimation extends React.PureComponent<*> {
  render() {
    const { color, onEnd } = this.props;
    return (
      <div onAnimationEnd={onEnd}>
        <style jsx>{`
          @keyframes activated {
            0% {
              opacity: 0.5;
            }
            100% {
              opacity: 0;
            }
          }
          div {
            position: absolute;
            z-index: 2147483647; /* max */
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            border: dashed 2px ${color};
            animation: activated 1s;
          }
        `}</style>
      </div>
    );
  }
}

const editorElements = {
  Box: EditorElementBox,
  Text: EditorElementText,
};

type EditorElementProps = {|
  element: Element,
  theme: Theme,
  path: Path,
  parents: Array<Element>,
  activePath: Path,
|};

type EditorElementState = {|
  flashAnimationRunning: boolean,
  flashAnimationColor: string,
|};

class EditorElement extends React.PureComponent<
  EditorElementProps,
  EditorElementState,
> {
  static pathEqual = (path1: Path, path2: Path) => arrayEqual(path1, path2);

  constructor(props: EditorElementProps) {
    super(props);
    this.state = {
      flashAnimationRunning: false,
      flashAnimationColor: props.theme.colors.background,
    };
  }

  componentWillReceiveProps(nextProps: EditorElementProps) {
    const thisPathIsActivePathAndHasBeenUpdated =
      EditorElement.pathEqual(nextProps.activePath, this.props.path) &&
      nextProps.activePath !== this.props.activePath;
    if (thisPathIsActivePathAndHasBeenUpdated) {
      this.runFlashAnimation();
    }
  }

  // TODO: Should be JS only multi platform animation.
  runFlashAnimation() {
    if (this.state.flashAnimationRunning) {
      // We have to remove then add element to restart CSS animation. Yep.
      this.setState({ flashAnimationRunning: false }, () => {
        this.setState({ flashAnimationRunning: true });
      });
      return;
    }
    const backgroundColor = getInheritedBackgroundColor(
      [...this.props.parents, this.props.element],
      this.props.theme.colors.background,
    );
    this.setState({
      flashAnimationRunning: true,
      // Wow. I didn't know I can use CSS filter effects grayscale and invert.
      // But keep current JS approach. We will reuse it for React Native.
      flashAnimationColor: colorLib(backgroundColor)
        .grayscale()
        .negate(),
    });
  }

  isActive() {
    return EditorElement.pathEqual(this.props.path, this.props.activePath);
  }

  handleClick = (dispatch: *) => (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    // Make a clone to enforce flash animation restart.
    const path = this.props.path.slice(0);
    dispatch({ type: 'SET_ACTIVE_PATH', path });
  };

  handleFlashAnimationEnd = () => {
    this.setState({ flashAnimationRunning: false });
  };

  render() {
    const { theme, element, path, parents, activePath } = this.props;
    const Component = editorElements[element.type];
    if (!Component) return null;

    const componentChildren = element.props.children.map((child, i) => {
      if (typeof child === 'string') return child;
      return (
        <EditorElement
          key={getElementKey(child)}
          element={child}
          theme={theme}
          path={path.concat(i)}
          parents={parents.concat(element)}
          activePath={activePath}
        />
      );
    });

    return (
      <EditorDispatch>
        {dispatch => (
          <Component
            style={element.props.style}
            theme={theme}
            onClick={this.handleClick(dispatch)}
            {...(this.isActive() ? { [activeElementProp]: true } : null)}
          >
            {componentChildren}
            {this.state.flashAnimationRunning && (
              <FlashAnimation
                color={this.state.flashAnimationColor}
                onEnd={this.handleFlashAnimationEnd}
              />
            )}
          </Component>
        )}
      </EditorDispatch>
    );
  }
}

export default EditorElement;
