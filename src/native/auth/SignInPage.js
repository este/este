/* @flow */
import Email from './Email';
import React from 'react';
import Social from './Social';
import theme from '../app/themes/initial';
import { Container } from '../app/components';
import { Redirect } from 'react-router';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  email: {
    marginBottom: theme.fontSize * 2,
    width: theme.fontSize * 16,
  },
  social: {
    alignSelf: 'center',
  },
});

const SignInPage = ({ location, viewer }) => (
  viewer ?
    <Redirect
      to={(
        location.state &&
        location.state.from &&
        location.state.from.pathname
      ) || '/'}
    />
  :
    <ScrollView>
      <Container style={styles.container}>
        <Email style={styles.email} />
        <Social style={styles.social} />
      </Container>
    </ScrollView>
);

SignInPage.propTypes = {
  location: React.PropTypes.object.isRequired,
  viewer: React.PropTypes.object,
};

export default connect(state => ({
  viewer: state.users.viewer,
}))(SignInPage);
