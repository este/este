// @flow

// Arrow keys focus management. Intentionally without React.
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets

type Direction = 'left' | 'right' | 'up' | 'down';

export const getDirection = (key: string): ?Direction =>
  ({
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'up',
    ArrowDown: 'down',
  }[key] || null);

// TODO: Handle tab/shift-tab to leave.
const hasNativeKeyBehavior = (isHorizontal, tagName) =>
  isHorizontal
    ? tagName === 'INPUT' || tagName === 'TEXTAREA'
    : tagName === 'TEXTAREA' || tagName === 'SELECT';

const getFocusablesAndIndex = (currentTarget, target) => {
  // https://github.com/jkup/focusable
  // 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]';
  // We intentionally handle only tabIndex for now.
  const selector = '[tabindex="-1"], [tabindex="0"]';
  const focusables = Array.from(currentTarget.querySelectorAll(selector));
  const index = focusables.findIndex(item => item === target);
  return { focusables, index };
};

const setFocus = next => {
  if (!next) return;
  next.focus();
};

const getCenterX = rect => rect.left + rect.width / 2;

const isInRange = (index, length) => index >= 0 && index <= length - 1;

export const dataCaretEdge = 'data-maybe-move-focus-caret-edge';

export type CaretEdge = 'none' | 'left' | 'right';

const getCaretEdge = (target): ?CaretEdge => {
  let node = target.parentNode;
  while (node && node.nodeType === 1) {
    const caretEdge =
      typeof node.getAttribute === 'function' &&
      node.getAttribute(dataCaretEdge);
    if (caretEdge) return caretEdge;
    node = node.parentNode;
  }
  return null;
};

const maybeMoveFocusOnKey = (
  currentTarget: HTMLElement,
  target: HTMLElement,
  direction: Direction,
) => {
  const isHorizontal = direction === 'left' || direction === 'right';
  const caretEdge = isHorizontal && getCaretEdge(target);

  if (typeof caretEdge === 'string' && caretEdge !== direction) return;

  const { tagName } = target;
  if (hasNativeKeyBehavior(isHorizontal, tagName)) return;

  const { focusables, index } = getFocusablesAndIndex(currentTarget, target);

  if (isHorizontal) {
    const moveIndex = index + (direction === 'left' ? -1 : 1);
    setFocus(focusables[moveIndex]);
    return;
  }

  const currentRect = target.getBoundingClientRect();
  const focusablesRects = focusables.map(f => f.getBoundingClientRect());
  const nextLineFocusables = [];
  let moveIndex = index;
  let lineRect = currentRect;
  let nextLine = false;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const nextIndex = moveIndex + (direction === 'up' ? -1 : 1);
    if (!isInRange(nextIndex, focusables.length)) break;
    moveIndex = nextIndex;
    const moveRect = focusablesRects[moveIndex];
    const isNextLine =
      direction === 'up'
        ? moveRect.bottom <= lineRect.top
        : moveRect.top >= lineRect.bottom;
    if (isNextLine) {
      if (nextLine) break;
      lineRect = moveRect;
      nextLine = true;
    }
    if (nextLine) nextLineFocusables.push(moveIndex);
  }

  if (nextLineFocusables.length === 0) return;

  const centerX = getCenterX(currentRect);
  const byHorizontalCenter = nextLineFocusables
    .map(index => ({ index, rect: focusablesRects[index] }))
    .sort((a, b) => {
      const d1 = Math.abs(centerX - getCenterX(a.rect));
      const d2 = Math.abs(centerX - getCenterX(b.rect));
      return d1 - d2;
    });

  setFocus(focusables[byHorizontalCenter[0].index]);
};

export default maybeMoveFocusOnKey;
