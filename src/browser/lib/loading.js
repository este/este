// A higher order component for loading.

import Component from 'react-pure-render/component';
import Loading from './Loading.react';
import NotFound from '../notfound/NotFoundPage.react';
import React from 'react';

export default function loading(Wrapped, propsToCheck, customLoading) {
  return class Wrapper extends Component {

    render() {
      const props = propsToCheck.map(prop => this.props[prop]);
      // Null is evidence of absence.
      if (props.some(prop => prop === null)) {
        return <NotFound />;
      }
      // Undefined is absence of evidence.
      if (props.some(prop => prop === undefined)) {
        return <Loading />;
      }
      // For better loading granularity.
      if (customLoading && customLoading(this.props)) {
        return <Loading />;
      }
      return <Wrapped {...this.props} />;
    }

  };
}
