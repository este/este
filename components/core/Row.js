// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Spacer from './Spacer';

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
    const { children } = this.props;
    return (
      <View style={styles.view}>
        <Spacer>{children}</Spacer>
      </View>
    );
  }
}

export default Row;
