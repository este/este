// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// Roving tabindex.
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
// For initial focus, set tabIndex 0. It can be set via autoFocus as well.
// Provider/Consumer API inspired by new React context proposal.

// http://adrianroselli.com/2014/11/dont-use-tabindex-greater-than-0.html
type TabIndex = -1 | 0;

type ConsumerProps = {|
  onFocus?: (focusToEnd: boolean) => void,
  children: (
    tabIndex: TabIndex,
    onFocus: FocusEventHandler,
    onKeyDown: KeyboardEventHandler,
  ) => React.Node,
|};

type ConsumerState = {|
  tabIndex: TabIndex,
|};

const contextTypes = {
  esteRovingTabIndex: PropTypes.object,
};

export class Consumer extends React.Component<ConsumerProps, ConsumerState> {
  static contextTypes = contextTypes;

  static selector = '[tabindex="-1"], [tabindex="0"]';

  state = {
    tabIndex: -1,
  };

  componentDidMount() {
    this.context.esteRovingTabIndex.onMount(this);
  }

  componentWillUnmount() {
    this.context.esteRovingTabIndex.onUnmount(this);
  }

  onFocus = () => {
    this.context.esteRovingTabIndex.onFocus(this);
  };

  onKeyDown: KeyboardEventHandler = event => {
    this.context.esteRovingTabIndex.onKeyDown(this, event);
  };

  getFocusable(): ?Element {
    // eslint-disable-next-line react/no-find-dom-node
    const element = ReactDOM.findDOMNode(this);
    if (!(element instanceof HTMLElement)) return null;
    const tabIndex = element.getAttribute('tabindex');
    if (tabIndex === '-1' || tabIndex === '0') return element;
    return element.querySelector(Consumer.selector);
  }

  focus(focusToEnd: boolean) {
    if (this.props.onFocus) {
      this.props.onFocus(focusToEnd);
      return;
    }
    const element = this.getFocusable();
    if (!element) return;
    if (typeof element.focus !== 'function') return;
    element.focus();
  }

  context: Context;

  render() {
    return this.props.children(
      this.state.tabIndex,
      this.onFocus,
      this.onKeyDown,
    );
  }
}

type ConsumerHandler = Consumer => void;

type ConsumerWithKeyboardEventHandler = (Consumer, KeyboardEvent) => void;

type Context = {|
  esteRovingTabIndex: {|
    onMount: ConsumerHandler,
    onUnmount: ConsumerHandler,
    onFocus: ConsumerHandler,
    onKeyDown: ConsumerWithKeyboardEventHandler,
  |},
|};

type Direction = 'left' | 'right' | 'up' | 'down';

export const getDirection = (key: string): ?Direction =>
  ({
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'up',
    ArrowDown: 'down',
  }[key] || null);

type ProviderProps = {|
  children?: React.Node,
|};

export class Provider extends React.Component<ProviderProps> {
  static childContextTypes = contextTypes;

  getChildContext() {
    return ({
      esteRovingTabIndex: {
        onMount: this.handleMount,
        onUnmount: this.handleUnmount,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
      },
    }: Context);
  }

  // We have to query DOM to get all focusables in the right order.
  getFocusables(): Array<Element> {
    // eslint-disable-next-line react/no-find-dom-node
    const element = ReactDOM.findDOMNode(this);
    if (element instanceof HTMLElement) {
      return Array.from(element.querySelectorAll(Consumer.selector));
    }
    return [];
  }

  handleMount: ConsumerHandler = consumer => {
    this.consumers.push(consumer);
  };

  handleUnmount: ConsumerHandler = consumer => {
    const index = this.consumers.indexOf(consumer);
    if (index !== -1) this.consumers.splice(index, 1);

    // Prevent setting state on removed component.
    if (consumer === this.consumer) {
      this.consumer = null;
    }
  };

  handleFocus: ConsumerHandler = consumer => {
    if (this.consumer) {
      this.consumer.setState({ tabIndex: -1 });
    }
    this.consumer = consumer;
    this.consumer.setState({ tabIndex: 0 });
  };

  focus(focusToEnd: boolean, element: ?Element) {
    if (!element) return;
    const consumer = this.consumers.find(c => c.getFocusable() === element);
    if (!consumer) return;
    consumer.focus(focusToEnd);
  }

  moveHorizontal(left: boolean, index: number, focusables: Array<Element>) {
    this.focus(!left, focusables[index + (left ? -1 : 1)]);
  }

  moveVertical(
    up: boolean,
    index: number,
    focusables: Array<Element>,
    focusable: Element,
  ) {
    const currentRect = focusable.getBoundingClientRect();
    const focusablesRects = focusables.map(f => f.getBoundingClientRect());

    const nextLineFocusables = [];
    let moveIndex = index;
    let lineRect = currentRect;
    let nextLine = false;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const nextIndex = moveIndex + (up ? -1 : 1);
      const isInRange = nextIndex >= 0 && nextIndex <= focusables.length - 1;
      if (!isInRange) break;
      moveIndex = nextIndex;
      const moveRect = focusablesRects[moveIndex];
      const isNextLine = up
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

    const getCenterX = rect => rect.left + rect.width / 2;
    const centerX = getCenterX(currentRect);
    const byHorizontalCenter = nextLineFocusables
      .map(index => ({ index, rect: focusablesRects[index] }))
      .sort((a, b) => {
        const d1 = Math.abs(centerX - getCenterX(a.rect));
        const d2 = Math.abs(centerX - getCenterX(b.rect));
        return d1 - d2;
      });

    this.focus(true, focusables[byHorizontalCenter[0].index]);
  }

  move(direction: Direction) {
    if (!this.consumer) return;
    const focusable = this.consumer.getFocusable();
    const focusables = this.getFocusables();
    if (!focusable) return;
    const index = focusables.indexOf(focusable);
    if (index === -1) return null;

    const isHorizontal = direction === 'left' || direction === 'right';
    if (isHorizontal) {
      this.moveHorizontal(direction === 'left', index, focusables);
    } else {
      this.moveVertical(direction === 'up', index, focusables, focusable);
    }
  }

  handleKeyDown: ConsumerWithKeyboardEventHandler = (consumer, event) => {
    // cmd + left/right is for navigation in URL history
    if (event.metaKey) return;
    const direction = getDirection(event.key);
    if (direction == null) return;
    this.move(direction);
  };

  consumer: ?Consumer = null;

  consumers: Array<Consumer> = [];

  render() {
    return this.props.children;
  }
}
