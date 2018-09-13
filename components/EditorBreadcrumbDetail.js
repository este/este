// @flow
/* eslint-env browser */
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from './core/withTheme';
// import Button from './core/Button';
// import Row from './core/Row';
// import type { VerticalPosition } from './EditorBreadcrumb';

type EditorBreadcrumbDetailProps = {|
  node: Object,
  theme: Theme,
|};

// type EditorBreadcrumbDetailState = {|
// |};

class EditorBreadcrumbDetail extends React.PureComponent<
  EditorBreadcrumbDetailProps,
  // EditorBreadcrumbDetailState,
> {
  // state = {
  // };

  render() {
    return <View>{/* <Row rhythm={0.25} /> */}</View>;
  }
}

export default withTheme(EditorBreadcrumbDetail);
