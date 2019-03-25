import React, {
  FunctionComponent,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { View, ViewProps, findNodeHandle } from 'react-native';

// It's implemented out of React with plain DOM because it's much easier.
// For initial tabIndex, use accessible prop.
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets

const KeyboardNavigableView: FunctionComponent<ViewProps> = props => {
  const viewRef = useRef<View>(null);

  const getViewElement = useCallback((): HTMLElement | null => {
    if (!viewRef.current) return null;
    // Cast weird number to HTMLElement.
    const node = findNodeHandle(viewRef.current) as HTMLElement | null;
    return node;
  }, []);

  const getFocusableElements = useCallback((): HTMLElement[] => {
    const element = getViewElement();
    if (element == null) return [];
    // https://github.com/necolas/react-native-web/blob/master/docs/guides/accessibility.md
    // Bug imho. We should not have to specify tabindex.
    // Hmm, Necolas said it's ok. Maybe we don't need data-focusable attr.
    // We will see.
    // https://github.com/necolas/react-native-web/issues/1266
    const selector = '[data-focusable="true"], [tabindex]';
    const list = element.querySelectorAll<HTMLElement>(selector);
    return Array.from(list);
  }, [getViewElement]);

  const setTabIndexes = useCallback(
    (focused: EventTarget | null) => {
      const elements = getFocusableElements();
      elements.forEach(element => {
        element.tabIndex = element === focused ? 0 : -1;
      });
    },
    [getFocusableElements],
  );

  const handleFocusin = useCallback(
    (event: Event) => {
      setTabIndexes(event.target);
    },
    [setTabIndexes],
  );

  // TODO: Consider porting it.
  // const maybeIgnoreElementWithCaret = (focused, left) => {
  //   if (!focused.classList.contains('caret-position')) return;
  //   const ignore =
  //     (left && !focused.classList.contains('caret-position-start')) ||
  //     (!left && !focused.classList.contains('caret-position-end'));
  //   return ignore;
  // };

  const moveHorizontal = useCallback(
    (focused: HTMLElement, left: boolean) => {
      // if (maybeIgnoreElementWithCaret(focused, left)) return;
      const elements = getFocusableElements();
      const index = elements.indexOf(focused);
      const nextFocusedElement = elements[index + (left ? -1 : 1)];
      if (nextFocusedElement == null) return;
      nextFocusedElement.focus();
    },
    [getFocusableElements],
  );

  const moveVertical = useCallback(
    (focused: HTMLElement, up: boolean) => {
      // if (maybeIgnoreElementWithCaret(focused, up)) return;
      const elements = getFocusableElements();

      const index = elements.indexOf(focused);

      const rect = focused.getBoundingClientRect();
      const rects = elements.map(node => node.getBoundingClientRect());

      const nextLineNodes = [];
      let moveIndex = index;
      let lineRect = rect;
      let nextLine = false;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const nextIndex = moveIndex + (up ? -1 : 1);
        const isInRange = nextIndex >= 0 && nextIndex <= elements.length - 1;
        if (!isInRange) break;
        moveIndex = nextIndex;
        const moveRect = rects[moveIndex];
        const isNextLine = up
          ? moveRect.bottom <= lineRect.top
          : moveRect.top >= lineRect.bottom;
        if (isNextLine) {
          if (nextLine) break;
          lineRect = moveRect;
          nextLine = true;
        }
        if (nextLine) nextLineNodes.push(moveIndex);
      }

      if (nextLineNodes.length === 0) return;

      // TODO: Left only seems to be the best, but there is a reason why I had
      // the center. Maybe it should be configurable.
      const getCenterX = (r: ClientRect | DOMRect) => {
        return r.left; // + r.width / 2; This is weird.
      };
      const centerX = getCenterX(rect);
      const byHorizontalCenter = nextLineNodes
        .map(index => ({ index, rect: rects[index] }))
        .sort((a, b) => {
          const d1 = Math.abs(centerX - getCenterX(a.rect));
          const d2 = Math.abs(centerX - getCenterX(b.rect));
          return d1 - d2;
        });

      const nextFocusedNode = elements[byHorizontalCenter[0].index];
      if (nextFocusedNode == null) return;
      nextFocusedNode.focus();
    },
    [getFocusableElements],
  );

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      const focused = event.target as HTMLElement;
      const isArrowLeft = event.key === 'ArrowLeft';
      if (isArrowLeft || event.key === 'ArrowRight') {
        moveHorizontal(focused, isArrowLeft);
        return;
      }
      const isArrowUp = event.key === 'ArrowUp';
      if (isArrowUp || event.key === 'ArrowDown') {
        moveVertical(focused, isArrowUp);
      }
    },
    [moveHorizontal, moveVertical],
  );

  useEffect(() => {
    const element = getViewElement();
    if (element == null) return;
    element.addEventListener('focusin', handleFocusin);
    element.addEventListener('keydown', handleKeydown);
    return () => {
      element.removeEventListener('focusin', handleFocusin);
      element.removeEventListener('keydown', handleKeydown);
    };
  }, [getViewElement, handleFocusin, handleKeydown]);

  return <View {...props} ref={viewRef} />;
};

export default KeyboardNavigableView;
