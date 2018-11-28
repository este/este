// @flow
import { useMemo, useState, useEffect } from 'react';

// TODO: Reimplement the rest of the withRovingTabIndex.
// This approach seems to be the most unobtrusive.
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets

function setTabIndexes(focusables, focused) {
  focusables.forEach(focusable => {
    // eslint-disable-next-line no-param-reassign
    focusable.tabIndex = focusable === focused ? 0 : -1;
  });
}

export default function useKeyArrows() {
  const [targets, setTargets] = useState(null);

  // Note the logic is inside the effect. It's perfect imho, closures ftw.
  useEffect(
    () => {
      if (targets == null) return;
      const [currentTarget, focused] = targets;
      const focusables = [
        ...currentTarget.querySelectorAll('[data-focusable="true"]'),
      ];

      setTabIndexes(focusables, focused);

      const focusedIndex = focusables.findIndex(f => f === focused);

      function moveFocus(increment) {
        const nextFocus = focusables[focusedIndex + increment];
        if (nextFocus == null) return;
        nextFocus.focus();
      }

      function handleKeyDown(event: KeyboardEvent) {
        switch (event.key) {
          case 'ArrowUp': {
            moveFocus(-1);
            break;
          }
          case 'ArrowDown': {
            moveFocus(1);
            break;
          }
        }
      }

      currentTarget.addEventListener('keydown', handleKeyDown);
      return () => {
        currentTarget.removeEventListener('keydown', handleKeyDown);
      };
    },
    [targets],
  );

  // Memoize callback because why not.
  // Use useMemo instead of useCallback, because useCallback has wrong type imho.
  const handleKeyArrowsFocus = useMemo(() => {
    return (event: SyntheticEvent<HTMLDivElement>) => {
      setTargets([event.currentTarget, event.target]);
    };
  }, []);

  // We don't have to handle blur, because currentTarget.removeEventListener
  // is called on component unmount in useEffect. That's perfect design.
  return handleKeyArrowsFocus;
}
