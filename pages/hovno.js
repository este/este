// @flow
import * as React from 'react';
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
