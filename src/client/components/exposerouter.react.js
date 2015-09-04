import Component from './component.react';
import React from 'react';

export default function exposeRouter(BaseComponent) {

  return class ExposeRouter extends Component {

    static contextTypes = {
      router: React.PropTypes.func.isRequired
    };

    render() {
      return <BaseComponent {...this.props} router={this.context.router} />;
    }

  };

}

