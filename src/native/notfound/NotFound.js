/* @flow */
import React from 'react';
import messages from '../../common/notfound/messages';
import theme from '../app/themes/initial';
import { Button, CenteredContainer, FormattedMessage } from '../app/components';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { selectTab } from '../routing/actions';

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

const NotFoundPage = ({ selectTab }) => (
  <CenteredContainer>
    <FormattedMessage {...messages.h1} style={styles.heading} />
    <FormattedMessage {...messages.p} style={styles.paragraph} />
    <Button onPress={() => selectTab('home')}>
      <FormattedMessage {...messages.continue} style={styles.button} />
    </Button>
  </CenteredContainer>
);

NotFoundPage.propTypes = {
  selectTab: React.PropTypes.func.isRequired,
};

export default connect(null, { selectTab })(NotFoundPage);
