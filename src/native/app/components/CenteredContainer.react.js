import React, { Component, PropTypes } from 'react';
import { Container } from './';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class CenteredContainer extends Component {

  static propTypes = {
    children: PropTypes.node,
    style: View.propTypes.style,
  };

  render() {
    const { children, style } = this.props;
    return (
      <Container {...this.props} style={[styles.centeredContainer, style]}>
        {children}
      </Container>
    );
  }

}
