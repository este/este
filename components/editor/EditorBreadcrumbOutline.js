// @flow
/* eslint-env browser */
// $FlowFixMe
import React, { useState, useEffect } from 'react';
import useTheme from '../core/useTheme';
import usePortal from '../core/usePortal';
// $FlowFixMe
import { findDOMNode } from 'slate-react';
import { View } from 'react-native';

export default function EditorBreadcrumbOutline({ node }: {| node: Object |}) {
  const [styles, setStyles] = useState(null);
  const portal = usePortal();
  const theme = useTheme();

  useEffect(
    () => {
      // eslint-disable-next-line react/no-find-dom-node
      const rect = findDOMNode(node.key).getBoundingClientRect();
      const styles = {
        left: {
          width: 1,
          height: rect.height,
          left: rect.left + window.pageXOffset,
          top: rect.top + window.pageYOffset,
        },
        right: {
          width: 1,
          height: rect.height,
          left: rect.right - 1 + window.pageXOffset,
          top: rect.top + window.pageYOffset,
        },
        top: {
          width: rect.width,
          height: 1,
          left: rect.left + window.pageXOffset,
          top: rect.top + window.pageYOffset,
        },
        bottom: {
          width: rect.width,
          height: 1,
          left: rect.left + window.pageXOffset,
          top: rect.bottom - 1 + window.pageYOffset,
        },
      };
      setStyles(styles);
      const timeoutID = setTimeout(() => {
        setStyles(null);
      }, 1000);
      return () => {
        clearTimeout(timeoutID);
      };
    },
    [node],
  );

  if (portal == null || styles == null) return null;

  return portal(
    <>
      <View style={[theme.styles.editorBreadcrumbOutline, styles.left]} />
      <View style={[theme.styles.editorBreadcrumbOutline, styles.right]} />
      <View style={[theme.styles.editorBreadcrumbOutline, styles.top]} />
      <View style={[theme.styles.editorBreadcrumbOutline, styles.bottom]} />
    </>,
  );
}
