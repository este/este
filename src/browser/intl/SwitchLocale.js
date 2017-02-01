// @flow
import type { State } from '../../common/types';
import React from 'react';
import { Box, Button } from '../../common/components';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { setCurrentLocale } from '../../common/intl/actions';

type SwitchLocaleProps = {
  currentLocale: string,
  locales: Array<string>,
  setCurrentLocale: typeof setCurrentLocale,
};

const SwitchLocale = (
  { currentLocale, locales, setCurrentLocale }: SwitchLocaleProps,
) => (
  <Box
    flexDirection="row"
    flexWrap="wrap"
    marginBottom={1}
    marginHorizontal={-0.25}
  >
    {locales.map(locale => (
      <Button
        outline={locale !== currentLocale}
        key={locale}
        marginHorizontal={0.25}
        onClick={() => setCurrentLocale(locale)}
        primary
      >
        {locale}
      </Button>
    ))}
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
