/* @flow */
import React from 'react';
import { Container } from './';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class CenteredContainer extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    style: View.propTypes.style,
  };

  render() {
    const { children, style, ...props } = this.props;
    return (
      <Container {...props} style={[styles.centeredContainer, style]}>
        {children}
      </Container>
    );
  }

}

export default CenteredContainer;
