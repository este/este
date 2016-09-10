/* @flow */
import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { start as appStart } from './actions';

const start = (WrappedComponent: Function) => {
  let appStarted = false;

  class Start extends React.Component {

    static propTypes = {
      intl: React.PropTypes.object.isRequired,
      appStart: React.PropTypes.func.isRequired,
    };

    componentDidMount() {
      const { appStart } = this.props;
      // The appStart must be called after the initial render, because
      // componentDidMount is not called on the server. Because hot reloading,
      // we have to call appStart only once.
      if (appStarted) return;
      appStarted = true;
      appStart();
    }

    render() {
      const { intl } = this.props;
      const { currentLocale, defaultLocale, initialNow, messages } = intl;

      return (
        <IntlProvider
          defaultLocale={defaultLocale}
          initialNow={initialNow}
          key={currentLocale} // https://github.com/yahoo/react-intl/issues/234
          locale={currentLocale}
          messages={messages[currentLocale]}
        >
          <WrappedComponent {...this.props} />
        </IntlProvider>
      );
    }

  }

  Start = connect(state => ({
    intl: state.intl,
  }), { appStart })(Start);

  return Start;
};


export default start;
