// A higher order component for loading.

import Component from 'react-pure-render/component';
import Loading from './Loading.react';
import NotFound from '../notfound/Page.react';
import React from 'react';

export default function loading(Wrapped, propsToCheck) {
  return class LoadingWrapper extends Component {

    render() {
      const props = propsToCheck.map(prop => this.props[prop]);
      // Undefined is absence of evidence.
      if (props.some(prop => prop === undefined)) {
        return <Loading />;
      }
      // Null is evidence of absence :-)
      if (props.some(prop => prop === null)) {
        return <NotFound />;
      }
      return <Wrapped {...this.props} />;
    }

  };
}
