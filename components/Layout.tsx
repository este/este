import Head from 'next/head';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { findNodeHandle, StyleSheet, Text, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import Gravatar from '../components/Gravatar';
import NProgress from '../components/NProgress';
import { LayoutQuery } from '../generated/LayoutQuery.graphql';
import useAppContext from '../hooks/useAppContext';
import { pageTitles } from '../pages/_app';
import Link from './Link';

interface HeaderProps {
  viewer: LayoutQuery['viewer'];
}

const Header: React.FunctionComponent<HeaderProps> = ({ viewer }) => {
  const { intl, theme } = useAppContext();

  return (
    <View style={theme.layoutHeader}>
      <Text style={theme.text}>
        <Link prefetch href="/">
          {intl.formatMessage(pageTitles.index)}
        </Link>
      </Text>
      <Text style={[theme.text, theme.marginStartAuto]}>
        {viewer ? (
          <Link prefetch href="/me">
            <Gravatar
              email={viewer.email}
              size={StyleSheet.flatten(theme.text).lineHeight}
              inline
              rounded
            />
          </Link>
        ) : (
          <Link prefetch href={{ pathname: '/signin' }}>
            {intl.formatMessage(pageTitles.signIn)}
          </Link>
        )}
      </Text>
    </View>
  );
};

const Footer: React.FunctionComponent = () => {
  const { theme } = useAppContext();
  return (
    <View style={theme.layoutFooter}>
      <Text style={theme.layoutFooterText}>
        <FormattedMessage defaultMessage="made by" id="pageFooterMadeBy" />{' '}
        <Link href="https://twitter.com/steida">steida</Link>
      </Text>
    </View>
  );
};

let initialRender = true;

interface LayoutProps {
  title: string;
  data: LayoutQuery;
}

const Layout: React.FunctionComponent<LayoutProps> = props => {
  const { theme } = useAppContext();
  const [htmlBackgroundColor, nprogressColor] = React.useMemo(
    () => {
      return [
        StyleSheet.flatten(theme.layout).backgroundColor || '#fff',
        StyleSheet.flatten(theme.link).color || '#29d',
      ];
    },
    [theme.layout],
  );
  const layoutBodyRef = React.useRef<View>(null);

  React.useEffect(() => {
    maybeFocusLayoutBody();
  }, []);

  // https://medium.com/@robdel12/single-page-apps-routers-are-broken-255daa310cf
  // Useful for accessibility and key navigation.
  const maybeFocusLayoutBody = () => {
    if (!layoutBodyRef.current) return;
    // Do not focus on the initial render.
    if (initialRender === true) {
      initialRender = false;
      return;
    }
    // Do not focus if something is already focused.
    const node = (findNodeHandle(layoutBodyRef.current) as unknown) as Element;
    if (node.contains(document.activeElement)) {
      return;
    }
    layoutBodyRef.current.setNativeProps({ style: { outline: 'none' } });
    layoutBodyRef.current.focus();
  };

  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="theme-color" content={htmlBackgroundColor} />
        <style>{` html { background-color: ${htmlBackgroundColor} } `}</style>
      </Head>
      <NProgress color={nprogressColor} />
      <View style={theme.layout}>
        <View style={theme.layoutContainer}>
          <Header viewer={props.data.viewer} />
          <View ref={layoutBodyRef} style={theme.layoutBody}>
            {props.children}
          </View>
          <Footer />
        </View>
      </View>
    </>
  );
};

export default createFragmentContainer(
  Layout,
  graphql`
    fragment LayoutQuery on Query {
      viewer {
        email
      }
    }
  `,
);
