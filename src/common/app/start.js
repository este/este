/* @flow weak */
import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { start as appStart } from './actions';

const start = WrappedComponent => {
  class Start extends React.Component {

    static propTypes = {
      intl: React.PropTypes.object.isRequired,
      appStart: React.PropTypes.func.isRequired,
    };

    componentDidMount() {
      const { appStart } = this.props;
      // Note the appStart must be dispatched after the initial render, to match
      // client and server rendered HTML.
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
