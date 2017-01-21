 // @flow
import type { State, User } from '../../common/types';
// import Email from './Email';
import React from 'react';
import Social from './Social';
import { Box } from '../../common/components';
import { Redirect } from 'react-router';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

// import theme from '../app/themes/initial';
// import { Container } from '../app/components';
// const styles = StyleSheet.create({
//   email: {
//     marginBottom: theme.fontSize * 2,
//     width: theme.fontSize * 16,
//   },
//   social: {
//     alignSelf: 'center',
//   },
// });
//

type SignInPageProps = {
  location: Object,
  viewer: User,
};

const SignInPage = ({
  location,
  viewer,
}: SignInPageProps) => (
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
      <Box alignItems="center" paddingTop={1}>
        {/* <Email style={styles.email} /> */}
        <Social />
      </Box>
    </ScrollView>
);

export default connect(
  (state: State) => ({
    viewer: state.users.viewer,
  }),
)(SignInPage);
