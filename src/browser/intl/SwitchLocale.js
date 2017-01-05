// @flow
import type { State } from '../../common/types';
import React from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { setCurrentLocale } from '../../common/intl/actions';
import {
  Box,
  Button,
} from '../app/components';

type SwitchLocaleProps = {
  currentLocale: string,
  locales: Array<string>,
  setCurrentLocale: typeof setCurrentLocale,
};

const SwitchLocale = ({
  currentLocale,
  locales,
  setCurrentLocale,
}: SwitchLocaleProps) => (
  <Box
    marginBottom={1}
    marginHorizontal={-0.25}
  >
    {locales.map(locale =>
      <Button
        active={locale === currentLocale}
        display="inline-block"
        key={locale}
        marginHorizontal={0.25}
        onClick={() => setCurrentLocale(locale)}
        primary
      >
        {locale}
      </Button>,
    )}
  </Box>
);

export default compose(
  connect(
    (state: State) => ({
      currentLocale: state.intl.currentLocale,
      locales: state.intl.locales,
    }),
    { setCurrentLocale },
  ),
)(SwitchLocale);
