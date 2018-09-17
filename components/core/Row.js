// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Spacer from './Spacer';

type Props = {|
  children: React.Node,
  rhythm?: number,
  wrap?: boolean,
|};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  wrap: {
    flexWrap: 'wrap',
  },
});

class Row extends React.PureComponent<Props> {
  render() {
    const { children, rhythm, wrap } = this.props;
    return (
      <View style={[styles.view, wrap === true && styles.wrap]}>
        <Spacer rhythm={rhythm}>{children}</Spacer>
      </View>
    );
  }
}

export default Row;
