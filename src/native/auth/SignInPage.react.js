import Email from './Email.react';
import React, { Component, PropTypes } from 'react';
import Social from './Social.react';
import routes from '../routes';
import theme from '../app/theme';
import { Container } from '../app/components';
import { ScrollView, StyleSheet, View } from 'react-native';
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

class SignInPage extends Component {

  static propTypes = {
    navigator: PropTypes.object,
    viewer: PropTypes.object,
  };

  constructor() {
    super();
    this.wasRedirected = false;
  }

  componentWillReceiveProps({ navigator, viewer }) {
    if (!viewer) return;
    if (this.wasRedirected) return;
    this.wasRedirected = true;
    navigator.replace(routes.home);
  }

  render() {
    return (
      <View>
        <ScrollView>
          <Container style={styles.container}>
            <Email style={styles.email} />
            <Social style={styles.social} />
          </Container>
        </ScrollView>
      </View>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer,
}))(SignInPage);
