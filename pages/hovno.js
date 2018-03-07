// @flow
import * as React from 'react';
// $FlowFixMe https://github.com/necolas/react-native-web/issues/857
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    alignItems: 'center',
    fontSize: 24,
  },
});

const Test = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Welcome to Next.js!</Text>
  </View>
);

export default Test;
