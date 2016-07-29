import React, { PropTypes, PureComponent } from 'react';
import { Container } from './';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class CenteredContainer extends PureComponent {

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
