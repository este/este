// @flow
import { defineMessages } from 'react-intl';

// TODO: Consider https://github.com/BDav24/next-url-prettifier

const titles = defineMessages({
  i18n: { defaultMessage: 'i18n', id: 'sitemap.title.i18n' },
  index: { defaultMessage: 'Este', id: 'sitemap.title.index' },
  me: { defaultMessage: 'Me', id: 'sitemap.title.me' },
  signIn: { defaultMessage: 'Sign In', id: 'sitemap.title.signIn' },
});

const sitemap = {
  // Do not sort.
  index: { title: titles.index, path: '/' },
  i18n: { title: titles.i18n, path: '/i18n' },
  me: { title: titles.me, path: '/me' },
  signIn: { title: titles.signIn, path: '/sign-in' },
};

export default sitemap;
