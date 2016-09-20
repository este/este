/* @flow */
import Header from './Header';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Alert, Container } from './components';
import { Match } from '../../common/app/components';
import { injectIntl, intlShape } from 'react-intl';

const titles = {
  '/': linksMessages.home,
  '/intl': linksMessages.intl,
  '/offline': linksMessages.offline,
  '/signin': linksMessages.signIn,
  '/todos': linksMessages.todos,
  '/me': linksMessages.me,
};

const Page = ({ component: Component, intl, pattern, ...props }) => (
  <Match
    {...props}
    pattern={pattern}
    render={renderProps => (
      <Container>
        {titles[pattern] &&
          <Header title={intl.formatMessage(titles[pattern])} />
        }
        <Alert />
        <Component {...renderProps} />
      </Container>
    )}
  />
);

Page.propTypes = {
  component: React.PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  pattern: React.PropTypes.string.isRequired,
};

export default injectIntl(Page);
