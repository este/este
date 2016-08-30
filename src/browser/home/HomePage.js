/* @flow */
import Helmet from 'react-helmet';
import React from 'react';
import SwitchTheme from '../themes/SwitchTheme';
import linksMessages from '../../common/app/linksMessages';
import { Link } from '../app/components';
import { FormattedMessage } from 'react-intl';

class HomePage extends React.Component {

  render() {
    return (
      <div className="home-page">
        <FormattedMessage {...linksMessages.home}>
          {message =>
            <Helmet title={message} />
          }
        </FormattedMessage>
        <p>
          <Link to="https://github.com/este/este">github.com/este/este</Link>
        </p>
        <p>
          <img alt="50x50 placeholder" src={require('./50x50.png')} />
        </p>
        <SwitchTheme />
      </div>
    );
  }

}

export default HomePage;
