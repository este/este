/* eslint-env browser */
import Head from 'next/head';
import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  findNodeHandle,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { useAppContext } from '@app/hooks/useAppContext';
import { usePageTitles } from '@app/hooks/usePageTitles';
import { LayoutQuery } from '@app/relay/generated/LayoutQuery.graphql';
import { Gravatar } from './Gravatar';
import { NProgress } from './NProgress';
import { Link } from './Link';

interface HeaderProps {
  viewer: LayoutQuery['viewer'];
}

const Header: FunctionComponent<HeaderProps> = ({ viewer }) => {
  const { theme } = useAppContext();
  const pageTitles = usePageTitles();

  return (
    <View style={theme.layoutHeader}>
      <Text style={theme.text}>
        <Link prefetch href={{ pathname: '/' }}>
          {pageTitles.index}
        </Link>
      </Text>
      <Text style={[theme.text, theme.marginStartAuto]}>
        {viewer ? (
          <Link prefetch href={{ pathname: '/me' }}>
            <Gravatar
              email={viewer.email}
              size={StyleSheet.flatten(theme.text).lineHeight}
              inline
              rounded
            />
          </Link>
        ) : (
          <Link prefetch href={{ pathname: '/signin' }}>
            {pageTitles.signIn}
          </Link>
        )}
      </Text>
    </View>
  );
};

const Footer: FunctionComponent = () => {
  const { theme } = useAppContext();
  return (
    <View style={theme.layoutFooter}>
      <Text style={theme.layoutFooterText}>
        <FormattedMessage defaultMessage="made by" id="pageFooterMadeBy" />{' '}
        <Link href={{ pathname: 'https://twitter.com/steida' }}>steida</Link>
      </Text>
    </View>
  );
};

let initialRender = true;

interface LayoutWithDataProps {
  title: string;
  data: LayoutQuery;
  hideFooter?: boolean;
}

const LayoutWithData: React.FunctionComponent<LayoutWithDataProps> = props => {
  const { theme } = useAppContext();
  const [htmlBackgroundColor, nprogressColor] = React.useMemo(() => {
    return [
      StyleSheet.flatten(theme.layoutScrollView).backgroundColor || '#fff',
      StyleSheet.flatten(theme.link).color || '#29d',
    ];
  }, [theme]);
  const layoutBodyRef = React.useRef<View>(null);

  // https://medium.com/@robdel12/single-page-apps-routers-are-broken-255daa310cf
  // Useful for accessibility and key navigation.
  React.useEffect(() => {
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
  });

  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="theme-color" content={htmlBackgroundColor} />
        <style>{`html{background-color:${htmlBackgroundColor}}`}</style>
      </Head>
      <NProgress color={nprogressColor} />
      {/* Note Header is always visible. */}
      <Header viewer={props.data.viewer} />
      <ScrollView
        style={theme.layoutScrollView}
        contentContainerStyle={theme.layoutScrollViewContentContainer}
      >
        <View ref={layoutBodyRef} style={theme.layoutBody}>
          {props.children}
        </View>
        {/* Note Footer is always at the bottom because of minHeight 100%. */}
        {props.hideFooter !== true && <Footer />}
      </ScrollView>
    </>
  );
};

export const Layout = createFragmentContainer(
  LayoutWithData,
  graphql`
    fragment LayoutQuery on Query {
      viewer {
        email
      }
    }
  `,
);
