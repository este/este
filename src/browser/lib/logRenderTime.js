import Component from 'react-pure-render/component';
import React from 'react';

// When UI renders thousands components, it's useful to check render time.
// Example:
//  @logRenderTime
//  export default class App extends Component {}
export default function logRenderTime(BaseComponent) {

  return class LogRenderTime extends Component {

    componentWillUpdate() {
      this.start = Date.now();
    }

    componentDidUpdate() {
      const total = Date.now() - this.start;
      console.log(`[ESTE] logRenderTime: ${total}ms`); // eslint-disable-line no-console, no-undef
    }

    render() {
      return <BaseComponent {...this.props} />;
    }

  };

}
