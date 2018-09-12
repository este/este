// @flow
/* eslint-env browser */
import * as React from 'react';
import { View } from 'react-native';
import ReactDOM from 'react-dom';
import withTheme, { type Theme } from './core/withTheme';

type EditorBreadcrumbOutlineProps = {|
  node: Object,
  theme: Theme,
|};

type EditorBreadcrumbOutlineState = {|
  el: ?HTMLDivElement,
|};

class EditorBreadcrumbOutline extends React.PureComponent<
  EditorBreadcrumbOutlineProps,
  EditorBreadcrumbOutlineState,
> {
  state = {
    el: null,
  };

  componentDidMount() {
    // Can't be in constructor because of SSR where window does not exists.
    const el = window.document.getElementById('__next');
    this.setState({ el });
  }

  render() {
    const { el } = this.state;
    if (el == null) return null;
    // findDOMNode and getBoundingClientRect in render are ok because
    // component is pure aka rerendered only when prop node is changed.
    // Can't use findDOMNode because it throws when node does not exists.
    // import { findDOMNode } from 'slate-react';
    // It's possible to use componentDidMount with setState, but this is fine
    // I guess.
    const {
      node,
      theme: { styles },
    } = this.props;
    const nodeElement: Element = window.document.querySelector(
      `[data-key="${node.key}"]`,
    );
    if (nodeElement == null) return null;
    const rect = nodeElement.getBoundingClientRect();
    return ReactDOM.createPortal(
      <>
        <View
          style={[
            styles.editorBreadcrumbOutline,
            {
              width: 1,
              height: rect.height,
              left: rect.left + window.pageXOffset,
              top: rect.top + window.pageYOffset,
            },
          ]}
        />
        <View
          style={[
            styles.editorBreadcrumbOutline,
            {
              width: 1,
              height: rect.height,
              left: rect.right - 1 + window.pageXOffset,
              top: rect.top + window.pageYOffset,
            },
          ]}
        />
        <View
          style={[
            styles.editorBreadcrumbOutline,
            {
              width: rect.width,
              height: 1,
              left: rect.left + window.pageXOffset,
              top: rect.top + window.pageYOffset,
            },
          ]}
        />
        <View
          style={[
            styles.editorBreadcrumbOutline,
            {
              width: rect.width,
              height: 1,
              left: rect.left + window.pageXOffset,
              top: rect.bottom - 1 + window.pageYOffset,
            },
          ]}
        />
      </>,
      el,
    );
  }
}

export default withTheme(EditorBreadcrumbOutline);
