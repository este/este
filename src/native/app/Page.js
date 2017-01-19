// @flow
import Header from './Header';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Box, Match } from '../../common/components';
import { ScrollView, StyleSheet } from 'react-native';
import { injectIntl } from 'react-intl';

// import { Alert } from './components';

type PageProps = {
  component: () => React.Element<*>,
  exactly?: boolean,
  intl: $IntlShape,
  pattern: string,
};

const titles = {
  '/': linksMessages.home,
  '/intl': linksMessages.intl,
  '/offline': linksMessages.offline,
  '/signin': linksMessages.signIn,
  '/todos': linksMessages.todos,
  '/me': linksMessages.me,
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

const Page = ({
  component: Component,
  exactly,
  intl,
  pattern,
}: PageProps) => (
  <Match
    exactly={exactly}
    pattern={pattern}
    render={renderProps => (
      <Box
        // We need flex and backgroundColor to cover SideMenu.
        backgroundColor="white"
        flex={1}
      >
        {titles[pattern] &&
          <Header title={intl.formatMessage(titles[pattern])} />
        }
        {/* <Alert />*/}
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Component {...renderProps} />
        </ScrollView>
      </Box>
    )}
  />
);

export default injectIntl(Page);
