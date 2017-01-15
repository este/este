// @flow
import type { State } from '../../common/types';
import type { Theme } from '../../common/themes/types';
import * as themes from '../themes';
import React from 'react';
import start from '../../common/app/start';
import { ScrollView, Slider } from 'react-native';
import { ThemeProvider } from 'react-fela';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import {
  Box,
  ToggleBaseline,
  Text,
} from '../../common/components';
import {
  Baseline,
} from '../components';

type AppProps = {
  themeName: string,
  theme: Theme,
};

// TODO: Demonstrate this pattern elsewhere.
const StyledSlider = (props) => (
  <Box as={Slider} {...props} />
);

const App = ({
  theme,
  themeName,
}: AppProps) => (
  <ThemeProvider
    key={themeName} // Enforce rerender.
    theme={theme}
  >
    <ScrollView>
      <Baseline lineHeight={theme.typography.lineHeight}>
        <Box
          marginLeft={1}
          marginRight={1}
          // borderTopWidth={20}
          // borderTopColor="danger"
          // borderRadius={2}
          // borderWidth={3}
          // borderColor="warning"
          style={theme => ({
            // marginTop: 100,
            // marginLeft: 1,
            // borderColor: 'red',
            // borderWidth: 1,
            // borderLeftWidth: 3,
            // borderTopRightRadius: 10,
            marginTop: theme.typography.rhythm(3),
          })}
        >
          <Box
            borderBottomWidth={3}
            padding={0.5}
          >
            <Text>fok</Text>
          </Box>
          <Box
            borderColor="primary"
            borderTopWidth={3}
            // paddingTop={3}
            // height={2}
            // paddingVertical={.5}
          >
            <Text
              // style={theme => ({
              //   lineHeight: theme.typography.lineHeight - 2,
              // })}
              // align="left"
              // color="danger"
              // backgroundColor="warning"
              bold
              // borderBottomColor="primary"
              // borderBottomWidth={20}
              // size={-1}
              // color="warning"
              // marginLeft={1}
            >wtd</Text>
          </Box>
          <Text>ddfok</Text>
          <StyledSlider
            maximumValue={3}
            height={2}
          />
          <Text>fok</Text>
          <ToggleBaseline />
        </Box>
      </Baseline>
    </ScrollView>
  </ThemeProvider>
);

export default compose(
  connect(
    (state: State) => ({
      themeName: state.app.currentTheme,
      theme: themes[state.app.currentTheme] || themes.defaultTheme,
    }),
  ),
  start,
)(App);

// import type { State } from '../../common/types';
// import Menu from './Menu';
// import Page from './Page';
// import React from 'react';
// import SideMenu from 'react-native-side-menu';
// import start from '../../common/app/start';
// import { Container } from './components';
// import { Match, Redirect } from 'react-router';
// import { Platform, StatusBar } from 'react-native';
// import { appShowMenu } from '../../common/app/actions';
// import { compose } from 'ramda';
// import { connect } from 'react-redux';
//
// // Pages
// import HomePage from '../home/HomePage';
// import IntlPage from '../intl/IntlPage';
// import MePage from '../me/MePage';
// import OfflinePage from '../offline/OfflinePage';
// import SignInPage from '../auth/SignInPage';
// import TodosPage from '../todos/TodosPage';
//
// const App = ({ appMenuShown, appShowMenu, appStarted }) => {
//   // TODO: Add splash screen.
//   if (!appStarted) return null;
//   return (
//     <Container inverse>
//       {Platform.OS === 'ios' && // Because iOS StatusBar is an overlay.
//         <StatusBar hidden={appMenuShown} />
//       }
//       <SideMenu
//         isOpen={appMenuShown}
//         menu={<Menu />}
//         onChange={appShowMenu}
//       >
//         <Page exactly pattern="/" component={HomePage} />
//         <Page pattern="/intl" component={IntlPage} />
//         <Page pattern="/offline" component={OfflinePage} />
//         <Page pattern="/signin" component={SignInPage} />
//         <Page pattern="/todos" component={TodosPage} />
//         <Page authorized pattern="/me" component={MePage} />
//         {/* Miss does't work in React Native for some reason. */}
//         {/* <Miss render={() => <Redirect to="/" />} /> */}
//         <Match
//           pattern="/"
//           render={({ location: { pathname } }) => {
//             const urls = ['/', '/intl', '/offline', '/signin', '/todos', '/me'];
//             if (urls.indexOf(pathname) !== -1) return null;
//             return (
//               <Redirect to="/" />
//             );
//           }}
//         />
//       </SideMenu>
//     </Container>
//   );
// };
//
// App.propTypes = {
//   appMenuShown: React.PropTypes.bool.isRequired,
//   appShowMenu: React.PropTypes.func.isRequired,
//   appStarted: React.PropTypes.bool.isRequired,
// };
//
// export default compose(
//   start,
//   connect(
//     (state: State) => ({
//       appMenuShown: state.app.menuShown,
//       appStarted: state.app.started,
//     }),
//     { appShowMenu },
//   ),
// )(App);
