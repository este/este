// @flow
import * as React from 'react';
import createReactContext, { type Context } from 'create-react-context';
import Theme from './Theme';
import XRay from 'react-x-ray';

type Value = {|
  shown: boolean,
  toggle: () => void,
|};

const value = {
  shown: false,
  toggle: () => {},
};

const BaselineContext: Context<Value> = createReactContext(value);

type BaselineProviderProps = {|
  children: ?React.Node,
|};

type BaselineProviderState = {|
  shown: boolean,
|};

// Use private module value to persist shown across page transitions.
let sessionShown = false;

export class BaselineProvider extends React.PureComponent<
  BaselineProviderProps,
  BaselineProviderState,
> {
  state = { shown: sessionShown };

  toggle = () => {
    const shown = !this.state.shown;
    sessionShown = shown;
    this.setState({ shown });
  };

  render() {
    const { children } = this.props;
    const { shown } = this.state;
    return (
      <BaselineContext.Provider value={{ shown, toggle: this.toggle }}>
        <Theme>
          {theme => (
            <XRay
              disabled={!shown}
              outline={false}
              grid={theme.typography.lineHeight}
            >
              {children}
            </XRay>
          )}
        </Theme>
      </BaselineContext.Provider>
    );
  }
}

export default BaselineContext.Consumer;
