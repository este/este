import './Loading.scss';
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  loadingText: {
    defaultMessage: 'Loading',
    id: 'loading.loadingText',
  },
  longLoadingText: {
    defaultMessage: 'Still loading, please check your connection',
    id: 'loading.longLoadingText',
  },
});

export default class Loading extends Component {

  constructor() {
    super();
    this.state = {
      currentText: null,
    };
  }

  componentDidMount() {
    // www.nngroup.com/articles/response-times-3-important-limits
    this.timer = setTimeout(() => {
      this.setState({ currentText: messages.loadingText });
    }, 1000);
    this.longTimer = setTimeout(() => {
      this.setState({ currentText: messages.longLoadingText });
    }, 10000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.longTimer);
  }

  render() {
    const { currentText } = this.state;
    if (!currentText) {
      return <div className="este-loading">{String.fromCharCode(160)}</div>;
    }
    return (
      <div className="este-loading">
        <FormattedMessage {...currentText}>
          {title => <Helmet title={title} />}
        </FormattedMessage>
        <FormattedMessage {...currentText} />
      </div>
    );
  }

}
