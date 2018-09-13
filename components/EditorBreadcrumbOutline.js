// @flow
/* eslint-env browser */
import * as React from 'react';
import { View } from 'react-native';
import ReactDOM from 'react-dom';
import { findDOMNode } from 'slate-react';
import withTheme, { type Theme } from './core/withTheme';

type EditorBreadcrumbOutlineProps = {|
  node: Object,
  theme: Theme,
|};

type EditorBreadcrumbOutlineState = {|
  el: ?HTMLDivElement,
  rect: ?ClientRect,
  shown: boolean,
|};

class EditorBreadcrumbOutline extends React.PureComponent<
  EditorBreadcrumbOutlineProps,
  EditorBreadcrumbOutlineState,
> {
  state = {
    el: null,
    rect: null,
    shown: true,
  };

  componentDidMount() {
    // Can't be in constructor because of SSR where window does not exists.
    const el = window.document.getElementById('__next');
    const rect = this.getRect();
    this.setState({ el, rect }, this.hideAfterSomeTime);
  }

  componentDidUpdate(prevProps) {
    // Because of state.rect, always compare values.
    if (this.props.node !== prevProps.node) {
      const rect = this.getRect();
      this.setState({ rect }, this.hideAfterSomeTime);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
  }

  getRect() {
    // eslint-disable-next-line react/no-find-dom-node
    return findDOMNode(this.props.node.key).getBoundingClientRect();
  }

  hideAfterSomeTime = () => {
    this.setState({ shown: true }, () => {
      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(() => {
        this.setState({ shown: false });
      }, 1000);
    });
  };

  timeoutID: TimeoutID;

  render() {
    const { el, rect, shown } = this.state;
    if (el == null || rect == null || shown === false) return null;
    const { theme } = this.props;
    return ReactDOM.createPortal(
      <>
        <View
          style={[
            theme.styles.editorBreadcrumbOutline,
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
            theme.styles.editorBreadcrumbOutline,
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
            theme.styles.editorBreadcrumbOutline,
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
            theme.styles.editorBreadcrumbOutline,
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
