// @flow
import { defineMessages } from 'react-intl';

// TODO: Consider https://github.com/BDav24/next-url-prettifier

const titles = defineMessages({
  index: { defaultMessage: 'Home', id: 'sitemap.title.index' },
  me: { defaultMessage: 'Me', id: 'sitemap.title.me' },
  signIn: { defaultMessage: 'Sign In', id: 'sitemap.title.signIn' },
});

const sitemap = {
  index: { title: titles.index, path: '/' },
  me: { title: titles.me, path: '/me' },
  signIn: { title: titles.signIn, path: '/sign-in' },
};

export default sitemap;
