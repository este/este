// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {|
  children: React.Node,
|};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
});

class Row extends React.PureComponent<Props> {
  render() {
    return <View style={styles.view}>{this.props.children}</View>;
  }
}

export default Row;
