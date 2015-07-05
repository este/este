import Component from '../components/component.react';
import React from 'react';
import {appState} from '../state';

// Higher order component.
// https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
export default function requestState(stateProps) {

  return function(BaseComponent) {
    class StateContainer extends Component {
      constructor(props) {
        super(props)
        this.handleStateChange = this.handleStateChange.bind(this)
        this.state = this.getState()
      }

      getState(transition) {
        return Object.keys(stateProps).reduce((localState, propName) => {
          const propKeyPath = stateProps[propName]
          localState[propName] = appState.get().getIn(propKeyPath)
          return localState
        }, {})
      }

      componentWillMount() {
        if (process.env.IS_BROWSER) appState.on('change', this.handleStateChange)
      }

      componentWillUnmount() {
        appState.removeListener('change', this.handleStateChange)
      }

      handleStateChange() {
        this.setState(this.getState())
      }

      render() {
        return <BaseComponent {...this.props} {...this.state} />;
      }

    }

    StateContainer.displayName = `${BaseComponent.name}StateContainer`;

    return StateContainer;
  }

}
