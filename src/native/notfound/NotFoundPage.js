/* @flow */
import React from 'react';
import messages from '../../common/notfound/messages';
import theme from '../app/themes/initial';
import { CenteredContainer, FormattedMessage, Link } from '../app/components';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  heading: {
    fontSize: theme.fontSizeH5,
    margin: theme.fontSizeH5,
  },
  paragraph: {
    margin: theme.fontSize,
  },
  button: {
    fontWeight: 'bold',
  },
});

// It's better to redirect to home for missing static pages. Use NotFoundPage
// only for missing dynamic pages.
const NotFoundPage = () => (
  <CenteredContainer>
    <FormattedMessage {...messages.h1} style={styles.heading} />
    <FormattedMessage {...messages.p} style={styles.paragraph} />
    <Link to="/">
      <FormattedMessage {...messages.continue} style={styles.button} />
    </Link>
  </CenteredContainer>
);

export default NotFoundPage;
