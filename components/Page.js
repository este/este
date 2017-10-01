// @flow
import A from './A';
import AppError from './AppError';
import Baseline from './Baseline';
import Box from './Box';
import Head from 'next/head';
import LoadingBar from './LoadingBar';
import MainNav from './MainNav';
import React, { type Node } from 'react';
import SwitchLocale from '../components/SwitchLocale';
import Text from './Text';
import type { State } from '../types';
import { FormattedMessage } from 'react-intl';
import ThemeProvider from './ThemeProvider';
import { browserTheme, browserThemeDark } from '../themes/browserTheme';
import { connect, type Connector, type MapStateToProps } from 'react-redux';

const PageContainer = ({ children }) => (
  <Box
    margin="auto"
    paddingHorizontal={1}
    style={{
      maxWidth: 960,
      minHeight: '100vh', // make footer sticky
    }}
  >
    {children}
  </Box>
);

// Flex 1 to make footer sticky.
const PageBody = ({ children }) => (
  <Box flex={1} maxWidth={30} paddingTop={2}>
    {children}
  </Box>
);

const PageFooter = () => (
  <Text
    borderColor="gray"
    borderStyle="solid"
    borderTopWidth={1}
    flexDirection="row"
    marginTop={2}
    paddingVertical={1}
    size={-1}
  >
    <FormattedMessage defaultMessage="made by" id="footer.madeBy" />{' '}
    <A href="https://twitter.com/steida">steida</A>
    {', '}
    <SwitchLocale />
  </Text>
);

const Page = ({ children, darkEnabled, title }) => {
  const theme = darkEnabled ? browserThemeDark : browserTheme;
  const pageBackgroundColor = theme.colors[theme.page.backgroundColor];
  return (
    <ThemeProvider theme={theme}>
      <Baseline>
        <Head>
          <title>{title}</title>
          <meta name="theme-color" content={pageBackgroundColor} />
          <style
            dangerouslySetInnerHTML={{
              __html: `html { background-color: ${pageBackgroundColor} }`,
            }}
          />
        </Head>
        <LoadingBar color={theme.colors.primary} />
        <AppError />
        <PageContainer>
          <MainNav title={title} />
          <PageBody>{children}</PageBody>
          <PageFooter />
        </PageContainer>
      </Baseline>
    </ThemeProvider>
  );
};

type OwnProps = {|
  title: string,
  children?: Node,
|};

type Props = {
  darkEnabled: boolean,
} & OwnProps;

const mapStateToProps: MapStateToProps<*, *, *> = (state: State) => ({
  darkEnabled: state.app.darkEnabled,
});

const connector: Connector<OwnProps, Props> = connect(mapStateToProps);

export default connector(Page);
