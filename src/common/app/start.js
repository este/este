import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { onAppComponentDidMount } from './actions';

export default function start(Wrapped) {
  class Start extends Component {

    static propTypes = {
      currentLocale: PropTypes.string.isRequired,
      dispatch: PropTypes.func.isRequired,
      messages: PropTypes.object.isRequired
    };

    componentDidMount() {
      const { dispatch } = this.props;
      dispatch(onAppComponentDidMount());
    }

    render() {
      const { currentLocale, messages } = this.props;

      return (
        <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
          <Wrapped {...this.props} />
        </IntlProvider>
      );
    }

  }

  Start = connect(state => ({
    currentLocale: state.intl.currentLocale,
    messages: state.intl.messages
  }))(Start);

  return Start;
}
