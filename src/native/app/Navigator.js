/* @flow */
import Header from './Header';
import NotFoundPage from '../notfound/NotFound';
import React from 'react';
import notFoundMessages from '../../common/notfound/messages';
import { Alert, Container } from './components';
import { Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

// This is temporary pure React Native solution.

let Navigator = ({ currentTab, intl, menuShown, routes }) => {
  const route = routes.tabs[currentTab];
  const RoutePage = route ? route.component : NotFoundPage;
  const title = route ? route.title : notFoundMessages.title;
  return (
    <Container>
      {Platform.OS === 'ios' && // Because iOS StatusBar is an overlay.
        <StatusBar hidden={menuShown} />
      }
      <Header title={intl.formatMessage(title)} />
      <Alert />
      <RoutePage />
    </Container>
  );
};

Navigator.propTypes = {
  currentTab: React.PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  menuShown: React.PropTypes.bool.isRequired,
  routes: React.PropTypes.object.isRequired,
};

Navigator = injectIntl(Navigator);

export default connect(state => ({
  currentTab: state.routing.currentTab,
  menuShown: state.app.menuShown,
}))(Navigator);
