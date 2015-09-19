import Component from 'react-pure-render/component';
import React from 'react';

// When app UI renders thousands components, it's useful to check render time.
// For start, use this decorator on app component:
// @logRenderTime
// export default class App extends Component {}
export default function logRenderTime(BaseComponent) {

  return class LogRenderTime extends Component {

    componentWillUpdate() {
      this.start = Date.now();
    }

    componentDidUpdate() {
      const total = Date.now() - this.start;
      const name = BaseComponent.displayName || BaseComponent.name;
      console.log(`[ESTE] ${name} render: ${total}ms`); // eslint-disable-line no-console, no-undef
    }

    render() {
      return <BaseComponent {...this.props} />;
    }

  };

}




