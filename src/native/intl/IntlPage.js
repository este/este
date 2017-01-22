// @flow
import type { State } from '../../common/types';
import React from 'react';
import { Box, Button, Text } from '../../common/components';
import { FormattedDate, FormattedRelative } from 'react-intl';
import { ScrollView } from 'react-native';
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
  <Box marginBottom={1}>
    {locales.map(locale =>
      <Button
        bold={locale === currentLocale}
        key={locale}
        onPress={() => setCurrentLocale(locale)}
        size={1}
      >{locale.toLowerCase()}</Button>,
    )}
  </Box>
);

const IntlPage = ({
  currentLocale,
  locales,
  setCurrentLocale,
}: IntlPageProps) => {
  const componentRenderedAt = Date.now();
  return (
    <ScrollView>
      <Box
        alignItems="center"
        paddingVertical={1}
      >
        <Locales
          currentLocale={currentLocale}
          locales={locales}
          setCurrentLocale={setCurrentLocale}
        />
        {/* This ugly wrapping will not be necessary soon with React Fiber */}
        <FormattedDate
          day="numeric"
          month="short"
          value={Date.now()}
          year="numeric"
        >{message =>
          <Text>{message}</Text>
        }</FormattedDate>
        <FormattedRelative
          initialNow={componentRenderedAt}
          updateInterval={1000 * 1}
          value={componentRenderedAt}
        >{message =>
          <Text>{message}</Text>
        }</FormattedRelative>
      </Box>
    </ScrollView>
  );
};

export default connect(
  (state: State) => ({
    currentLocale: state.intl.currentLocale,
    locales: state.intl.locales,
  }),
  { setCurrentLocale },
)(IntlPage);
