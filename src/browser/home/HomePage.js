/* @flow */
import Helmet from 'react-helmet';
import React from 'react';
import SwitchTheme from '../themes/SwitchTheme';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';

const HomePage = () => (
  <div className="home-page">
    <FormattedMessage {...linksMessages.home}>
      {message =>
        <Helmet title={message} />
      }
    </FormattedMessage>
    <p>
      <a href="https://github.com/este/este">github.com/este/este</a>
    </p>
    <p>
      <img alt="50x50 placeholder" src={require('./50x50.png')} />
    </p>
    <SwitchTheme />
  </div>
);

export default HomePage;
