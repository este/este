// @flow
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ContainerProps = {
  // style: ViewPropTypes.style,
  children?: ?React.Node,
};

const containerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },
});

class Container extends React.PureComponent<ContainerProps> {
  render() {
    return <View style={containerStyles.container}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    fontSize: 24,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//   },
// });
//
const Test = () => (
  <Container>
    <Text style={styles.text}>Welcome to Next.js!</Text>
  </Container>
);

export default Test;
