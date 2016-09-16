/* @flow */
import React from 'react';
import { Footer } from '../app/components';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  madeByHtml: {
    defaultMessage: '©2016 Flamingo City.',
    id: 'footer.madeByHtml',
  },
});

const styles = {
  footerBox: {
    minWidth: '100%',
    borderTop: 'none',
    paddingLeft: '10px',
  },
};

const AppFooter = () => (
  <Footer style={styles.footerBox}>
    <FormattedMessage {...messages.madeByHtml} />
    {'\u00a0'}
    {/* <Link to="https://twitter.com/steida">
      steida
    </Link> */}
  </Footer>
);

export default AppFooter;
