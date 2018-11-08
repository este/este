// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import getFocusableNodes from '../../client/getFocusableNodes';

// Note it's implemented out of React with plain DOM because it's easier.
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets

// TODO: Make pure React version with context etc. Handling refs should be much
// easier with hooks.

// https://flow.org/en/docs/react/hoc/#toc-supporting-defaultprops-with-react-elementconfig
const withRovingTabIndex = <Props, Component: React.ComponentType<Props>>(
  WrappedComponent: Component,
): React.ComponentType<React.ElementConfig<Component>> => {
  class RovingTabIndex extends React.PureComponent<Props> {
    static maybeIgnoreElementWithCaret(focused, left) {
      if (!focused.classList.contains('caret-position')) return;
      const ignore =
        (left && !focused.classList.contains('caret-position-start')) ||
        (!left && !focused.classList.contains('caret-position-end'));
      return ignore;
    }

    componentDidMount() {
      // We need it, because we can't use DOM node ref easily.
      // eslint-disable-next-line react/no-find-dom-node
      this.node = ReactDOM.findDOMNode(this);
      const node = this.node;
      if (node == null) return;
      node.addEventListener('focusin', this.handleFocusin);
      node.addEventListener('keydown', this.handleKeydown);
    }

    componentWillUnmount() {
      const node = this.node;
      if (node == null) return;
      node.removeEventListener('focusin', this.handleFocusin);
      node.addEventListener('keydown', this.handleKeydown);
    }

    setTabIndexes(focused) {
      const nodes = getFocusableNodes(this);
      nodes.forEach(node => {
        // eslint-disable-next-line no-param-reassign
        node.tabIndex = node === focused ? 0 : -1;
      });
    }

    handleFocusin = (event: FocusEvent) => {
      this.setTabIndexes(event.target);
    };

    handleKeydown = (event: KeyboardEvent) => {
      const focused = ((event.target: any): HTMLElement);
      const isArrowLeft = event.key === 'ArrowLeft';
      if (isArrowLeft || event.key === 'ArrowRight') {
        this.moveHorizontal(focused, isArrowLeft);
      }
      const isArrowUp = event.key === 'ArrowUp';
      if (isArrowUp || event.key === 'ArrowDown') {
        this.moveVertical(focused, isArrowUp);
      }
    };

    moveHorizontal(focused, left: boolean) {
      if (RovingTabIndex.maybeIgnoreElementWithCaret(focused, left)) return;
      const nodes = getFocusableNodes(this);
      const index = nodes.indexOf(focused);
      const nextFocusedNode = nodes[index + (left ? -1 : 1)];
      if (nextFocusedNode == null) return;
      nextFocusedNode.focus();
    }

    moveVertical(focused, up: boolean) {
      if (RovingTabIndex.maybeIgnoreElementWithCaret(focused, up)) return;
      const nodes = getFocusableNodes(this);
      const index = nodes.indexOf(focused);

      const rect = focused.getBoundingClientRect();
      const rects = nodes.map(node => node.getBoundingClientRect());

      const nextLineNodes = [];
      let moveIndex = index;
      let lineRect = rect;
      let nextLine = false;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const nextIndex = moveIndex + (up ? -1 : 1);
        const isInRange = nextIndex >= 0 && nextIndex <= nodes.length - 1;
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

      const getCenterX = r => r.left + r.width / 2;
      const centerX = getCenterX(rect);
      const byHorizontalCenter = nextLineNodes
        // eslint-disable-next-line no-shadow
        .map(index => ({ index, rect: rects[index] }))
        .sort((a, b) => {
          const d1 = Math.abs(centerX - getCenterX(a.rect));
          const d2 = Math.abs(centerX - getCenterX(b.rect));
          return d1 - d2;
        });

      const nextFocusedNode = nodes[byHorizontalCenter[0].index];
      if (nextFocusedNode == null) return;
      nextFocusedNode.focus();
    }

    node: null | Element | Text;

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return RovingTabIndex;
};

export default withRovingTabIndex;
