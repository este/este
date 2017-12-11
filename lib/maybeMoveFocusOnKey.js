// @flow
import focusable from 'focusable';

// Arrow keys focus management

const maybeMoveFocusOnKey = (
  key: string,
  currentTarget: HTMLElement,
  target: EventTarget,
) => {
  const isDown = key === 'ArrowDown';
  const isLeft = key === 'ArrowLeft';
  const isRight = key === 'ArrowRight';
  const isUp = key === 'ArrowUp';
  const isArrow = isDown || isLeft || isRight || isUp;
  if (!isArrow) return;

  const currentFocusable = ((target: any): HTMLElement);
  const { tagName } = currentFocusable;
  const isHorizontal = isLeft || isRight;
  const getFocusablesAndIndex = () => {
    const focusables = Array.from(currentTarget.querySelectorAll(focusable));
    const index = focusables.findIndex(item => item === currentFocusable);
    return { focusables, index };
  };

  if (isHorizontal) {
    const ignore = tagName === 'INPUT' || tagName === 'TEXTAREA';
    if (ignore) return;
    const { focusables, index } = getFocusablesAndIndex();
    const moveIndex = index + (isLeft ? -1 : 1);
    const nextFocusable = focusables[moveIndex];
    if (nextFocusable) nextFocusable.focus();
    return;
  }

  const ignore = tagName === 'TEXTAREA' || tagName === 'SELECT';
  if (ignore) return;
  const currentRect = currentFocusable.getBoundingClientRect();
  const { focusables, index } = getFocusablesAndIndex();
  const focusablesRects = focusables.map(f => f.getBoundingClientRect());
  const findNextLineFocusables = () => {
    let moveIndex = index;
    const isInRange = index => index >= 0 && index <= focusables.length - 1;
    let lineRect = currentRect;
    let nextLine = false;
    const nextLineFocusables = [];
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const nextIndex = moveIndex + (isUp ? -1 : 1);
      if (!isInRange(nextIndex)) break;
      moveIndex = nextIndex;
      const moveRect = focusablesRects[moveIndex];
      const isNextLine = isUp
        ? moveRect.bottom <= lineRect.top
        : moveRect.top >= lineRect.bottom;
      if (isNextLine) {
        if (nextLine) break;
        lineRect = moveRect;
        nextLine = true;
      }
      if (nextLine) nextLineFocusables.push(moveIndex);
    }
    return nextLineFocusables;
  };
  const nextLineFocusables = findNextLineFocusables();
  if (nextLineFocusables.length === 0) return;
  const getCenterX = rect => rect.left + rect.width / 2;
  const centerX = getCenterX(currentRect);
  const byHorizontalCenter = nextLineFocusables
    .map(index => ({
      index,
      rect: focusablesRects[index],
    }))
    .sort((a, b) => {
      const d1 = Math.abs(centerX - getCenterX(a.rect));
      const d2 = Math.abs(centerX - getCenterX(b.rect));
      return d1 - d2;
    });
  focusables[byHorizontalCenter[0].index].focus();
};

export default maybeMoveFocusOnKey;
