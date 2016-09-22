import React from 'react';

class ServerFetchProvider extends React.Component {
  static childContextTypes = {
    serverFetchPromises: React.PropTypes.array,
  };
  getChildContext() {
    return {
      serverFetchPromises: this.props.promises,
    };
  }
  props: {
    // github.com/facebook/flow/issues/1964
    children?: any,
    promises: Array<Promise<any>>,
  }
  render() {
    return React.Children.only(this.props.children);
  }
}

export default ServerFetchProvider;
