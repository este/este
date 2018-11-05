// @flow
import React, { type Node } from 'react';
import { StyleSheet, View } from 'react-native';
import Spacer from './Spacer';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  wrap: {
    flexWrap: 'wrap',
  },
});

export default function Row(props: {|
  children: Node,
  rhythm?: number,
  wrap?: boolean,
|}) {
  return (
    <View style={[styles.view, props.wrap === true && styles.wrap]}>
      <Spacer rhythm={props.rhythm}>{props.children}</Spacer>
    </View>
  );
}
