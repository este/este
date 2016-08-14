import Email from './Email.react';
import React, { Component, PropTypes } from 'react';
import Social from './Social.react';
import theme from '../app/theme';
import { Container } from '../app/components';
import { ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { selectTab } from '../routing/actions';

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

class SignInPage extends Component {

  static propTypes = {
    selectTab: PropTypes.func.isRequired,
    viewer: PropTypes.object,
  };

  constructor() {
    super();
    this.wasRedirected = false;
  }

  componentWillReceiveProps({ viewer, selectTab }) {
    if (!viewer) return;
    if (this.wasRedirected) return;
    this.wasRedirected = true;
    selectTab('home');
  }

  render() {
    return (
      <ScrollView>
        <Container style={styles.container}>
          <Email style={styles.email} />
          <Social style={styles.social} />
        </Container>
      </ScrollView>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer,
}), { selectTab })(SignInPage);
