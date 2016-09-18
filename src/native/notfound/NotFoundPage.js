/* @flow */
import React from 'react';
import messages from '../../common/notfound/messages';
import theme from '../app/themes/initial';
import { Button, CenteredContainer, FormattedMessage } from '../app/components';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

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

// Use NotFoundPage for missing dynamic data. For non existing static page, use
// redirect to home rather.
const NotFoundPage = () => (
  <CenteredContainer>
    <FormattedMessage {...messages.h1} style={styles.heading} />
    <FormattedMessage {...messages.p} style={styles.paragraph} />
    {/* onPress={() => selectTab('home')} */}
    <Button>
      <FormattedMessage {...messages.continue} style={styles.button} />
    </Button>
  </CenteredContainer>
);

NotFoundPage.propTypes = {
  selectTab: React.PropTypes.func.isRequired,
};

export default NotFoundPage;
