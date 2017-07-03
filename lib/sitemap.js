// @flow
import { defineMessages } from 'react-intl';

// TODO: Consider https://github.com/BDav24/next-url-prettifier

const titles = defineMessages({
  index: {
    defaultMessage: 'Este',
    id: 'sitemap.title.index',
  },
  forms: {
    defaultMessage: 'Forms',
    id: 'sitemap.title.forms',
  },
  i18n: {
    defaultMessage: 'i18n',
    id: 'sitemap.title.i18n',
  },
  apollo: {
    defaultMessage: 'Apollo',
    id: 'sitemap.title.apollo',
  },
  signIn: {
    defaultMessage: 'Sign In',
    id: 'sitemap.title.signIn',
  },
});

const sitemap = {
  index: {
    title: titles.index,
    path: '/',
  },
  forms: {
    title: titles.forms,
    path: '/forms',
  },
  i18n: {
    title: titles.i18n,
    path: '/i18n',
  },
  apollo: {
    title: titles.apollo,
    path: '/apollo',
  },
  signIn: {
    title: titles.signIn,
    path: '/sign-in',
  },
};

export default sitemap;
