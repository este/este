import Component from 'react-pure-render/component';
import Email from './Email.react';
import React, { PropTypes } from 'react';
import Social from './Social.react';
import ValidationError from '../../common/lib/validation/ValidationError';
import authErrorMessages from '../../common/auth/errorMessages';
import routes from '../routes';
import theme from '../../common/app/theme';
import { Alert, Container } from '../app/components';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { firebaseMessages } from '../../common/lib/redux-firebase';

const styles = StyleSheet.create({
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
    error: PropTypes.instanceOf(Error),
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

  getMessageAndValuesFromError(error) {
    if (!(error instanceof ValidationError)) return [];
    const message =
      authErrorMessages[error.name] ||
      firebaseMessages[error.name] ||
      error.toString();
    const values = error.params;
    return { message, values };
  }

  render() {
    const { error } = this.props;
    const { message, values } = this.getMessageAndValuesFromError(error);

    return (
      <View>
        <Alert message={message} values={values} />
        <ScrollView>
          <Container style={{ alignItems: 'center' }}>
            <Email style={styles.email} />
            <Social style={styles.social} />
          </Container>
        </ScrollView>
      </View>
    );
  }

}

export default connect(state => ({
  error: state.auth.error,
  viewer: state.users.viewer,
}))(SignInPage);
