// @flow
import type { State } from '../../common/types';
import React from 'react';
import { Box, Button, Text } from '../../common/components';
import { FormattedDate, FormattedRelative } from 'react-intl';
import { connect } from 'react-redux';
import { setCurrentLocale } from '../../common/intl/actions';

type IntlPageProps = {
  currentLocale: string,
  locales: Array<string>,
  setCurrentLocale: typeof setCurrentLocale,
};

const Locales = ({
  currentLocale,
  locales,
  setCurrentLocale,
}) => (
  <Box>
    {locales.map(locale =>
      <Button
        // style={[styles.text, locale === currentLocale && styles.selected]}
        bold={locale === currentLocale}
        size={1}
        // paddingVertical={0.5}
        key={locale}
        onPress={() => setCurrentLocale(locale)}
      >{locale.toLowerCase()}</Button>,
    )}
  </Box>
);

const IntlPage = ({
  currentLocale,
  locales,
  setCurrentLocale
}: IntlPageProps) => {
  const componentRenderedAt = Date.now();
  return (
    <Box>
      <Locales
        currentLocale={currentLocale}
        locales={locales}
        setCurrentLocale={setCurrentLocale}
      />
      {/* <FormattedDate
        day="numeric"
        month="short"
        style={{ margin: theme.fontSize }}
        value={Date.now()}
        year="numeric"
      />
      <FormattedRelative
        initialNow={componentRenderedAt}
        updateInterval={1000 * 1}
        value={componentRenderedAt}
      /> */}
    </Box>
  );
};

export default connect(
  (state: State) => ({
    currentLocale: state.intl.currentLocale,
    locales: state.intl.locales,
  }),
  { setCurrentLocale },
)(IntlPage);
