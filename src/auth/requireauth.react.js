import Component from '../components/component.react';
import React from 'react';
import {usersCursor} from '../state';

// Higher order component.
// https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
export default function requireAuth(BaseComponent) {

  class Authenticated extends Component {

    componentDidMount() {
      const isLoggedIn = !!usersCursor().get('viewer');
      if (!isLoggedIn) {
        const route = this.props.navigation.getRoute('login');
        this.props.navigation.replace(route);
      }
    }

    render() {
      return <BaseComponent {...this.props} />;
    }

  }

  Authenticated.displayName = `${BaseComponent.name}Authenticated`;

  Authenticated.propTypes = {
    navigation: React.PropTypes.object.isRequired
  };

  return Authenticated;

}
