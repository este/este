import * as actions from './actions';
import React, { Component, PropTypes } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

export default function start(WrappedComponent) {
  class Start extends Component {

    static propTypes = {
      intl: PropTypes.object.isRequired,
      start: PropTypes.func.isRequired,
    };

    componentDidMount() {
      const { start } = this.props;
      // Client side changes must be dispatched on componentDidMount, aka
      // after the first app render, to match client and server HTML. Otherwise,
      // React attempt to reuse markup will fail.
      start();
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
  }), actions)(Start);

  return Start;
}
